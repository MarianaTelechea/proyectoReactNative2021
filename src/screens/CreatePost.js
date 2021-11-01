import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from "../firebase/config";

export default class CreatePost extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: ''
        }
    }

     createPost(){
         db.collection("posts").add({
             username: auth.currentUser.displayName,
             title: this.state.title,
             description: this.state.description,
             createAt: Date.now(),
             likes:[],
             comments: []
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

    render(){
        return(
            <View>
                <Text>Posteos</Text>

                <Text>Título</Text>
                <TextInput 
                    onChangeText={ text => this.setState({title:text})}/>

                <Text>Descripcion</Text>
                <TextInput 
                    multiline = {true} 
                    numberOfLines= {4} 
                    onChangeText={text => this.setState({description:text})}/>

                <TouchableOpacity onPress={()=>this.createPost()}>
                    <Text>Crear</Text>
                </TouchableOpacity>

            </View>
        )
    }
}