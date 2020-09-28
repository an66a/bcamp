import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Input from '../../components/elements/Input'
import { useDispatch } from 'react-redux';
import { addPhotoToAlbumSql } from '../../actions/dataAction'
import ImagePicker from 'react-native-image-picker';

const AddPhotoSQL = (props) => {
    // console.log(props);
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState({
        albumId: '',
        title: '',
        url: ''
    })
    const photoLaunch = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source =  response.uri
                console.log(source);
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPhoto({...photo, url: source})
            }
        });
    }
    // console.log(photo);
    return (
        <SafeAreaView style={styles.container}>
            <View >
                <Text style={styles.logo}>Photo Title</Text>
            </View>
            <Input value={photo.title} textAlign='center' set={(e) => setPhoto({ ...photo, title: e })} />
            <View >
                <Text style={styles.logo}>Photo Url</Text>
            </View>
            <Input  placeholder='Add photo url or select from device' textAlign='center' value={photo.url} set={(e) => setPhoto({ ...photo, url: e })} />
            <TouchableOpacity style={styles.btnSelectPhoto} onPress={() => photoLaunch()}>
                <Text style={styles.btnSelect}>Select Photo</Text>
            </TouchableOpacity>
            <View >
                <Text style={styles.logo}>Album ID</Text>
            </View>
            <Input placeholder='See the Id by long press at the album list' textAlign='center' keyboardType='numeric' value={photo.albumId} set={(e) => setPhoto({ ...photo, albumId: e })} />
            <TouchableOpacity style={styles.inputBtn} onPress={() => dispatch(addPhotoToAlbumSql(photo.albumId, photo.title, photo.url))}>
                <Text style={styles.btnTitle}>Add Photo</Text>
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
        fontSize: 20,
        color: '#00a2ff',
        marginBottom: 10,
        marginTop: 10
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnSelect: {
        color: 'black',
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
        marginBottom: 10
    },
    btnSelectPhoto: {
        width: '30%',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 10
    }
})

export default AddPhotoSQL
