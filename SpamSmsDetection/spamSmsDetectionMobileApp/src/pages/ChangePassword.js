import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';

import axios from 'axios';

const serverUrl = 'http://192.168.70.2:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null
        }
    }

    saveData = async () => {
        const { password } = this.state;
        var email = await AsyncStorage.getItem("session_ticket");

        http.post('/changepassword', { email, password })
            .then(() => {
                Keyboard.dismiss();
                alert("You have successfully changed your password.");
            })
            .catch((err) => {
                console.log(err);
                alert("Invalid entry or such a password already exists.");
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    placeholderTextColor="#002f6c"
                    ref={(input) => this.password = input}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={this.saveData}>Update</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 250,
        backgroundColor: '#d38aed',
        borderRadius: 25,
        marginVertical: 6,
        paddingVertical: 8,
        marginHorizontal: 6,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    }
});