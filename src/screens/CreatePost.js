import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import MyCamera from '../components/MyCamera';
import { auth, db } from "../firebase/config";

export default class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            photo: "",
            showCamera: true
        }
    }
    
     createPost(){
         db.collection("posts").add({
             username: auth.currentUser.displayName,
             email: auth.currentUser.email,
             title: this.state.title,
             description: this.state.description,
             createAt: Date.now(),
             likes:[],
             comments: [],
             photo: this.state.photo
         })
         .then(response => {
             console.log(response);
             this.setState({
                title: "",
                description: "",
                showCamera: true
             });
             this.props.drawerProps.navigation.navigate("Home")
         })
         .catch(error => {
             console.log(error);
         })
     }
     onPhotoUpload(url){
        this.setState({
            photo: url,
            showCamera: false
        })
     }

    render(){
        return(
            <React.Fragment>
            {
                this.state.showCamera ?
                    <MyCamera onPhotoUpload={(url)=>this.onPhotoUpload(url)} />
                :
                    <View style={styles.container}>
                        <Text style={styles.titulo}>Posteos</Text>
                        <Text style={styles.subTitulo}>Título</Text>
                        <TextInput
                            style={styles.input} 
                            onChangeText={ text => this.setState({title:text})}/>
                                <Text style={styles.subTitulo}>Descripcion</Text>
                        <TextInput
                            style={styles.inputDesc} 
                            multiline = {true} 
                            numberOfLines= {5} 
                            onChangeText={text => this.setState({description:text})}/>
                        <TouchableOpacity 
                            onPress={()=>this.createPost()}
                            style={styles.botonVisible}>    
                                <Text style={styles.textBoton}>Crear</Text>
                        </TouchableOpacity>
                       
                    </View>
            }
            </React.Fragment>
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
      fontSize: '1.5rem',
      paddingBottom: 15,
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
        color: 'lavender',
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
        opacity: 0.3
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
    inputDesc: {
        height: '40%',
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
  
    btn: {
        backgroundColor: 'teal',
        padding: 10,
        color: 'white'
    },
    error: {
        color: 'tomato'
    },
    logo: {
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: 25,
        fontFamily: 'Helvetica'
    }
  })