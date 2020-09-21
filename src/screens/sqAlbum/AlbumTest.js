import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { getAlbumList, getAlbumSql, inserAlbumtSql } from '../../actions/dataAction';
import SplashScreen from '../SplashScreen';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const renderRow = ({ item }) => {
    return (
        <View style={styles.itemRow}>
            <TouchableOpacity>
                <Text style={styles.itemText}>{item.id}. {item.title}</Text>
            </TouchableOpacity>
        </View>
    )
}
const AlbumTest = () => {    
    const dispatch = useDispatch();
    useEffect(() => {      
        dispatch(inserAlbumtSql());
        dispatch(getAlbumSql());
    }, []);
    const AlbumSql = useSelector(state => state.data.getAlbumSql)
    return (
        <FlatList
        style={styles.container}
        data={AlbumSql}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
    />
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#00ffc3'
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
    loader: {
        marginTop: 10,
        alignItems: "center"
    }
})

export default AlbumTest
