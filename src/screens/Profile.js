import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase/config";
import ProfilePost from '../components/ProfilePost';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts:[]
        }
    }

    componentDidMount(){
        db.collection("posts")
        
        .where("email","==", auth.currentUser.email)
        .orderBy("createAt", "desc").onSnapshot((docs) => {
            let posts = [];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            console.log(posts);
            this.setState({
                posts: posts,
                loading: false
            })
        })
    }
    delete(id){
        let thisDoc = db.collection('posts').doc(id);
        thisDoc.delete()
            const postsFiltered = this.state.posts.filter(post => post.id != id)
            this.setState({posts: postsFiltered});
    }
    
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>Profile</Text>
                <Text style={styles.user}>{this.props.user}</Text>
                <Text style={styles.subTitulo}>{auth.currentUser.metadata.lastSignInTime}</Text>
                <Text style={styles.posteos}>Cantidad de posteos: {this.state.posts.length}</Text>
                <Text style={styles.misPosteos}>Mis posteos</Text>  
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => <ProfilePost doc={item} delete={(createAt)=>this.delete(createAt)}/> }  
                />     
                <TouchableOpacity 
                    onPress={()=>this.props.signOut()}
                    style={styles.boton}>
                        <Text style ={styles.textBoton}>Cerrar sesión</Text>
                </TouchableOpacity>
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
      paddingVertical: 15,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      color: 'white',
      fontSize: '1.5rem',
      marginTop: 20
    },
    user:{
        marginHorizontal: 10,
        fontWeight: 'bold',
        color: 'mediumpurple',
        fontSize: 20,
        fontFamily: 'Helvetica',
    },
    subTitulo:{
        fontFamily: 'Helvetica',
        textAlign: 'center',
        color: 'slategray',
        fontSize: '1rem'
    },
    textBoton:{
        color: 'white'
    },
    posteos:{
        color: 'white',
        fontWeight: 'normal',
        marginHorizontal: 8,
        fontFamily: 'Helvetica'
    },
    misPosteos:{
        paddingHorizontal: 30,
        fontFamily: 'Helvetica',
        color: 'white',
        fontSize: '1.2rem',
        width: '100%',
        alignItems:'left',
        marginTop: 50,
        marginBottom: 20
      },
    boton:{
        backgroundColor: 'mediumpurple',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 5,
        marginVertical:20,
        width: "100%"
    }
  })