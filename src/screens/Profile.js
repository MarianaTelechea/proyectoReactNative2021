import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../firebase/config";


export default class Profile extends Component{

    constructor(props){
        super(props);
        this.state = {}
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

    render(){
        return(
            <View style={styles.container}>
                <Text>Profile</Text>
                <Text>{this.props.user}</Text>
    
                <TouchableOpacity onPress={()=>this.props.signOut()}>
                    <Text>SALIR</Text>
                </TouchableOpacity>
    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})