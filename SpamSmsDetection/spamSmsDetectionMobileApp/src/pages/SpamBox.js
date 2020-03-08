import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import Icon from "react-native-vector-icons/Ionicons";

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://172.20.10.3:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class SpamBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {},
            rowIndex: null
        }

        this.getData();
    }

    home() {
        Actions.home()
    }

    settings() {
        Actions.settings()
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

    rightSwipeOutButtons(item) {
        return [
            {
                text: "Remove",
                onPress: () => this.removeItem(item),
                backgroundColor: "#FF4500",
                color: "#FFF"
            }
        ];
    }

    removeItem = async (item) => {
        /*let list = this.state.message.filter(item => {
            return item != listItem;
        });

        this.setState({ list });*/

        var email = await AsyncStorage.getItem("session_ticket");
        var text = item.text;

        http.post('/deletespam', { text, email })
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

    onSwipeOpen(rowIndex) {
        this.setState({
            rowIndex: rowIndex
        })
    }
    onSwipeClose(rowIndex) {
        if (rowIndex === this.state.rowIndex) {
            this.setState({ rowIndex: null });
        }
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item, index }) => (
        <Swipeout
            right={this.rightSwipeOutButtons(item)}
            backgroundColor={"transparent"}
            onOpen={() => (this.onSwipeOpen(index))}
            close={this.state.rowIndex !== index}
            onClose={() => (this.onSwipeClose(index))}
            rowIndex={index}
            sectionId={0}
            autoClose={true}
        >
            <ListItem
                leftAvatar={{ source: { uri: item.avatar } }}
                title={item.sender}
                subtitle={item.text}
                bottomDivider={true}
                onPress={() =>
                    Alert.alert(
                        item.sender,
                        item.text
                    )
                }
            />
        </Swipeout>
    )

    render() {
        return (
            <View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.home()}>All Messages</Text>
                    </TouchableOpacity>
                    <View style={styles.icon}>
                        <Icon
                            name="md-settings"
                            color="#D3D6D7"
                            size={30}
                            onPress={() => this.settings()}
                        />
                    </View>
                </View>
                <Text>{'\n'}</Text>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.message.obj}
                    extraData={this.state.rowIndex}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    icon: {
        marginLeft: 'auto',
        marginVertical: 8,
        marginHorizontal: 6,
    },
    button: {
        width: 150,
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
    }
});