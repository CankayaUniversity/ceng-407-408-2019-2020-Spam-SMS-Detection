import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, AsyncStorage, Keyboard, Alert, Button, Image, ActivityIndicator } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import Swipeout from 'react-native-swipeout';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios';

const serverUrl = 'http://192.168.70.2:5000';
const http = axios.create({
    baseURL: serverUrl,
    withCredentials: true
})

export default class ChangeAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: {},
        };
    }
    chooseFile = () => {
        var options = {
            title: 'Select Image',
            customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    filePath: source,
                });
            }
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    {/*<Image 
              source={{ uri: this.state.filePath.path}} 
              style={{width: 100, height: 100}} />*/}
                    <Image
                        source={{
                            uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                        }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Image
                        source={{ uri: this.state.filePath.uri }}
                        style={{ width: 250, height: 250 }}
                    />
                    <Text style={{ alignItems: 'center' }}>
                        {this.state.filePath.uri}
                    </Text>
                    <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});