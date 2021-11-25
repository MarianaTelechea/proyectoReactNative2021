import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";

export default class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            error: "",
            opacity: true
        }
    }
    
    render(){
        return(
            <View style= {styles.container}>
                <View style= {styles.container}>
                    <Text style = {styles.titulo}>Crea un usuario</Text>
                    <Text style = {styles.info}>Crear un usuario para tu nueva cuenta</Text>
                    <TextInput
                        style ={styles.input}
                        placeholder = 'Introduzca su nombre'
                        keyboardType = 'default'
                        onChangeText = { (text) => this.setState({username: text})} 
                    />
                    <TextInput
                        style ={styles.input}
                        placeholder = 'Introduzca su E-mail'
                        keyboardType = 'email-address'
                        onChangeText ={ (text) => this.setState({email: text})}
                    />
                    <TextInput
                        style ={styles.input}
                        placeholder = 'Introduzca su password'
                        keyboardType = 'password'
                        onChangeText ={ (text) => this.setState({password: text})}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        style ={this.state.username === '' &&  this.state.email === '' && this.state.password === '' ? styles.botonDifuso:styles.botonVisible} 
                        onPress={() => this.props.registrarse(this.state.email, this.state.password, this.state.username)}
                        disabled={this.state.username === '' &&  this.state.email === '' && this.state.password === '' ? true:false}
                        >
                            <Text style ={this.state.username === '' &&  this.state.email === '' && this.state.password === '' ? styles.textBotonDifuso:styles.textBoton}>Registrarse</Text>
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
    subTitulo:{
        fontFamily: 'Helvetica',
        textAlign: 'center',
        color: 'slategray',
        fontSize: '1rem'
      },
      textBoton:{
        fontFamily: 'Helvetica',
        color: 'white',
        opacity: 1
      },
      textBotonDifuso:{
        fontFamily: 'Helvetica',
        color: 'white',
        // opacity: 0.3
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
    logo: {
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: 25,
        fontFamily: 'Helvetica'
    }
  })



















