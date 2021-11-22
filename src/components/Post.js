import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import firebase from 'firebase';
import { auth, db } from '../firebase/config';

export default class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            liked: false,
            showModal: false,
            comentario: ""
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
            console.log('deslikeado ok')
        )
        .catch(e=>console.log('Ups! Error' + e))
    }

    openModal(){
        this.setState({
            showModal: true
        })
    }

    closeModal(){
        this.setState({
            showModal: false
        })
    }

    comments(){
        let thisDoc = db.collection('posts').doc(this.props.doc.id);

        thisDoc.update(
            {comments:firebase.firestore.FieldValue.arrayUnion({
                createAt: Date.now(),
                comentario: this.state.comentario,
                owner: auth.currentUser.displayName,
                id: Date.now()
            })} // mirar despues
        )
        .then(
            this.setState({
               comentario: ""
            }),
            console.log('comentario ok')
        )
        .catch(e=>console.log('Ups! Error' + e))
    }

    render(){
        return(
            <View style={styles.container}>

                <Image source = {{uri:this.props.doc.data.photo}} style={styles.preview} />
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

                {
                    this.state.showModal ?
                    <Modal
                        animationType = "slide"
                        visible={this.state.showModal}
                    >
                        <TouchableOpacity onPress={()=>this.closeModal()}>
                            <Text>Ocultar comentarios</Text>
                        </TouchableOpacity> 
                        <FlatList
                            data={this.props.doc.data.comments}
                            keyExtractor={(post) => post.id}
                            renderItem={({item}) => <Text>{item.comentario}</Text> } // Esto es lo que tengo q crear
                        />
                        <TextInput onChangeText={text => this.setState({comentario:text})} value={this.state.comentario} />
                        <TouchableOpacity onPress={()=>this.comments()}>
                            <Text>Subir comentario</Text>
                        </TouchableOpacity>
                    </Modal>
                    :
                        <TouchableOpacity onPress={()=>this.openModal()}>
                            <Text>Ver comentarios</Text>
                        </TouchableOpacity>
                }

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
  },
  preview:{
    height: 200,
    width: 200
}
})
