import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, Text, Image, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAlbumSql, getPhotoByAlbumId, deleteAlbum, getAlbumById, updateAlbumById } from '../../actions/dataAction';
import LoadingScreen from '../SplashScreen';
import { Card, ListItem, Button, Icon, Overlay } from 'react-native-elements';
import Input from '../../components/elements/Input';

const AlbumSQL = (props) => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);
    // const [deleted, setDel] = useState(false);
    const [album, setAlbum] = useState({
        id: '',
        title: ''
    })
    const AlbumSql = useSelector(state => state.data.getAlbumSql);
    const AlbumById = useSelector(state => state.data.getAlbumById);
    // console.log(AlbumById);
    let albumId;
    let albumTitle;
    if (AlbumById !== undefined) {
        albumTitle = AlbumById.title;
        albumId = AlbumById.id;
    }
    const toggleOverlay = () => {
        setVisible(false, setAlbum(''));
    };
    useEffect(() => {
        dispatch(getAlbumSql());
    }, [visible]);

    const toPhotoList = (id) => {
        props.navigation.navigate('Photo List', { id })
    }
    const showAlertDelete = (id) => {
        Alert.alert(
            "Delete Album",
            "This operation will delete all photos in the album. Are you sure? ",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => dispatch(deleteAlbum(id), toggleOverlay()) }
            ],
            { cancelable: false }
        );
    }
    const showAlertUpdate = (title, id) => {
        Alert.alert(
            "Update Album Name",
            "Are you sure? ",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => dispatch(updateAlbumById(title, id), toggleOverlay()) }
            ],
            { cancelable: false }
        );
    }
    const renderRow = ({ item }) => {
        return (
            <View style={styles.itemRow}>
                <TouchableOpacity delayLongPress={1000} onPress={() => toPhotoList(item.id)} onLongPress={() => setAlbum({ id: item.id, title: item.title }, setVisible(true))}>
                    <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View>
            <FlatList
                style={styles.container}
                data={AlbumSql}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{ width: '80%', backgroundColor: '#00ffc3', padding: 10 }}>
                    <Text style={{ fontSize: 15, marginBottom: 10, textAlign: 'center' }} >Album ID: {album.id}</Text>
                    <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center' }} >{album.title}</Text>
                    <Input multiline={true} inputWidth='100%' placeholder='input here to update album name' value={album.title} set={(e) => setAlbum({ ...album, title: e })} />
                    <Button buttonStyle={{ borderRadius: 15, marginLeft: 0, marginRight: 0, marginBottom: 10, width: '100%' }}
                        onPress={() => showAlertUpdate(album.title, album.id)}
                        title='Update' />
                    <Button buttonStyle={{ borderRadius: 15, marginLeft: 0, marginRight: 0, marginBottom: 0, width: '100%' }}
                        onPress={() => showAlertDelete(album.id)}
                        title='Delete' />
                </View>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#00ffc3'
    },
    itemRow: {
        borderBottomColor: '#ccc',
        marginTop: 0,
        marginBottom: 0,
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 25,
        padding: 5
    },
    loader: {
        marginTop: 10,
        alignItems: "center"
    }
})

export default AlbumSQL
