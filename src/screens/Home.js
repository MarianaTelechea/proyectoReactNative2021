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
            docs.forEach((doc) => {
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

    render(){
        return(
            <View style={styles.container}>
                {
                    this.state.loading ? (
                     <ActivityIndicator color={"green"} size={"large"} />
                    ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => <Post info={item} /> }
                    />
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'purple'
    }
})