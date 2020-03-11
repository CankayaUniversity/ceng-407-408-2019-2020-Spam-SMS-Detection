import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import SettingsList from 'react-native-settings-list';

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://172.16.0.112:5000';
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

    helpAlert = async () => {
        Alert.alert(
            'Help',
            '1. This application is designed to filter the test messages on this device and detect spam content. \n\n 2. Upon launching, all of the text messages on this device will be displayed in the All Messages page. \n\n 3. Navigation to the Spam Box is possible by the use of the button with the "Spam Box" tag. \n\n 4. Inside the Spam Box, all of the detected spam messages will be displayed. \n\n 5. Text messages in both the All Messages and the Spam Box pages can be deleted upon choice. \n\n 6. The deletion of a message will result in the automatic deletion of its duplicates, given that there are any. \n\n 7. To update your user information, please use the "User Information" option under Settings. \n\n 8. To log out of the application, please use the "Logout" button under Settings.',
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
                                        onPress={() => this.helpAlert()}
                                    />
                                </View>
                            }
                            title='Help'
                            onPress={() => this.helpAlert()}
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