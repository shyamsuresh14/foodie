import React from 'react';
import {View,Text,StyleSheet, ActivityIndicator, Animated, ToastAndroid} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class FoodItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			quantity: props.item.cnt,
			animation: new Animated.Value(1)
		}
	}
	updateQuantity = (val) => {
		if(val != -1 || this.state.quantity != 1){
			this.setState(prev => {
				return {quantity: prev.quantity + val}
			})
			this.props.updateTotal(this.props.item.info.cost * val)
		}
	}
	deleteItem = () => {
		Animated.timing(this.state.animation, {
			toValue: 0,
			timing: 400,
			useNativeDriver: true
		}).start(() => {
			this.props.deleteItem(this.props.id)
		})
	}
    render(){
		if(!this.props.item.info.available){
			this.deleteItem()
			ToastAndroid.show(this.props.item.info.name[0].toUpperCase() + this.props.item.info.name.slice(1) + " is no longer available!");
			return null;
		}
		else
			return(
				<Animated.View style={[styles.cardStyle, {opacity: this.state.animation}]}>
					<View style={styles.container}>
						<View style={styles.leftContainer}>
							<Image source={{uri: this.props.item.info.image}} style={styles.image} PlaceholderContent={<ActivityIndicator />}/>
						</View>
						<View style={styles.rightContainer}>
							<View style={styles.rightTopContainer}>
								<View style={styles.rightTopLeftContainer}>
									<Text style={[styles.dishName]}> 
										{this.props.item.info.name[0].toUpperCase() + this.props.item.info.name.slice(1)}
									</Text>
								</View>
								<View style={styles.rightTopRightContainer}>
									<Text style={styles.cost}>
										Rs. {this.props.item.info.cost}
									</Text>
								</View>
							</View>
							<View style={styles.rightBottomContainer}>
								<View style={styles.rightBottomLeftContainer}>
									<View style={styles.quantityContainer}>
										<View style={{width: "30%", alignItems: "center"}}>
											<TouchableOpacity onPress={() => this.updateQuantity(1)}>
												<Text style={{fontSize: 20, fontWeight: "bold"}}>+</Text>
											</TouchableOpacity>
										</View>
										<View style={{width: "40%", alignItems: "center"}}>
											<Text style={{fontSize: 15}}>{this.state.quantity}</Text>
										</View>
										<View style={{width: "30%", alignItems: "center"}}>
											<TouchableOpacity onPress={() => this.updateQuantity(-1)}>
												<Text style={{fontSize: 20, fontWeight: "bold"}}>-</Text>
											</TouchableOpacity>
										</View>
									</View>
								</View>
								<View style={styles.rightBottomRightContainer}>
									<TouchableOpacity onPress={this.deleteItem}>
										<Icon name="delete" size={25} color={"red"}/>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					</View>
				</Animated.View>
			)
    }
}

const styles = StyleSheet.create({
    cardStyle: { 
		margin: "2.5%",
	},
	container: {
		flexDirection: "row",
        alignItems: "center"
	},
	leftContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "40%"
	},
	rightContainer: {
		width: "60%",
		paddingLeft: 10,
		justifyContent: "center",
		alignItems: "center"
	},
	rightTopContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginBottom: "15%"
	},
	rightTopLeftContainer: {
		width: "70%",
		alignItems: "center",
	},
	rightTopRightContainer:{
		width: "30%",
		alignItems: "center", 
		marginRight: 10,
		marginLeft: "5%"
	},
	rightBottomContainer: {
		flexDirection: "row",
		justifyContent: 'space-evenly',
		alignItems: "center",
	},
	rightBottomRightContainer:{
		width: "30%",
		alignItems: "center", 
		marginRight: 10,
	},
	rightBottomLeftContainer: {
		width: "70%",
		alignItems: "center",
	},
	image: {
		width: 125,
		height: 125,
	},
	dishName: {
		fontSize: 20,
		fontWeight: "bold",
	},
	cost: {
		fontSize: 20
	},
	quantityContainer: {
		width: "75%",
		backgroundColor: "#f5f6fa",
		flexDirection: "row",
		//justifyContent: "space-evenly",
		alignItems: "center"
	}
})