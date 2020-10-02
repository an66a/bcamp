import React, { Component } from 'react'
import axios from 'axios'
import { View, FlatList, StyleSheet, Text, ActivityIndicator, RefreshControl } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getPhotoList, unMount } from '../../actions/dataAction'
import SplashScreen from '../SplashScreen'

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

class AlbumList extends Component {
    constructor() {
        super()
        this.state = {
            page: 1,
            list: [],
            isLoading: false,
            isLoad: true,
            refreshing: false
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true }, this.getData)
    }
    componentWillUnmount() {
        this.setState({ list: null })
    }
    getData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=10&_page=` + this.state.page)
            .then(res => {
                this.setState({
                    list: this.state.list.concat(res.data),
                    isLoading: false,
                    isLoad: false
                });
            })
    }

    resetData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/albums?_limit=10&_page=` + 1)
            .then(res => {
                this.setState({
                    list: res.data,
                    isLoading: false,
                    isLoad: false,
                    page: 1,
                });
            })
            .catch(err => console.log(err))
    }
    onRefresh = () => {
        this.resetData()
        this.setState({ refreshing: true })
        wait(3000).then(() => this.setState({ refreshing: false }));
    }
    handleLoadMore = () => {
        this.setState({ page: this.state.page + 1, isLoading: true }, this.getData)
    }
    toPhotoList = (id) => {
        this.props.navigation.navigate('Photo', { id })
    }
    renderRow = ({ item }) => {
        return (
            <View style={styles.itemRow}>
                <TouchableOpacity onPress={() => this.toPhotoList(item.id)}>
                    <Text style={styles.itemText}>{item.id}. {item.title}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    renderFooter = () => {
        return (
            this.state.isLoading ?
                <View style={styles.loader}>
                    <ActivityIndicator size='large' color="#00a2ff" />
                </View> : null
        )
    }

    render() {
        if (this.state.isLoad) {
            return <SplashScreen />
        }
        return (
            <FlatList
                style={styles.container}
                data={this.state.list}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }
                ListFooterComponent={this.renderFooter}
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
const mapDispatchToProps = (dispatch) => {
    return {
        unMount: () => dispatch(unMount()),
        getPhotoList: (id) => dispatch(getPhotoList(id)),
    }
}
export default connect(null, mapDispatchToProps)(AlbumList)