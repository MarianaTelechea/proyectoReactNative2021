import React, { Component } from 'react';
import { auth } from '../firebase/config';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {StyleSheet} from "react-native";
import Register from '../screens/Register';
import Login from '../screens/Login'; 
import Profile from '../screens/Profile'; 
import CreatePost from '../screens/CreatePost';
import Home from '../screens/Home';
import Search from '../screens/Search';
const Drawer = createDrawerNavigator();
export default class AuthDrawer extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggeIn: false,
            user: '',
            error:'',
            // posts:[],
            // postsIniciales:[]
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            console.log(user)
            if(user) {
                this.setState({
                    loggeIn: true,
                    user: user.email,
                })
            }else{
                this.setState({
                    loggeIn: false
                })
            }
        })
    }
    registrarse(email, password, username){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(username);
            user.user.updateProfile({displayName: username})
            this.setState({
                loggeIn:true,
                user: user.user.email,
                error: ""
            })
        })
        .catch(error => {
            console.log(error);
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                alert('Disculpe, ese email ya esta en uso')
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                alert('Disculpe, el email es invalido')
            }
            if (error.code === 'auth/weak-password') {
                console.log('Password should be at least 6 characters');
                alert('La contraseña debe tener al menos 6 caracteres')
            }
            this.setState({
                loggeIn:false,
                error: "Fallo en el registro"
            })
        })
    }
    ingresar(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log("mensajeLogin" + response);
            this.setState({
                loggeIn:true,
                user: response.user.email,
                error: ""
            })
        })
        .catch(error => {
            console.log("error_login" + error);
            // if (error.code === 'auth/error_loginError') {
            //     console.log('That email address is invalid!');
            //     alert('Disculpe, el nombre de usuario es invalido')
            // }
            // if (error.code === null) {
            //     console.log('That email address is invalid!');
            //     alert('Disculpe, el nombre de usuario es invalido')
            // }
            this.setState({
                loggeIn:false,
                error: "Error en loggeo"
            })
        })
    }
    
    signOut(){
        auth.signOut()
        .then(response => {
            this.setState({
                loggeIn: false,
                user: ''
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    render(){
        return(
            <NavigationContainer> 
                <Drawer.Navigator>
                    {
                        this.state.loggeIn ?
                            <React.Fragment>
                                <Drawer.Screen name="Home">
                                    { () => <Home delete={()=>this.delete} /> }
                                </Drawer.Screen>
                                <Drawer.Screen name="Search">
                                    { () => <Search/> }
                                </Drawer.Screen>
                                <Drawer.Screen name="Profile">
                                    { () => <Profile user={this.state.user} signOut={()=>this.signOut()} /> }
                                </Drawer.Screen>
                                <Drawer.Screen name="Crear">
                                    { (drawerProps) => <CreatePost drawerProps={drawerProps} /> }
                                </Drawer.Screen>
                            </React.Fragment>
                        :
                            <React.Fragment> 
                                <Drawer.Screen name="Register" component = {()=> <Register registrarse={(email, password, username) => this.registrarse(email, password, username)} />} />
                                <Drawer.Screen name="Login" component = {()=> <Login ingresar ={(email, password) => this.ingresar(email, password)} />} />
                            </React.Fragment>
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}
export function logOut() {
    throw new Error('Function not implemented.');
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black'
    }
  })