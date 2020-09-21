import React, { Component } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAlbumList, getAlbumSql, inserAlbumtSql } from '../../actions/dataAction';
import SplashScreen from '../SplashScreen';
import { SwipeListView } from 'react-native-swipe-list-view';

class AlbumSql extends Component {
    constructor() {
        super()
        SQLite.DEBUG = true;
        this.state = {
            isLoad: false,
            album: []
        }
    }
    renderRow = ({ item }) => {
        return (
            <View style={styles.itemRow}>
                <TouchableOpacity>
                    <Text style={styles.itemText}>{item.id}. {item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    componentDidMount() {
       this.props.inserAlbumtSql()
       this.props.getAlbumSql()
    }
    componentDidUpdate() {
      
    }
    render() {

        //    console.log(this.props);
        if (this.props.isLoad) {
            return <SplashScreen />;
        }
        return (
            <FlatList
                style={styles.container}
                data={this.props.AlbumSql}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }
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
const mapStateToProps = (state) => {
    return {
        isLoad: state.data.isLoad,
        AlbumSql: state.data.getAlbumSql
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAlbumSql: () => dispatch(getAlbumSql()),
        inserAlbumtSql: () => dispatch(inserAlbumtSql())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AlbumSql)