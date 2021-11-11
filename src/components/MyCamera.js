import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { storage } from '../firebase/config';

export default class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state ={
            permission: false,
            photo: ""
        }
        this.camera; // sacandolo del estado, evitamos el bucle infinito
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                permission: true
            })
        })
        .catch(()=>{
            this.setState({
                permission: false
            })
        })
    }

    takePhoto(){
        this.camera.takePictureAsync()
        .then((photo)=>{
            this.setState({
                photo: photo.uri // direccion a la memoria cache de la compu o celu
            })
        })
    }

    onReject(){
        this.setState({
            photo: ""
        })
    }

    onAccept(){
        fetch(this.state.photo)
        .then((response)=> response.blob())
        .then((image) => {
            const storageRef = storage.ref("camera/"+ Date.now()); // lugar donde se va a guardar la imagen en firebase
            storageRef.put(image) // contenido
            .then(()=>{
                console.log("SE SUBIO");
                storageRef.getDownloadURL() // para agarrar la foto que te saques y guardes en el storage
                .then((url)=>{
                    this.props.onPhotoUpload(url);
                })
            })
        })
    }

    render(){

        if(this.state.permission === false) return <Text> No hay permisos </Text>

        return(
            <React.Fragment>
                {
                    this.state.photo ?
                        <React.Fragment>
                            <Image source = {{uri: this.state.photo}} style={styles.preview}/>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                    onPress={()=>this.onReject()}
                                >
                                    <Text>Rechazar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.onAccept()}
                                >
                                    <Text>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Camera 
                                style={styles.camera}
                                type={Camera.Constants.Type.front}
                                ref={reference => this.camera = reference}
                            />
                            <TouchableOpacity
                                onPress={()=> this.takePhoto()}
                            >
                                <Text>Sacar foto</Text>

                            </TouchableOpacity>
                        </React.Fragment>

                }
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    camera:{
        flex:1,
        width: "100%"
    },
    preview:{
        flex: 6,
        width: "100%"
    },
    btnContainer: {
        flex:1
    }
})