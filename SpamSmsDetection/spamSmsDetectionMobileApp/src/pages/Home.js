import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.showData();
    }

    showData = async () => {
        var session = await AsyncStorage.getItem("session_ticket");
        alert('session: ' + session);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{'\n'}</Text>
                <Text style={styles.headerText}>Spam SMS Detection</Text>
                <Text>{'\n'}</Text>
                <Text>{'WELCOME'}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    headerText: {
        color: '#000000',
        fontSize: 24,
        fontWeight: '500',
    }
});