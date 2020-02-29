import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Start from './pages/Start';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import SpamBox from './pages/SpamBox';
import Settings from './pages/Settings';
import UserInformation from './pages/UserInformation';
import ChangeNumber from './pages/ChangeNumber';
import ChangeEmail from './pages/ChangeEmail';

export default class Routes extends Component {
    render() {
        return (
            <Router barButtonIconStyle={styles.barButtonIconStyle}
                hideNavBar={false}
                navigationBarStyle={{ backgroundColor: '#69078c', }}
                titleStyle={{ color: 'white', }}
            >
                <Stack key="root">
                    <Scene key="start" component={Start} />
                    <Scene key="login" component={Login} title="Login" />
                    <Scene key="signup" component={Signup} title="Sign up" />
                    <Scene key="home" component={Home} title="All Messages" renderBackButton={() => (null)} renderLeftButton={() => (null)} />
                    <Scene key="spambox" component={SpamBox} title="Spam Box" renderBackButton={() => (null)} renderLeftButton={() => (null)} />
                    <Scene key="settings" component={Settings} title="Settings" />
                    <Scene key="userinformation" component={UserInformation} title="User Information" />
                    <Scene key="changenumber" component={ChangeNumber} title="Change Telephone Number" />
                    <Scene key="changeemail" component={ChangeEmail} title="Change Email" />
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