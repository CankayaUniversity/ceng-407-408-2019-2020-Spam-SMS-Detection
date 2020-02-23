import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import axios from 'axios';

const serverUrl = 'http://192.168.70.2:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class SpamBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {}
        }

        this.getData();
    }

    home() {
        Actions.home()
    }

    getData = async () => {
        var email = await AsyncStorage.getItem("session_ticket");

        http.post('/spambox', { email })
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
            leftAvatar={{ source: { uri: item.avatar } }}
            title={item.sender}
            subtitle={item.text}
            bottomDivider
            chevron
        />
    )
    
    render() {
        return (
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText} onPress={() => this.home()}>All Messages</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Spam Box</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    button: {
        width: 150,
        backgroundColor: '#D3D6D7',
        borderRadius: 25,
        marginVertical: 6,
        paddingVertical: 8,
        marginHorizontal: 6,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000000',
        textAlign: 'center'
    }
});