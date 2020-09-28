import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { deletePhoto, getPhotoByAlbumId, updatePhotoById } from '../../actions/dataAction';
import { Image } from 'react-native-elements';
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import Input from '../../components/elements/Input';
import ImagePicker from 'react-native-image-picker';


const PhotoSQL = ({ route }) => {
    const photoState = { id: '', albumId: '', title: '', url: '' }
    const photoId = route.params.id
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    const [photo, setPhoto] = useState(photoState)
    const PhotoSQL = useSelector(state => state.data.getPhotoSql)
    // console.log(photo);
    useEffect(() => {
        dispatch(getPhotoByAlbumId(photoId));
    }, [visible]);

    const toggleOverlay = () => {
        setVisible(false, setPhoto(photoState));
    };
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
                // console.log('User cancelled image picker');
            } else if (response.error) {
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.uri
                // console.log(source);
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setPhoto({ ...photo, url: source })
            }
        });
    }
    const showAlertDelete = () =>
        Alert.alert(
            "Delete Photo",
            " Are you sure? ",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => dispatch(deletePhoto(photo.id), toggleOverlay()) }
            ],
            { cancelable: false }
        );
    const showAlertUpdate = () =>
        Alert.alert(
            "Update Photo",
            "Are you sure? ",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => dispatch(updatePhotoById(photo.title, photo.url, photo.id), toggleOverlay()) }
            ],
            { cancelable: false }
        );
    const renderRow = ({ item }) => {
        return (
            <View style={styles.itemRow}>
                <TouchableOpacity delayLongPress={700} onLongPress={() => setPhoto({ id: item.id, albumId: item.albumId, title: item.title, url: item.url }, setVisible(true))}>
                    <Image source={{ uri: item.url }} style={styles.itemImg} />
                    <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <SafeAreaView>
            <FlatList
                style={styles.container}
                data={PhotoSQL}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{ width: '80%', backgroundColor: '#00ffc3', padding: 10, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }} >Photo Title</Text>
                    <Input multiline={true} inputWidth='100%' value={photo.title} set={(e) => setPhoto({ ...photo, title: e })} />
                    <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }} >Photo Url</Text>
                    <Input multiline={true} inputWidth='100%' value={photo.url} set={(e) => setPhoto({ ...photo, url: e })} />
                    <View style={styles.select}>
                        <TouchableOpacity style={styles.btnSelectPhoto} onPress={() => photoLaunch()}>
                            <Text style={styles.btnSelect}>Select Photo</Text>
                        </TouchableOpacity>
                    </View>
                    <Button buttonStyle={{ borderRadius: 15, marginLeft: 0, marginRight: 0, marginBottom: 10, width: '100%' }}
                        onPress={() => showAlertUpdate()}
                        title='Update' />
                    <Button buttonStyle={{ borderRadius: 15, marginLeft: 0, marginRight: 0, marginBottom: 0, width: '100%' }}
                        onPress={() => showAlertDelete()}
                        title='Delete' />
                </View>
            </Overlay>
        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        // backgroundColor: '#00ffc3'
    },
    select: {

        backgroundColor: '#00ffc3',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0
    },
    itemRow: {
        borderBottomColor: '#ccc',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 25,
        padding: 5
    },
    itemImg: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    loader: {
        marginTop: 10,
        alignItems: "center"
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
export default PhotoSQL
