import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/elements/Input'
import { useDispatch } from 'react-redux';
import { Avatar, Accessory } from 'react-native-elements';


const Profile = (props) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 15}}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
            </View>
            <Input mt={20} />
            <Input />

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ffc3',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    marginB: {
        marginBottom: 10
    },
    marginT: {
        marginTop: 10
    },
    marginText: {
        marginTop: 20,
        color: 'black'
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#00a2ff',
        marginBottom: 50
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnTitle2: {
        color: '#00a2ff',
        fontWeight: 'bold',
    },
    inputBtn: {
        width: '80%',
        backgroundColor: '#00a2ff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    inputBtn2: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    }

})

export default Profile