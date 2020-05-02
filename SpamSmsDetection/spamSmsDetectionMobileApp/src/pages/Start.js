import React, { Component } from 'react';
import { Text, Button, View, Navigator, AsyncStorage } from 'react-native';

import { Actions, Scene, Router } from 'react-native-router-flux';

export default class Start extends Component {

    constructor(props) {
        super(props);

        //this.setDefaultSession();
        this.isLoginControl();
    }

    isLogin = async () => {
        var session = await AsyncStorage.getItem("session_ticket");
        console.log(session);
        if (session === null || session === "null")
            return false;
        return true;
    }

    
    setDefaultSession = async () => {
        AsyncStorage.setItem("session_ticket", "null");
    }

    async isLoginControl() {
        this.isLogin().then((res) => {
            console.log(res);
            if (res)
                Actions.home({ type: 'reset' });
            else
                Actions.login({ type: 'reset' });
        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text>Loading...</Text>
            </View>
        );
    }
}