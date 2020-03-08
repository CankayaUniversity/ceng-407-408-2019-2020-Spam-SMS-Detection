import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import SettingsList from 'react-native-settings-list';

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://172.20.10.3:5000';
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
                                <View style={styles.container}>
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
                                <View style={styles.container}>
                                    <Icon
                                        name="md-at"
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
                                <View style={styles.container}>
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
}

const styles = StyleSheet.create({
    container: { height: 30, 
        marginLeft: 10, 
        alignSelf: 'center' 
    }
});