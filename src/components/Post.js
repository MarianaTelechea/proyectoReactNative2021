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
            comentario: "",
            posts: [],
            cantComments: 0
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
               comentario: "",
               cantComments: this.state.cantComments + 1
            }),
            console.log('comentario ok')
        )
        .catch(e=>console.log('Ups! Error' + e))
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.user}>{this.props.doc.data.username}  </Text>
                <Text style={styles.createAt}> Fecha: {this.props.doc.data.createAt}</Text>
                <Image source = {{uri:this.props.doc.data.photo}} style={styles.preview} />
                {
                    this.state.liked === true ?
                        <TouchableOpacity 
                            onPress={() => this.unLikes()}
                            style={styles.meGusta}>
                                <Text style={styles.textUnlike}>Unlike</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity 
                            onPress={() => this.likes()}
                            style={styles.meGusta}>
                                <Text style={styles.textLike}>Like</Text>
                        </TouchableOpacity>
                }
                <Text style={styles.texto}>Likeado por {this.state.likes} personas</Text>
                <Text style={styles.title}>{this.props.doc.data.title}</Text>
                <Text style={styles.description}>{this.props.doc.data.description}</Text>
                {
                    this.state.showModal ?
                        <Modal
                            animationType = "slide"
                            visible={this.state.showModal}
                            style={styles.modal}
                        >
                            <TouchableOpacity onPress={()=>this.closeModal()}>
                                <Text style={styles.verComentarios} >Ocultar comentarios</Text>
                            </TouchableOpacity> 
                            {
                                this.props.doc.data.comments == '' ?
                                    <Text style={styles.comentarios}>Aún no hay comentarios. Sé el primero en opinar</Text>
                                :
                                    <FlatList
                                        data={this.props.doc.data.comments}
                                        keyExtractor={(post) => post.id}
                                        renderItem={({item}) => <Text style={styles.comentarios}> <Text style={styles.userComment}>{item.owner}:</Text> {item.comentario}</Text> }
                                    />
                            }
                            <TextInput
                                placeholder = 'Escribe un comentario' 
                                onChangeText={text => this.setState({comentario:text})} 
                                value={this.state.comentario} 
                                style={styles.input} />
                            <TouchableOpacity 
                                onPress={()=>this.comments()}
                                disabled={this.state.comentario === ''? true:false}>
                                <Text style={this.state.comentario === ''?styles.noSubirComentarios:styles.subirComentario}>Subir comentario</Text>
                            </TouchableOpacity>
                        </Modal>
                    :
                        <TouchableOpacity onPress={()=>this.openModal()}>
                            <Text style={styles.verComentarios} >Ver {this.state.cantComments} comentarios</Text>
                        </TouchableOpacity>
                }
            </View>
        )}
}
const styles = StyleSheet.create({ 
  container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        width: "100%",
        fontFamily: 'Helvetica',
        marginVertical: 18,
  },
   modal: {
        width: '100%',
        borderColor: 'none',
        color: 'white'
  },
   createAt:{
        color: 'white',
        fontWeight: 'normal',
        textAlign: 'left',
        marginHorizontal: 8,
        marginBottom: 15
  },
  title:{
        color: 'white',
        fontSize: '1.5em',
        marginHorizontal: 8,
        marginTop: 15
  },
  description:{
        color: 'white',
        fontSize: '1em',
        marginHorizontal: 8,
        marginBottom: 10
  },
  texto:{
        color: 'white',
        fontWeight: 'normal',
        marginHorizontal: 8
  },
  user:{
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'mediumpurple',
        fontSize: 18,
        fontFamily: 'Helvetica',
  },
  preview:{
        height: 400,
        width: 365
  },
  meGusta:{
        alignContent: 'flex-end'
  },
  textLike: {
        marginVertical: 15,
        marginHorizontal: 10,
        fontSize: '1rem',
        color: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'white',
        width: '30%',
        alignContent: 'center',
        fontFamily: 'Helvetica',
        textAlign:'center'
 },
   textUnlike: {
        marginVertical: 15,
        marginHorizontal: 10,
        fontSize: '1rem',
        color: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'mediumpurple',
        width: '30%',
        alignContent: 'center',
        fontFamily: 'Helvetica',
        backgroundColor: 'mediumpurple',
        textAlign:'center'
 },
  verComentarios: {
        color: 'grey',
        fontWeight: 'normal',
        marginHorizontal: 8
 },
  subirComentario:{
        color: 'mediumpurple',
        fontWeight: 'normal',
        marginHorizontal: 8
 },
  noSubirComentarios:{
        color: 'grey',
        fontWeight: 'normal',
        marginHorizontal: 8
 },
  comentarios:{
        color: 'lightgray',
        marginHorizontal: 8,
    marginTop: 15
 },
  userComment:{
        color: 'lightgray',
        fontWeight: 'bold'
 },
  input: {
        height: 20,
        width:"100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical:10,
        backgroundColor: '#181818',
        color: 'white'
 },
   eliminar:{
        color: 'lightgray',
        fontWeight: 'normal',
        marginHorizontal: 8
  },
    eliminarPost: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        borderBottomRadius: 4,
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: 'lightgray',
        width: '40%',
        fontSize: '0.5rem'
  }
})