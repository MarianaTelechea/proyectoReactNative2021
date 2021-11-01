import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            liked: false
        }
    }

    componentDidMount(){
        if(this.props.doc.data.likes){
            let likes = this.props.doc.data.likes.length;
            this.setState({
                likes:likes
            })
            if (this.props.doc.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    liked:true
                })
            }
        }
    }

    likes(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);

        thisDoc.update(
            {likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            }),
            console.log('likeado ok')
        )
        .catch(e=>console.log(e))
    }

    unLikes(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);

        thisDoc.update(
            {likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)}
        )
        .then(
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            }),
            console.log('desliekado ok')
        )
        .catch(e=>console.log('Ups! Error' + e))
    }

    render(){
        return(
            <View style={styles.container}>

                <Text>{this.props.doc.data.username}</Text>
                <Text>{this.props.doc.data.title}</Text>
                <Text>{this.props.doc.data.desciption}</Text>

                {
                    this.state.liked === true ?
                     <TouchableOpacity 
                        onPress={() => this.unLikes()}
                        style={styles.quitarLike}>
                            <Text style={styles.texto}>Quitar Like</Text>
                     </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            onPress={() => this.likes()}
                            style={styles.meGusta}>
                        <Text style={styles.texto}>Like</Text>
                    </TouchableOpacity>
                }
                <Text>likes:{this.state.likes}</Text>

            </View>
        )}
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: '#ccc',
        shadowOffset:{
            width: 0,
            height: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,   
    },
    quitarLike: {
      backgroundColor: 'tomato',
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: 'center',
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'blue'
  },
  meGusta: {
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'blue'
  },
  texto:{
    color: 'white'
  }
})
