import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import Icon from "react-native-vector-icons/Ionicons";
import SettingsList from 'react-native-settings-list';

import axios from 'axios';

const serverUrl = 'http://192.168.70.2:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class UserInformation extends Component {
    constructor(props) {
        super(props);
    }

    changeTelephoneNumber() {
        Actions.changenumber();
    }

    changeEmail() {
        Actions.changeemail();
    }

    changePassword() {
        Actions.changepassword();
    }

    render() {
        return (
            <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
                    <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
                        <SettingsList.Header headerStyle={{ marginTop: 15 }} />
                        <SettingsList.Item
                            icon={
                                <View style={{ height: 30, marginLeft: 10, alignSelf: 'center' }}>
                                    <Icon
                                        name="md-call"
                                        color="#d38aed"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => this.changeTelephoneNumber()}
                                    />
                                </View>
                            }
                            title='Change Telephone Number'
                            onPress={() => this.changeTelephoneNumber()}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={{ height: 30, marginLeft: 10, alignSelf: 'center' }}>
                                    <Icon
                                        name="md-mail"
                                        color="#d38aed"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => this.changeEmail()}
                                    />
                                </View>
                            }
                            title='Change Email'
                            onPress={() => this.changeEmail()}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={{ height: 30, marginLeft: 10, alignSelf: 'center' }}>
                                    <Icon
                                        name="md-key"
                                        color="#d38aed"
                                        style={{ alignSelf: 'center' }}
                                        size={30}
                                        onPress={() => this.changePassword()}
                                    />
                                </View>
                            }
                            title='Change Password'
                            onPress={() => this.changePassword()}
                        />
                    </SettingsList>
                </View>
            </View>
        );
    }
    onValueChange(value) {
        this.setState({ switchValue: value });
    }

    /*render() {
        return (
            <View>
                <View style={styles.container}>
                    <Text>{'\n'}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.changeAvatar()}>Change Profile Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.changeTelephoneNumber()}>Change Telephone Number</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.changeEmail()}>Change Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.changePassword()}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }*/
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
    },
    back: {
        width: 75,
        backgroundColor: '#D3D6D7',
        borderRadius: 25,
        marginVertical: 6,
        paddingVertical: 8,
        marginHorizontal: 6
    },
    button: {
        width: 250,
        backgroundColor: '#d38aed',
        borderRadius: 25,
        marginVertical: 6,
        paddingVertical: 8,
        marginHorizontal: 6,
    },
    buttonLogout: {
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
    buttonBottom: {
        width: 250,
        backgroundColor: '#FF3333',
        borderRadius: 25,
        marginVertical: 6,
        paddingVertical: 8,
        marginHorizontal: 6,
        position: 'absolute',
        bottom: 0
    },
    textBottom: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        alignItems: 'center'
    },
    backView: {
        width: 75,
        borderRadius: 25,
        paddingVertical: 8,
        marginHorizontal: 10
    }
});