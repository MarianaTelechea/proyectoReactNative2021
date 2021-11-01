import React, { Component } from 'react';

import { auth } from '../firebase/config';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Register from '../screens/Register';
import Login from '../screens/Login'; 
import Profile from '../screens/Profile'; 
import CreatePost from '../screens/CreatePost';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

export default class AuthDrawer extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggeIn: false,
            user: '',
            error:''
        }
    }

    registrarse(email, password, username){
        auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(response);
            user.user.updateProfile({displayName: username})
            this.setState({loggeIn:true})
        })
        .catch(error => {
            console.log(error);
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
                error: ''
            })
        })
        .catch(error => {
            console.log("error_login" + error);
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

    componentDidMount(){
        auth.onAuthStateChanged((user)=>{
            console.log(user)
            if(user) {
                this.setState({
                    loggeIn: true,
                    user: user.email
                })
            }else{
                this.setState({
                    loggeIn: false
                })
            }
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
                                    { () => <Home/> }
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
                                <Drawer.Screen name="Register" component = {()=> <Register registrarse={(email, password) => this.registrarse(email, password)} />} />
                                <Drawer.Screen name="Login" component = {()=> <Login ingresar ={(email, password) => this.ingresar(email, password)} />} />
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
