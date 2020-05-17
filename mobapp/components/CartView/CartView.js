import React from 'react';
import firebase from 'firebase';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import FoodItem from './FoodItem'
import Payment from '../Payment/Payment';
import AsyncStorage from '@react-native-community/async-storage';
import md5 from 'md5';

export default class CartView extends React.Component{
    constructor(props){
        super(props);
        var total = 0, orders = this.props.navigation.state.params;
        Object.entries(orders).forEach(entry => total += entry[1].cnt * entry[1].info.cost)
        this.state = {
            orders: orders,
            total: total,
            dishes: [],
            init: false,
            shop: "shop1",
            token: "",
        }
        console.log(Object.entries(this.state.orders));
    }
    componentDidMount(){
        var shopsFood = firebase.database().ref(this.state.shop + "/food/");
        shopsFood.on('value', (snapshot)=> {
            if(!this.state.init) this.setState({init: true})
            else this.updateStatus(snapshot.val());
        });
        //alert("Your Token No. is 95B3A");
    }
    updateStatus = (dishes) => {
        Object.keys(this.state.orders).map((val)=>{
            //dishes[val].available = false
            if(!dishes[val].available)
            {
                this.state.orders[val].info = dishes[val]
                //tmp = false;
            }
        })
        this.forceUpdate()
    }
    updateTotal = (val) => {
        this.setState(prev => {
            return {total: prev.total + val}
        })
    }
    deleteItem = (key) => {
        delete this.state.orders[key]
        this.forceUpdate()
    }
    placeOrder = () => {
        Payment(this.state.total, this.finallyPlaceOrder);
    }
    finallyPlaceOrder = async () => {
        const email = await AsyncStorage.getItem("email");
        let name = email.split("@")[0];
        let orderWrite = {};
        Object.entries(this.state.orders).map((val)=>{
            orderWrite[val[0]] = {"qty":val[1].cnt,"fname":val[1].info.name}
        });
        console.log(Object.entries(orderWrite));
        firebase.database().ref(this.state.shop + "/orders/" ).once('value').then((snapshot)=> {
            this.setState({orderNo: (snapshot.numChildren()+1)}); 
                firebase.database().ref(this.state.shop + "/orders/" + this.state.orderNo ).set({
                    "id":this.state.orderNo,
                    "payment":"done",
                    "uname": name, 
                    "desc":orderWrite,
                    "status":"requested"
                }).then(()=>{
                    console.log("updated");
                    var orderFood = firebase.database().ref(this.state.shop+"/"+"orders"+"/"+this.state.orderNo);
                    orderFood.on('value', async (snapshot)=> {
                        let orderInfo = JSON.stringify({"shop": this.state.shop, "dishes": Object.keys(snapshot.val().desc).join(";")});
                        await AsyncStorage.setItem("prevOrder", orderInfo);
                        const hash = md5(snapshot.val().id.toString());
                        this.setState({token: hash.substring(0, 5)});
                    });
                }).catch((err)=>{
                    console.log(err);
                });
            }
        );    
    }
    render(){
        if(Object.entries(this.state.orders).length == 0)
            this.props.navigation.goBack() 
        return(
            <ScrollView style={styles.container}>
                { Object.entries(this.state.orders).map(entry => {
                        return <FoodItem key={entry[0]} id={entry[0]} item={entry[1]} 
                            updateTotal={this.updateTotal} deleteItem={this.deleteItem}/>
                    })
                }
                <View style={[styles.divider, {height: "1.5%"}]}></View>
                <View style={{margin: "2.5%", flexDirection: "row", height: "10%", justifyContent: "center"}}>
                    <Text style={{fontWeight: "bold", fontSize: 20, marginRight: "2%"}}>Note: </Text>
                    <Text style={{fontSize: 15, fontStyle: "italic", flexShrink: 1}}>If you're not in college, you'll be given a lower priority than usual</Text>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={[styles.totalText, {fontSize: 22.5}]}>Total amount: </Text>
                    <Text style={styles.totalText}>Rs. {this.state.total}</Text>
                </View>
                <View style={[styles.divider, {height: "1%"}]}></View>
                <View style={styles.buttonContainer}>
                {
                    this.state.token == "" ? 
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.placeOrder()
                    }}>
                        <Text style={styles.buttonText}>Place Order!</Text>
                    </TouchableOpacity> : 
                    <Text style={{fontSize: 20}}>Success! Your token no. is {this.state.token}</Text>
                }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: "2.5%", 
        flex: 1
    },
    divider: {
        width: "100%",
        backgroundColor: "#d2dae2"
    },
    totalContainer: {
        margin: "2.5%",
        marginTop: "0%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    totalText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#4cd137",
        width: "80%",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: "white"
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center",
        padding: 20,
    }
})