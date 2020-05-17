import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export default class EmailAuthScreen extends Component {
    constructor(props){
        super(props);
        //console.log("Props: ", this.props)
        this.state = ({
            email: '',
            password: ''
        });

    }
    loginUser = () => {
        try{
            const {email,password} = this.state;
            auth().signInWithEmailAndPassword(email,password).then(async (user) => {
                await AsyncStorage.setItem("email", user.user.email)
                this.props.navigation.navigate({routeName: "App"})
            }).catch((error) => {
                alert("Invalid password/Email");
            })
        }
        catch{
            alert(error.toString());
        }
    }

    forgotPassword = () => {
        const {email} = this.state;
        auth().sendPasswordResetEmail(email).then((user) => {
            alert('Please check your email...')
        }).catch((e) => {
            console.log(e)
        })
    }

    signUpUser = ()=>{
        try{
            const {email,password} = this.state;
            
            auth().createUserWithEmailAndPassword(email,(1000000+Math.floor(Math.random() * 100) + 1).toString() ).then(function (){
                auth().sendPasswordResetEmail(email).then(function (user) {
                    alert('Please check your email...')
                }).catch(function (e) {
                    console.log(e)
                })
            }).catch(function (error){
                alert(error.toString());
                return;
            })
            
        }
        catch(error){
            alert(error.toString());
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up/Login to get started!</Text>
                
                <View style={{flex: 0.1}} />

                <TextInput style={styles.input}
                    placeholder="Type Username here"
                    placeholderTextColor="rgba(255, 255,255,0.5)"
                    onChangeText = {(email)=> this.setState({email})}
                />
                
                <View style={{flex:0.1}}/>
                
                <TextInput secureTextEntry={true} style={styles.input}
                    placeholder="Type Password here"
                    placeholderTextColor="rgba(255, 255,255,0.5)"
                    onChangeText = {(password)=> this.setState({password})}
                />
                
                <View style={{flex:0.1}}/>
                
                <TouchableOpacity style={styles.LoginButton} onPress = {this.signUpUser}>
                    <View>
                        <Text style={{textAlign:'center',
                        margin: 10,
                        fontSize:20,
                        color:"rgba(0,0,0,0.5)"}}>
                            Sign Up
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <View style={{flex:0.1}}/>
                
                <TouchableOpacity style={styles.LoginButton} onPress = {() => this.loginUser()}>
                    <View>
                        <Text style={{textAlign:'center',
                        margin: 10,
                        fontSize:20,
                        color:"rgba(0,0,0,0.5)"}}>
                            Log In
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <View style={{flex:0.1}}/>

                <Text onPress={this.forgotPassword}> Forgot Password? </Text>

                <View style={{flex:0.1}}/>

                <Text style={{fontSize: 15, fontWeight: "bold"}} onPress={() => this.props.navigation.navigate("auth2")}> 
                    Use your mobile number instead? 
                </Text>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    title:{
        fontSize: 20,
        top:-20,
        margin: 10,
    },
    
    input:{
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'white',
        marginVertical: 10,
    },
    LoginButton: {
        alignItems: 'center',
        backgroundColor: '#B4DDE3',
        height: 40,
        width: 100,
        borderRadius:25,
        justifyContent:'center'
    },
    fbutton:{
        width:300,
    }

});