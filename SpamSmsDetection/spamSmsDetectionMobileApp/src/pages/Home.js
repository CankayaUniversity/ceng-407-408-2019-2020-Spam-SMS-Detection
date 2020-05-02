import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert, PermissionsAndroid } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import Icon from "react-native-vector-icons/Ionicons";
import SendSMS from 'react-native-sms'
import SmsAndroid from 'react-native-get-sms-android';

import axios from 'axios';

//const serverUrl = 'http://192.168.70.2:5000';
const serverUrl = 'http://192.168.1.107:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: {},
            rowIndex: null,
            refreshing: true,
        }

        //this.getSMS();
        this.getData();
        this.showData();
        this.requestSmsPermission();
    }

    spambox() {
        Actions.spambox()
    }

    settings() {
        Actions.settings()
    }

    requestSmsPermission = async () => {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
                title: 'Read Sms Permission',
                message: 'App needs access to your sms ',
            }
        );
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            {
                title: 'Write Sms Permission',
                message: 'App needs access to your sms ',
            }
        );
        /*if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            alert('You can use the Sms');
        } else {
            alert('SMS Permission Denied.');
        }*/
    }

    deleteAll = async () => {
        var email = await AsyncStorage.getItem("session_ticket");

        http.post('/deleteall', { email })
            .then(async (res) => {
                if (res) {
                    await console.log("All messages deleted")
                }
            })
            .then(async () => {
                await console.log("Yes")
            })
            .catch(async (err) => {
                await console.log(err);
                alert("Wrong");
            })

    }

    // Function to read particular message from inbox with id
    getSMS = async () => {
        var email = await AsyncStorage.getItem("session_ticket");
        let filter = {
            box: '', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
            // the next 2 filters can be used for pagination
            indexFrom: 0, // start from index 0
            maxCount: 1000, // count of SMS to return each time
        };
        await SmsAndroid.list(
            await JSON.stringify(filter),
            async (fail) => {
                await console.log('Failed with this error: ' + fail);
            },
            async (count, smsList) => {
                await console.log('Count: ', count);
                await console.log('List: ', smsList);
                var arr = await JSON.parse(smsList);

                async function asyncForEach(array, callback) {
                    for (let index = 0; index < array.length; index++) {
                        await callback(array[index], index, array);
                    }
                }

                await asyncForEach(arr, async (object) => {
                    console.log('Id: ' + object._id);
                    console.log('Message: ' + object.body);
                    //alert('Message: ' + object.body)

                    var sender = object.address;
                    var textMessage = object.body;

                    console.log('Sender: ' + sender);
                    console.log('Text: ' + textMessage);
                    console.log('Email: ' + email);

                    http.post('/setsms', { email, sender, textMessage })
                        .catch((err) => {
                            console.log(err);
                            alert("Wrong SMS Not Added");
                        })
                    console.log("SMS Added");
                    console.log('Yes');
                });
            },
        );
    }

    // Function to delete particular message from inbox with id
    deleteSMS = () => {
        console.log('deleteSMS');
        SmsAndroid.delete(
            29,
            (fail) => {
                console.log('Failed with this error: ' + fail);
            },
            (success) => {
                console.log('SMS deleted successfully');
            },
        );
    }

    showData = async () => {
        var session = await AsyncStorage.getItem("session_ticket");
        //alert('session: ' + session);
    }

    getData = async () => {
        await this.deleteAll();
        await this.getSMS();
        var email = await AsyncStorage.getItem("session_ticket");

        await http.post('/home', { email })
            .then((res) => {
                var dataJson = res.request._response

                var obj = JSON.parse(dataJson);

                this.setState({
                    message: { obj },
                    refreshing: false,
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
        var email = await AsyncStorage.getItem("session_ticket");
        var text = item.text;

        http.post('/delete', { text, email })
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
                numberOfLines={1}
                subtitle={<Text numberOfLines={1}> {item.text} </Text>}
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

    onRefresh() {
        //Clear old data of the list
        this.setState({ message: {}, rowIndex: null });
        //Call the Service to get the latest data
        this.getData();
        this.showData();
        this.requestSmsPermission();
    }

    render() {
        if (this.state.refreshing) {
            return (
                //loading view while data is loading
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => this.spambox()}>Spam Box</Text>
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
                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
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