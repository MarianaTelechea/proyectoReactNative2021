import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import { auth } from '../firebase/config';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "Tenes un error en el usuario o la contraseña"
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            console.log(user)
            if(user) {
                this.setState({
                    loggeIn: true,
                    user: user.email,
                })
            }else{
                this.setState({
                    loggeIn: false
                })
            }
        })
    }

    render(){
        return(
            <View style= {styles.container}>
                <View style= {styles.container}>
                    <Text style = {styles.titulo}>Iniciar sesión</Text>
                    <Text style = {styles.info}>Ingrese sus datos para acceder a su cuenta</Text>
                    <TextInput
                        style ={styles.input}
                        placeholder = 'Introduzca su E-mail'
                        keyboardType = 'email-address'
                        onChangeText ={ (text) => this.setState({email: text}) }
                    />
                    <TextInput
                        style ={styles.input}
                        placeholder = 'Introduzca su password'
                        keyboardType = 'password'
                        onChangeText ={ (text) => this.setState({password: text})}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity 
                        style = {this.state.email === '' && this.state.password === '' ? styles.botonDifuso:styles.botonVisible} 
                        onPress={() => this.props.ingresar(this.state.email, this.state.password)}
                        disabled={this.state.email === '' && this.state.password === '' ? true:false}>
                            <Text style ={styles.textBoton}>Ingresar</Text>
                    </TouchableOpacity>
                </View>
            <Text style ={styles.logo} >PI | PostIt</Text>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    titulo:{
      fontFamily: 'Helvetica',
      textAlign: 'center',
      color: 'white',
      fontSize: '1.5rem'
    },
    info:{
        paddingBottom: 15,
        fontFamily: 'Helvetica',
        textAlign: 'center',
        color: 'lavender',
        fontSize: '0.8rem'
      },
      textBoton:{
        fontFamily: 'Helvetica',
        color: 'white'
      },
    input: {
      height: 20,
      width:"70%",
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderStyle: 'solid',
      borderColor: '#ccc',
      borderRadius: 5,
      marginVertical:10,
      backgroundColor: '#181818',
      color: 'white'
    },
    botonVisible: {
        backgroundColor: 'mediumpurple',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        marginVertical:20,
        width: "70%",
        opacity: 1
    },
    botonDifuso: {
        backgroundColor: 'mediumpurple',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        marginVertical:20,
        width: "70%",
        opacity: 0.3
    },
    textBoton:{
        fontFamily: 'Helvetica',
        color: 'white',
        opacity: 1
      },
    logo: {
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: 25,
        fontFamily: 'Helvetica'
    }
  }) 