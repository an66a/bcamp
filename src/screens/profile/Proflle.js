import React, { Component } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    TouchableOpacity,
    Button, Image
} from 'react-native';

export default class Proflle extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>Profile Screen</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 5
        // justifyContent: 'center',
    }
})