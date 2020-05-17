import React from 'react';
import {  Text,TouchableOpacity,StyleSheet,} from 'react-native';
import  firebase from 'firebase';

export default class App extends React.Component
{ 
    constructor(props)
    {
        super(props);
        
        this.state = {
            removeFromCart: this.props.removeFromCart,
            val : this.props.val,
        }
    }

 
render(){
  return (
    <>
      <TouchableOpacity onPress={()=>{this.state.removeFromCart(this.state.val,0);}}>
        <Text>Clear</Text>
      </TouchableOpacity>
    </>
  );
};
}

