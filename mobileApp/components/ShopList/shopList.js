import React from 'react';
import { View, Text, FlatList, Modal, ToastAndroid, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-elements';
import firebase from 'firebase';
import { shopData } from './shopSnapLocalInfo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import ModalView from './modalView';

export default class ShopList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            shops: [],
            prevOrder: null,
            showModal: false,
            loaded: false
        }
    }
    componentDidMount(){
        var shopsFood = firebase.database().ref("/");
		shopsFood.on('value', (snapshot)=> {
            var snap = snapshot.val();
            var shops = Object.keys(snap);
            for(var i=3; i<=7; i++) shops.push("shop" + i.toString());
            this.setState({shops: shops});
            this.checkForPrevOrder(snap);
		})
    }
    checkForPrevOrder = async (snap) => {
        //await AsyncStorage.removeItem("email")
        let prevOrder = await AsyncStorage.getItem("prevOrder");
        if(prevOrder != null){
            prevOrder = JSON.parse(prevOrder);
            let dishInfo = {};
            prevOrder.dishes.split(";").forEach((dish) => {
                dishInfo[dish] = snap[prevOrder.shop].food[dish];
            })
            prevOrder.dishes = dishInfo;
            this.setState({prevOrder: prevOrder, showModal: true, loaded: true});
        }
        else this.setState({loaded: true})
    }
    rateFood = (shop, dish, rating, rate) => {
		firebase.database().ref(shop + "/food/" + dish + "/rating").set({
            count : rating.count + 1,
            rate : rating.rate + rate
        }).then(()=>{
			console.log("updated");
		}).catch((err)=>{
			console.log(err);
		});
		
	}
    renderItem = ({item}) => {
        return (
            (item === "shop1" || item === "shop2") ? 
            <TouchableOpacity onPress={() => this.props.navigation.navigate("menu", item)}>
                <Card title={shopData[item].info.name} image={{uri: shopData[item].info.photo}}/>
            </TouchableOpacity> : 
            <TouchableOpacity onPress={() => this.props.navigation.navigate("menu", item)} disabled>
                <Card title={shopData[item].info.name + " (Closed)"} image={{uri: shopData[item].info.photo}}/>
            </TouchableOpacity>
        )
    }
    render(){
        return (
            <View style={{flex: 1}}>
                {this.state.loaded ? 
                    <View>
                        <Modal animationType="slide" visible={this.state.showModal}>
                            <ModalView 
                                order={this.state.prevOrder} 
                                close={() => this.setState({showModal: false})}
                                done={async () => await AsyncStorage.removeItem("prevOrder")} 
                            />
                        </Modal>
                        <FlatList 
                            data={this.state.shops} 
                            renderItem={this.renderItem} 
                            keyExtractor={(item, index) => index.toString()}
                        /> 
                    </View>
                    :
                    <ActivityIndicator 
                        style={{flex: 1, justifyContent: "center", alignItems: "center"}} 
                        color="red" 
                        size="large"
                    />
                }
                
            </View>
        )
    }
}