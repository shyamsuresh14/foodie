import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class App extends React.Component
{ 
    constructor(props)
    {
        super(props);
        
        this.state = {
            collapseCategory: this.props.collapseCategory,
            collapsed: this.props.collapsed,
            val : this.props.val,
        }
    }

 
    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>{this.state.collapseCategory(this.state.val)}} style={styles.buttonContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{this.state.val[1].category.toUpperCase()}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        {this.state.collapsed ? <Icon name="keyboard-arrow-down" size={30}/> : <Icon name="keyboard-arrow-up" size={30}/>}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "green",
        alignItems: "center",
        borderBottomWidth: 1,
        padding: 10,
        //marginBottom: 5
    },
    buttonContainer: {
        flexDirection: "row",
    },  
    textContainer: {
        width: "90%", 
        paddingLeft: "10%", 
        alignItems: "center"
    },
    iconContainer: {
        width: "10%"
    },
    text: {
        color:"black",
        fontWeight: "bold",
        fontSize: 20
    }
}) 

