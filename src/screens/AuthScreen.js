import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AuthComp from '../components/AuthComp';

const Tabs = createMaterialTopTabNavigator();

const LoginScreen = ({ navigation }) => {
    return (
        <AuthComp  nav={navigation} />
    )
}
const RegisterScreen = ({ navigation }) => {
    return (
        <AuthComp register nav={navigation} />
    )
}
const AuthScreen = () => {
    return (
        <Tabs.Navigator tabBarPosition='none' swipeEnabled={false}>
            <Tabs.Screen name='Login' component={LoginScreen} />
            <Tabs.Screen name='Register' component={RegisterScreen} />
        </Tabs.Navigator>
    )
}
export default AuthScreen