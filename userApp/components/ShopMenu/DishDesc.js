import React from 'react';
import {View,Text,StyleSheet, ActivityIndicator} from 'react-native';
import {Card, Image, Badge} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';
import firebase from 'firebase';
import AddToCart from './AddToCart'

export default class App extends React.Component
{ 
    constructor(props)
    {
        super(props);
        
        this.state = {
            color : this.props.color,
            shopName :  this.props.shopName,
			val : this.props.val,
			available: this.props.available
		}
    }

	/*rateFood = (rate) => {
		firebase.database().ref(this.state.shopName + "/food/" + this.state.val[0] + "/rating").set({
			count:this.state.val[1].rating.count+1,rate:this.state.val[1].rating.rate+rate
		}).then(()=>{
			console.log("updated");
		}).catch((err)=>{
			console.log(err);
		});
		
	}*/
	isAvailable = (time) => {
		const st = time.split("-")[0].split(":")[0];
		const end = time.split("-")[1].split(":")[0];
		const curr = parseInt((new Date).getHours());
		console.log(st, curr, end);
		if(curr >= parseInt(st) && curr < parseInt(end)) return true;
		else return false;
	}

	render(){
		//console.log(this.state.val[1].rating)
		return (
			<Card containerStyle={[styles.cardStyle, {borderColor: this.state.val[1].veg == "n" ? "red" : "#4cd137"}]}>
				<View style={styles.container}>
					<Image source={{uri: this.state.val[1].image}} style={styles.image} PlaceholderContent={<ActivityIndicator />}/>
					<View style={styles.rightContainer}>
						<View style={styles.rightTopContainer}>
							<Text style={[styles.dishName, {color:this.state.color}]}> 
								{this.state.val[1].name[0].toUpperCase() + this.state.val[1].name.slice(1)}
							</Text>
							<AirbnbRating
								count={5}
								reviews={["Terrible", "Bad", "Meh", "Good", "Excellent"]} //rating.rate
								defaultRating={this.state.val[1].rating.count > 5 ? 5 : this.state.val[1].rating.count}
								size={18}
								isDisabled={true}
							/>
						</View>
						<View style={styles.rightBottomContainer}>
							<Text style={styles.cost}>Rs. {this.state.val[1].cost}</Text>
							{
								this.isAvailable(this.state.available) ? <AddToCart removeFromCart={this.props.removeFromCart} 
								addToCart={this.props.addToCart} val={this.state.val}/> : 
								<View>
									<Text style={styles.unavailableText}>Unavailable</Text>
								</View>
							}
						</View>
					</View>
				</View>
				{this.props.orderCnt > -1 ? <Badge
					status="primary"
					value={this.props.orderCnt}
    				containerStyle={{ position: 'absolute', top: -6, right: -6}}
  				/> : null}
			</Card>
		);
	};
}

const styles = StyleSheet.create({
	cardStyle: { 
		borderWidth: 3,
		borderRadius: 2,
		marginBottom: 5
	},
	container: {
		flexDirection: "row",
	},
	rightContainer: {
		borderLeftWidth: 1,
		width: "50%",
		paddingLeft: 10,
		justifyContent: "space-between"
	},
	rightTopContainer: {
		alignItems: "center"
	},
	rightBottomContainer: {
		//backgroundColor: "yellow",
		flexDirection: "row",
		justifyContent: 'space-between',
		alignItems: "center"
	},
	image: {
		width: 150,
		height: 150,
		margin: 5
	},
	rating: {
		borderWidth: 1
	},
	dishName: {
		fontSize: 20,
	},
	cost: {
		fontSize: 20
	},
	unavailableText: {
		color: "red"
	}
})

