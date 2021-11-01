import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";

export default class Register extends Component{
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

                <Text style={styles.error}>{this.props.error}</Text>
                <Text style = {styles.titulo}>Register</Text>
            
                <Text style = {styles.titulo}>E-mail</Text>
                <TextInput
                    placeholder = 'Introduzca su E-mail'
                    keyboardType = 'email-address'
                   onChangeText ={ (text) => this.setState({email: text})}
                />

                <Text style = {styles.titulo}>Password</Text>
                <TextInput
                    placeholder = 'Introduzca su password'
                    keyboardType = 'password'
                    onChangeText ={ (text) => this.setState({password: text})}
                    secureTextEntry={true}
                />

                <TouchableOpacity onPress={() => this.props.registrarse(this.state.email, this.state.password, this.state.username)}>
                    <Text>Registrarse</Text>
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
        fontSize: '2rem'
    }
})