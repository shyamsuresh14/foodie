import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

export default class App extends React.Component
{ 
    constructor(props)
    {
        super(props);
        
        this.state = {
            toggleMenu: this.props.toggleMenu,
            all : true,
        }
    }

	render(){
		return (
			<View style={styles.container}>
				<Text style={{fontSize: 15}}>Show full menu</Text>
				<Switch value={this.state.all} onValueChange = {
					(val)=>{   
						this.state.toggleMenu(val);
						this.setState({all:val})
					}
				}></Switch>
			</View>
		);
	};
}

const styles = StyleSheet.create({
	container:{
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		//backgroundColor: 'red',
		padding: 10
	}
})