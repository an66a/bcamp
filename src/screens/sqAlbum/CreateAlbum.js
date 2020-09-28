import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/elements/Input'
import { useDispatch } from 'react-redux';
import { createAlbumSql } from '../../actions/dataAction'

const CreateAlbum = () => {
    const dispatch = useDispatch()
    const [album, setAlbum] = useState()
    const create = () => {
        dispatch(createAlbumSql(album), setAlbum(''))
    }
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.logo}>Album Title</Text>
            </View>
            <Input value={album} set={(e) => setAlbum(e)} />

            <TouchableOpacity style={styles.inputBtn} onPress={() => create()}>
                <Text style={styles.btnTitle}>Create Album</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ffc3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#00a2ff',
        marginBottom: 10
    },
    btnTitle: {
        color: '#fff',
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
    }
})

export default CreateAlbum
