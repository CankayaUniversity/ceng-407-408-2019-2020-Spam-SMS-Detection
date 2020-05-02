import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://192.168.1.107:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class ChangeEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null
        }
    }

    setSessionTicket = async (ticket) => {
        AsyncStorage.setItem("session_ticket", ticket);
    }

    saveData = async () => {
        const { email } = this.state;
        var emailCurrent = await AsyncStorage.getItem("session_ticket");
        var invalid = false;

        await http.post('/getemail', { email, emailCurrent })
            .then((res) => {
                if (res.data === "Invalid email") {
                    console.log("invalid email");
                    invalid = true;
                }
            })
            .catch((err) => {
                console.log(err);
            })

        if (invalid) {
            alert("Email already exists. Email: " + email);
        } else if (email === null || email === undefined || email === "") {
            alert("Invalid email.");
        } else {
            http.post('/changeemail', { email, emailCurrent })
                .then(() => {
                    Keyboard.dismiss();
                    alert("You have successfully changed your email. Email: " + email);
                    this.setSessionTicket(String(email));
                })
                .catch((err) => {
                    console.log(err);
                    alert("Invalid entry or such an email already exists. Email: " + email);
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(email) => this.setState({ email })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={() => this.email.focus()} />
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