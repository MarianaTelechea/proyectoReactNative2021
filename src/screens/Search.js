import React, { Component } from 'react';
import { db } from '../firebase/config';
import { TextInput, FlatList, View, StyleSheet, Text } from 'react-native';
import Post from '../components/Post';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            posts: [],
            search: "true"
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
                loading: false,
                search: text
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <View style= {styles.container}>
                <Text style = {styles.titulo}>Busca los posteos de otras personas</Text>
                <TextInput
                    placeholder = 'Buscar por nombre de usuario'
                    onChangeText={(text)=>this.search(text)}
                    style= {styles.input}
                />
                {
                this.state.posts.length != 0 ?
                    <FlatList
                            data={this.state.posts}
                            keyExtractor={(post) => post.id}
                            renderItem={({item}) => <Post doc={item} /> }
                    />
                :
                    this.state.search.length > 1 ?
                        <Text style={styles.comentarios}>No existe un posteo</Text>
                    :
                        <Text></Text>
                }
            </View>
        )
    }
}

export default Search;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
    titulo:{
      marginTop: 15,
      fontFamily: 'Helvetica',
      textAlign: 'center',
      color: 'white',
      fontSize: '1.2rem'
    },
    comentarios:{
       color: 'lightgray',
       marginHorizontal: 8,
       marginTop: 15,
       opacity: 0.6
     },
    input: {
      height: 20,
      width:"90%",
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderBottomStyle: 'solid',
      borderBottomColor: '#FFFF',
      borderRadius: 10,
      marginVertical:15,
      backgroundColor: '#58585875',
      color: 'white'
    }
  })










