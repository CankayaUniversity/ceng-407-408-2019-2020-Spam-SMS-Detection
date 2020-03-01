import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import SettingsList from 'react-native-settings-list';

import axios from 'axios';

const serverUrl = 'http://192.168.70.2:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.state = { switchValue: false };
    }

    goBack() {
        Actions.pop()
    }

    userInformation() {
        Actions.userinformation();
    }

    logOut = async () => {
        AsyncStorage.setItem("session_ticket", "null");
        console.log('Log Out');
        Actions.login();
    }

    deleteAccountAlert = async () => {
        Alert.alert(
            'Are you sure?',
            'You are about to permanently delete your account. Do you wish to proceed?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => this.deleteAccount() },
            ],
            { cancelable: false }
        )
    }

    deleteAccount = async () => {
        console.log('OK Pressed');

        var email = await AsyncStorage.getItem("session_ticket");

        http.post('/deleteaccount', { email })
            .then((res) => {
                Actions.login();
            })
            .catch((err) => {
                console.log(err);
                alert("Wrong");
            })
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header headerStyle={{ marginTop: 15 }} />
                        <SettingsList.Item
                            icon={
                                <View style={styles.container}>
                                    <Icon
                                        name="md-people"
                                        color="#d38aed"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => this.userInformation()}
                                    />
                                </View>
                            }
                            title='User Information'
                            onPress={() => this.userInformation()}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.container}>
                                    <Icon
                                        name="md-information-circle"
                                        color="#d38aed"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => Alert.alert('Help')}
                                    />
                                </View>
                            }
                            title='Help'
                            onPress={() => Alert.alert('Help')}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.container}>
                                    <Icon
                                        name="md-log-out"
                                        color="#d38aed"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => this.logOut()}
                                    />
                                </View>
                            }
                            title='Logout'
                            onPress={() => this.logOut()}
                        />
                        <SettingsList.Header headerStyle={{ marginTop: 15 }} />
                        <SettingsList.Item
                            icon={
                                <View style={styles.container}>
                                    <Icon
                                        name="md-trash"
                                        color="#FF3333"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => this.deleteAccountAlert()}
                                    />
                                </View>
                            }
                            title='Delete My Account'
                            onPress={() => this.deleteAccountAlert()}
                        />
                    </SettingsList>
                </View>
            </View>
        );
    }
    onValueChange(value) {
        this.setState({ switchValue: value });
    }
}

const styles = StyleSheet.create({
    container: {
        height: 30, 
        marginLeft: 10, 
        alignSelf: 'center'
    }
});