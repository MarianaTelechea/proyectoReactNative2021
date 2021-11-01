import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            liked: false,
            text: "Me gusta"
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
            {likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)}
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

                <Text>{this.props.info.data.username}</Text>
                <Text>{this.props.info.data.title}</Text>
                <Text>{this.props.info.data.desciption}</Text>

                {
                    this.state.liked ?
                     <TouchableOpacity onPress={() => this.unLikes()}>
                         <Text>Quitar Like</Text>
                     </TouchableOpacity>
                    :
                        <TouchableOpacity onPress={() => this.likes()}>
                        <Text>Like</Text>
                    </TouchableOpacity>
                }
                <Text>likes:{this.state.likes}</Text>

            </View>
        )}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'red',
        marginBotton: 5
    }
})