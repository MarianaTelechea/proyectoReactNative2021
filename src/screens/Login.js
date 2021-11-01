import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    render(){
        return(
            <View>
            <Text style = {styles.titulo}>Ingresar</Text>
            <TextInput
                placeholder = 'Introduzca su E-mail'
                keyboardType = 'email-address'
                onChangeText ={ (text) => this.setState({email: text})}
            />
             <TextInput
                placeholder = 'Introduzca su password'
                keyboardType = 'password'
                onChangeText ={ (text) => this.setState({password: text})}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => this.props.ingresar(this.state.email, this.state.password)}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

const styles =  StyleSheet.create({
    titulo:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'white',
        fontSize: '2rem',
    }
})