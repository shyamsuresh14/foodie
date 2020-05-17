import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends React.Component{
    constructor(props){
        super(props)
        this._checkLoggedIn()
    }
    _checkLoggedIn = async () => {
        try{
			const val = await AsyncStorage.getItem("email")
			if(val != null)
				this.props.navigation.navigate("App")
			else
                this.props.navigation.navigate("Auth")
		}catch(err){
			alert(err)
		}
    }
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#32ff7e"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})

export default SplashScreen