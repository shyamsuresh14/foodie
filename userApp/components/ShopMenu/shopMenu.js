import React, {Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, View, YellowBox, ScrollView, ToastAndroid} from 'react-native';
import {Icon, withBadge} from 'react-native-elements';
import  firebase from 'firebase';

import DishDesc from './DishDesc'
import RemoveAll from './RemoveAll'  
import ShowFullMenu from './ShowFullMenu'
import FoodType from './FoodType'

export default class App extends Component {
	
	constructor(props){
    	super(props);
		this.state = ({
			dishes:{},
			all:true,
			order:[],
			catShow : [],
			curCat : "",
			shop: "shop1"
		});
		YellowBox.ignoreWarnings(['Setting a timer']);
  	}
  
  
	componentDidMount()
	{
		//this.state = {}
		const shop = this.props.navigation.state.params
		this.readMenu(shop)
		this.setState({shop: shop})
		/*var shopsFood = firebase.database().ref("/");
		shopsFood.on('value', (snapshot)=> {
			console.log(snapshot.val())//this.setState({dishes:snapshot.val()});
		})*/
	}

	readMenu(shop)
	{
		//var userId = firebase.auth().currentUser.uid;
		firebase.database().ref(shop + "/food/").once('value').then((snapshot)=> {
			this.setState({dishes:snapshot.val()});
			// ...
		});

  	}
  
	rateFood(shop,dish,rating,rate)
	{
		firebase.database().ref(shop + "/food/" + dish + "/rating").set({count:rating.count+1,rate:rating.rate+rate}).then(()=>{
			console.log("updated");
		}).catch((err)=>{
			console.log(err);
		});
		
	}

	collapseCategory(val)
	{
		if(this.state.catShow[val[1].category] == undefined)
		{
			this.state.catShow[val[1].category] = true
			//alert(Object.entries(this.state.catShow))
		}
		else
		{
			delete this.state.catShow[val[1].category]
			//alert(Object.entries(this.state.catShow))
		}
		this.forceUpdate();
				
	}

	addToCart(val)
	{
		//this.state.order[val[0]] = (this.state.order[val[0]]==undefined) ? 1 : this.state.order[val[0]] + 1;
		if(this.state.order[val[0]]==undefined)
			this.state.order[val[0]] = {"info": val[1], "cnt": 1}
		else
			this.state.order[val[0]].cnt += 1;
		//console.log(this.state.order["sum"] == undefined)
		this.forceUpdate();
	}
	removeFromCart(val)
	{
		if(this.state.order[val[0]] != undefined){
			if(this.state.order[val[0]].cnt > 1)
				this.state.order[val[0]].cnt -= 1;
			else
				delete this.state.order[val[0]];
		    this.forceUpdate();
		}
	}
	rateFood(shop,dish,rating,rate)
	{
		firebase.database().ref(shop + "/food/" + dish + "/rating").set({count:rating.count+1,rate:rating.rate+rate}).then(()=>{
			console.log("updated");
		}).catch((err)=>{
			console.log(err);
		});   
	}
	
	toggleMenu(val)
	{
		this.setState({all:val})
	}
  render() {
	//console.log((Object.entries(this.state.dishes)));
	const BadgedIcon = withBadge(Object.entries(this.state.order).length)(Icon);
    return (
		<ScrollView contentContainerStyle={{marginTop: 5}}>
		{
			Object.entries(this.state.dishes).sort((a,b)=>{
				//sort category wise
				return (a[1].category>b[1].category)
			}).map((val)=>{
				//to display the category title and update
				var catDis = (this.state.curCat!=val[1].category);
				if(catDis)
				{
					(this.state.curCat=val[1].category);
				}
			
				//case 1
				if(this.state.catShow[val[1].category]==undefined)
				{
					if(!this.state.all && !val[1].available  && this.state.order[val[0]]==undefined)  
					{
						return(
						<>
							{/*return category based on user wish*/}
							{
								(catDis) ? <FoodType val={val} collapsed={this.state.catShow[val[1].category]} 
									collapseCategory={this.collapseCategory.bind(this)}/>
								:<></>
							}
						</>);
					}

					//case 2
					else if(!val[1].available  && this.state.order[val[0]]!=undefined)
					{
						return(
							<View key = {val[0]}>
								{/*return category based on user wish*/}
								{(catDis)?<FoodType val={val} collapsed={this.state.catShow[val[1].category]} collapseCategory={this.collapseCategory.bind(this)}/>:<></>}
								
								{/*Desc about product*/}
								<DishDesc color="red" val={val} shopName={this.state.shop} available={false}/>
								
								{/*Clear cart*/}
								<RemoveAll val={val} removeFromCart={this.removeFromCart.bind(this)}/>
							</View>
						);
					}

					//case 3
					else        
						return(
							<View key = {val[0]}>
								{/*return category based on user wish*/}
								{(catDis)?<FoodType val={val} collapsed={this.state.catShow[val[1].category]} collapseCategory={this.collapseCategory.bind(this)}/>:<></>}

								{/*return product desc*/}
								<DishDesc color="black" val={val} shopName={this.state.shop} available={val[1].available} 
									removeFromCart={this.removeFromCart.bind(this)} addToCart={this.addToCart.bind(this)}
									orderCnt={this.state.order[val[0]] == undefined ? -1 : this.state.order[val[0]].cnt} />
								{/*Add/remove based on the availability*/}
								{
								}
							
							</View>
						)
					}
				else 
				{
					if(!val[1].available  && this.state.order[val[0]]!=undefined)
					{
						return(
							<View key = {val[0]}>
								{/*return category based on user wish*/}
								{(catDis)?<FoodType val={val} collapsed={this.state.catShow[val[1].category]} collapseCategory={this.collapseCategory.bind(this)}/>:<></>}
								
								{/*Desc about product*/}
								<DishDesc color="red" val={val} shopName={this.state.shop}/>
								{/*Clear cart*/}
								<RemoveAll val={val} />
							</View>
						)
					}   
					else
					{
						return(
							<>
								{/*return category based on user wish*/}
								{(catDis)?<FoodType val={val} collapsed={this.state.catShow[val[1].category]} collapseCategory={this.collapseCategory.bind(this)}/>:<></>}
							</>
						);
					}
				}
			})
		}
			<ShowFullMenu all={this.state.all} toggleMenu={this.toggleMenu.bind(this)}/>
			<View style={styles.buttonContainer}>
				<TouchableOpacity title="Show order" style={[styles.button, {flexDirection: "row", justifyContent: "center"}]} onPress={()=>{
					if(Object.entries(this.state.order).length > 0)
						this.props.navigation.navigate("cart", this.state.order) 
					else
						ToastAndroid.show("Select an item first", 20)
				}}>
					<Text style={styles.buttonText}>Show Order!</Text>
					<BadgedIcon name="add-shopping-cart" />
				</TouchableOpacity>
			</View>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F7176',
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
});