import React from 'react';
import {View, Text, TouchableOpacity, FlatList, ToastAndroid, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import OrderedDish from './orderedDish';

export default class ModalView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rated: false
        }
    }
    rateFood = (shop, dish, rating, rate) => {
		firebase.database().ref(shop + "/food/" + dish + "/rating")
		.set({
			count : rating.count + 1,
			rate : rating.rate + rate
		}).then(()=>{
			console.log("updated");
		}).catch((err)=>{
			console.log(err);
		});	
		this.setState({rated: true})
	}
    renderItem = ({item}) => {
        return (
            <OrderedDish 
                shop={this.props.order.shop}
                dish={item}
                info={this.props.order.dishes[item]}
                rateFood={this.rateFood}
            />
        )
    }
    render(){
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.exit} onPress={this.props.close}>
                    <Icon name="close" size={20}/>
                </TouchableOpacity>
                <View style={{flex: 0.01}}/>
                <View style={styles.textContainer}>
                    <Text style={styles.title}> Please rate the dishes you ordered! </Text>
                </View>
                <View style={{flex: 0.1}}/>
                <FlatList 
                    data={Object.keys(this.props.order.dishes)}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />       
                <View style={{flex: 0.1}} />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity title="Show order" style={styles.button} onPress={()=>{
                        if(this.state.rated){
                            ToastAndroid.show("Thank you!!", ToastAndroid.SHORT);
                            this.props.done();
                            this.props.close();
                        }
                        else
                            ToastAndroid.show("Please rate the dishes first!", ToastAndroid.SHORT);
                    }}>
                        <Text style={styles.buttonText}>Done!</Text>
                    </TouchableOpacity>
			    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        alignItems: "center",
        marginLeft: "5%",
        marginRight: "5%",
    },
    title: {
        fontSize: 20
    },
    exit: {
        alignSelf: "flex-end", 
        marginTop: 10, 
        marginRight: 5
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#4cd137",
        width: "60%",
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    }
});