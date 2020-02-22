import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { ListItem } from 'react-native-elements';

import axios from 'axios';

const serverUrl = 'http://192.168.70.2:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {}
        }

        this.getData();
        this.showData();
    }

    showData = async () => {
        var session = await AsyncStorage.getItem("session_ticket");
        alert('session: ' + session);
    }

    getData = async () => {
        var email = await AsyncStorage.getItem("session_ticket");

        http.post('/home', { email })
            .then((res) => {
                var dataJson = res.request._response
                
                var obj = JSON.parse(dataJson);

                this.setState({
                    message: { obj },
                })
                console.log(this.state.message)
            })
            .catch((err) => {
                console.log(err);
                alert("Wrong");
            })

    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.sender}
            subtitle={item.text}
            bottomDivider
            chevron
        />
    )

    render() {
        return (
            <View>
                <Text>{'\n'}</Text>
                <Text style={styles.headerText}>All Messages</Text>
                <Text>{'\n'}</Text>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.message.obj}
                    renderItem={this.renderItem}
                />
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
        paddingTop: 22,
    },
    headerText: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});