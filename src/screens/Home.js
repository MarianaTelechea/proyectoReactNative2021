import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Post from '../components/Post';
import {db} from '../firebase/config'

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: true
        }
    }

    componentDidMount(){
        db.collection("posts").orderBy("createAt", "desc").onSnapshot((docs) => {
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

    // delete(id){
    //     db.collection('posts').where('createAt', '==', id).get()
    //     .then(data => {
    //         data.forEach(doc => doc.ref.delete())
    //         const postsFiltered = this.state.posts.filter(post => post.createAt != id)
    //         this.setState({posts: postsFiltered});
    //     })
    // }

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.loading ?
                     <ActivityIndicator color={"white"} size={"large"} /> :

                     <View style={styles.container}>
                        <Text style ={styles.logo} >PI | PostIt</Text>
                    
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={(post) => post.id}
                            renderItem={({item}) => <Post doc={item}/> }
                            // delete={(createAt)=>this.delete(createAt)} 
                        /> 

                    </View>       
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    logo: {
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        paddingVertical: 15,
        fontFamily: 'Helvetica'
    }
})