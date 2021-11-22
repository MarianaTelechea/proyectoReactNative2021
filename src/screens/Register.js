import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: "Error de usuario"
        }
    }

    render(){
        return(

            <View>

                <Text style = {styles.titulo}>Register</Text>

                <Text style = {styles.titulo}>Nombre de usuario</Text>
                <TextInput
                    style ={styles.input}
                    placeholder = 'Introduzca su nombre'
                    keyboardType = 'default'
                    onChangeText = { (text) => this.setState({username: text})} 
                />
            
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
        color: 'blue',
        fontSize: '1rem'
    },
    error:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'red',
        fontSize: '1rem'
    }
})