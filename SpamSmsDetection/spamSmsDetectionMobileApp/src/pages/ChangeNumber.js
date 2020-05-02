import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://192.168.1.107:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class ChangeNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: null
        }
    }

    saveData = async () => {
        const { phone } = this.state;
        var email = await AsyncStorage.getItem("session_ticket");
        var invalid = false;

        await http.post('/getphone', { email, phone })
            .then((res) => {
                if (res.data === "Invalid phone") {
                    console.log("invalid phone");
                    invalid = true;
                }
            })
            .catch((err) => {
                console.log(err);
            })

        if (invalid) {
            alert("Phone number already exists. Phone number: " + phone);
        } else if (phone === null || phone === undefined || phone === "") {
            alert("Invalid phone number.");
        } else {
            http.post('/changephone', { email, phone })
                .then(() => {
                    Keyboard.dismiss();
                    alert("You have successfully changed your phone number. Phone number: " + phone);
                })
                .catch((err) => {
                    console.log(err);
                    alert("Invalid entry or such a phone number already exists. Phone number: " + phone);
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <TextInput style={styles.inputBox}
                    onChangeText={(phone) => this.setState({ phone })}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Phone Number"
                    placeholderTextColor="#002f6c"
                    selectionColor="#fff"
                    onSubmitEditing={() => this.phone.focus()} />
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