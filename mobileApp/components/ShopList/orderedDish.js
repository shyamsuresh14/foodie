import React from 'react';
import {View,Text,StyleSheet, ActivityIndicator} from 'react-native';
import {Card, Image} from 'react-native-elements';
import {AirbnbRating} from 'react-native-ratings';

const OrderedDish = (props) => { 
	return (
		<Card containerStyle={[styles.cardStyle, {borderColor: props.info.veg == "n" ? "red" : "#4cd137"}]}>
			<View style={styles.container}>
				<Image source={{uri: props.info.image}} style={styles.image} PlaceholderContent={<ActivityIndicator />}/>
				<View style={styles.rightContainer}>
					<View style={styles.rightTopContainer}>
						<Text style={styles.dishName}> 
							{props.info.name[0].toUpperCase() + props.info.name.slice(1)}
						</Text>
						<Text style={styles.cost}>Rs. {props.info.cost}</Text>
					</View>
					<View style={styles.rightBottomContainer}>
						<AirbnbRating
							count={5}
							reviews={["Terrible", "Bad", "Meh", "Good", "Excellent"]} //rating.rate
							defaultRating={0}
							size={18}
							onFinishRating={
								rate => props.rateFood(props.shop, props.dish, props.info.rating, rate)
							}
						/>
					</View>
				</View>
			</View>
		</Card>
	);
};

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
		justifyContent: "center"
	},
	rightTopContainer: {
		justifyContent: "space-evenly",
		alignItems: "center"
	},
	rightBottomContainer: {
		justifyContent: 'center',
		alignItems: "center"
	},
	image: {
		width: 150,
		height: 150,
		margin: 5
	},
	dishName: {
		fontSize: 20,
	},
	cost: {
		fontSize: 18
	},
})

export default OrderedDish;