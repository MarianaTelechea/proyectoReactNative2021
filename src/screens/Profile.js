import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile(props){
    return(
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>{props.user}</Text>

            <TouchableOpacity onPress={()=>props.signOut()}>
                <Text>SALIR</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})