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

        if(this.state.permission === false) return <View style={styles.textPermisos}><Text style={styles.permisos}> No hay permisos </Text></View>

        return(
            <React.Fragment>
                {
                    this.state.photo ?
                        <React.Fragment>
                            <Image source = {{uri: this.state.photo}} style={styles.preview}/>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity
                                    onPress={()=>this.onAccept()}
                                    style={styles.botonA}
                                >
                                    <Text style={styles.textAceptar}>Aceptar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>this.onReject()}
                                    style={styles.botonR}
                                >
                                    <Text style={styles.textRechazar}>Rechazar</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <Text style={styles.logo}>PI | PostIt</Text>
                            <Camera 
                                style={styles.camera}
                                type={Camera.Constants.Type.front}
                                ref={reference => this.camera = reference}
                            />
                            <TouchableOpacity
                                onPress={()=> this.takePhoto()}
                                style={styles.botonA}
                            >
                                <Text style={styles.textAceptar}>Sacar foto</Text>

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
    container:{
        backgroundColor: 'black',
        justifyContent: 'center',
        width: "100%",
        fontFamily: 'Helvetica',
        marginVertical: 18,
        flex: 1
    },
    preview:{
        flex: 6,
        width: "100%"
    },
    btnContainer: {
        flex:0.5,
        flexWrap: "wrap",
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    textAceptar:{
        marginVertical: 15,
        marginHorizontal: 10,
        fontSize: '1rem',
        color: 'white',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'mediumpurple',
        width: '70%',
        alignContent: 'center',
        fontFamily: 'Helvetica',
        backgroundColor: 'mediumpurple',
        textAlign:'center'
    },
    textRechazar:{
        marginVertical: 15,
     marginHorizontal: 10,
     fontSize: '1rem',
     color: 'white',
     borderRadius: 4,
     borderWidth: 1,
     borderStyle: 'solid',
     borderColor: 'white',
     width: '70%',
     alignContent: 'center',
     fontFamily: 'Helvetica',
     textAlign:'center'
    },
    botonA:{
        alignItems:'center',
        backgroundColor: 'black'
    },
    botonR:{
        alignItems: 'center'
    },
    textBoton:{
        color: 'mediumpurple'
      },
      logo: {
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        backgroundColor: 'black',
        fontFamily: 'Helvetica',
        textAlign: 'center',
        paddingVertical: 10,
        width: '100%'
    },
    permisos:{
        fontSize: '1em',
        color: 'white',
    },
    textPermisos:{
        flexWrap:'wrap',
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        width: '100%',
        height: '100%'
    }
})