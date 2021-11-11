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
                title: '',
                description: ''
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

                        <Text>Título</Text>
                        <TextInput
                            style={styles.input} 
                            onChangeText={ text => this.setState({title:text})}/>

                        <Text>Descripcion</Text>
                        <TextInput
                            style={styles.input} 
                            multiline = {true} 
                            numberOfLines= {5} 
                            onChangeText={text => this.setState({description:text})}/>

                        <TouchableOpacity 
                            onPress={()=>this.createPost()}
                            style={styles.btn}>
                                
                            <Text>Crear</Text>
                        </TouchableOpacity>
                    </View>
            }
            </React.Fragment>
        )
    }
}

//Aquí es donde le aplico los estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo:{
      fontFamily: 'arial',
      textAlign: 'center',
      color: 'tomato',
      fontSize: '2rem'
    },
    input: {
      height: 20,
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#ccc',
      borderRadius: 6,
      marginVertical:10
    },
  
    btn: {
        backgroundColor: 'teal',
        padding: 10,
        color: 'white'
    },
    error: {
        color: 'tomato'
    }
  }) 