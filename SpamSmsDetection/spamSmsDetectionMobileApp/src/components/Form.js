import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

import { Actions } from 'react-native-router-flux';

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://192.168.1.107:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: null,
            email: null,
            password: null,
            avatar: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar.png'
        }
    }

    setSessionTicket = async (ticket) => {
        AsyncStorage.setItem("session_ticket", ticket);
    }

    saveData = async () => {
        const { email, password, phone, avatar } = this.state;

        //save data with asyncstorage
        let loginDetails = {
            email: email,
            password: password
        }

        if (this.props.type !== 'Login') {
            //AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
            if (email && password && phone) {
                http.post('/register', { email, password, phone, avatar })
                    .then(() => {
                        Keyboard.dismiss();
                        alert("You successfully registered. Email: " + email + ' phone: ' + phone);
                        Actions.login();
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Email or phone number is used");
                    })
            } else {
                alert("Missing or invalid entry");
            }
        }
        else if (this.props.type == 'Login') {
            if (email && password) {
                http.post('/login', { email, password })
                    .then((res) => {
                        console.log('SUCCESS')
                        console.log(email, password)
                        console.log(res.data)

                        if (res.data.includes("Invalid email and password")) {
                            alert("Wrong or invalid email and password");
                        } else {
                            this.setSessionTicket(String(email));
                            Actions.home({ type: 'reset' })
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("Wrong or invalid email and password");
                    })
            } else {
                alert("Missing or invalid entry");
            }
        }
    }

    showData = async () => {
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: ' + ld.email + ' ' + 'password: ' + ld.password);
    }

    render() {
        const signupScreen = <View style={styles.container}>
            <TextInput style={styles.inputBox}
                onChangeText={(phone) => this.setState({ phone })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Phone Number"
                placeholderTextColor="#002f6c"
                selectionColor="#fff"
                onSubmitEditing={() => this.password.focus()} />

            <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({ email })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Email"
                placeholderTextColor="#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={() => this.password.focus()} />

            <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({ password })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#002f6c"
                ref={(input) => this.password = input}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
            </TouchableOpacity>
        </View>;

        const loginScreen = <View style={styles.container}>
            <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({ email })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Email"
                placeholderTextColor="#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={() => this.password.focus()} />

            <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({ password })}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="#002f6c"
                ref={(input) => this.password = input}
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
            </TouchableOpacity>
        </View>;

        return (
            this.props.type == 'Login' ? loginScreen : signupScreen
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox: {
        width: 300,
        backgroundColor: '#eeeeee',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#d38aed',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});