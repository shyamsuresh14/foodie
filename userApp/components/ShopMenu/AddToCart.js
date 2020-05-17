import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import  firebase from 'firebase';


export default class App extends React.Component
{ 
    constructor(props)
    {
        super(props);
        
        this.state = {
        	addToCart : this.props.addToCart,
            removeFromCart : this.props.removeFromCart,
            val : this.props.val,
            
        }
    }

	render(){
	return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={()=>{ this.state.addToCart(this.state.val); }}>
					<Text style={styles.text}>+</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={()=>{ this.state.removeFromCart(this.state.val); }}>
					<Text style={styles.text}>-</Text>
				</TouchableOpacity>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		width: "30%"
	},
	button: {
		width: "20%",
		alignItems: "center",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold"
	}
})

