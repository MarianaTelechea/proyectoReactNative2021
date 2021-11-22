import React, { Component } from 'react';
//Aquí importo la configuración del auth que me ofrece firebase
import { auth, db } from '../firebase/config';
import { TextInput, ActivityIndicator, FlatList, View } from 'react-native';
import Post from '../components/Post';
//-------------------------------------------------------------
class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            posts: []
        }
    }
    
    search(text){
        console.log(text);
        db.collection('posts').where('username','==',text).get().then(docs => {
            let posts=[];
            docs.forEach(doc => {
                posts.push({
                    id:doc.id,
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
            <React.Fragment>
                <TextInput
                    onChangeText={(text)=>this.search(text)}
                />
                {/*Aquí con la condición muestro unas opcioneu otras*/}
                {
                this.state.loading ?
                <ActivityIndicator color={"green"} size={"large"} /> :
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(post) => post.id}
                        renderItem={({item}) => <Post doc={item} /> }
                    />       
                }
            </React.Fragment>
        )
    }
}
export default Search;