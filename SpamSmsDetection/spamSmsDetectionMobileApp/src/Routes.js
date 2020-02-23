import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Start from './pages/Start';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SpamBox from './pages/SpamBox';

export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle={styles.barButtonIconStyle}
                hideNavBar={false}
                navigationBarStyle={{ backgroundColor: '#1565c0', }}
                titleStyle={{ color: 'white', }}
            >
                <Stack key="root">
                    <Scene key="start" component={Start} />
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="signup" component={Signup} title="Sign up" />
                    <Scene key="home" component={Home} renderBackButton={() => (null)} renderLeftButton={() => (null)} />
                    <Scene key="spambox" component={SpamBox} renderBackButton={() => (null)} renderLeftButton={() => (null)} />
                </Stack>
            </Router>
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}