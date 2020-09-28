import React, { Component } from 'react'
import axios from 'axios'
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { getPhotoList, unMount } from '../../actions/dataAction'
import SplashScreen from '../SplashScreen'

class AlbumList extends Component {
    constructor() {
        super()
        this.state = {
            page: 1,
            list: [],
            isLoading: false,
            isLoad: true
        }
        // this.updateIndex = this.updateIndex.bind(this)
    }
    componentDidMount() {
        this.setState({ isLoading: true }, this.getData)
        // this.props.getPhotoList();
    }
    componentWillUnmount() {
        // this.props.unMount();
        this.setState({list: null})
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
    handleLoadMore = () => {
        this.setState({ page: this.state.page + 1, isLoading: true }, this.getData)
    }

    // updateIndex (_page) {
    //     this.setState({_page: _page})
    //   }
    toPhotoList = (id) => {
        this.props.getPhotoList(id);
        this.props.navigation.navigate('Photo',{id})
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
                    <ActivityIndicator size='large' />
                </View> : null
        )
    }
    render() {
        // const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // const { _page } = this.state
        // console.log(this.state.list);
        if (this.state.isLoad) {
            return <SplashScreen />;
        }
        return (
            <FlatList
                style={styles.container}
                data={this.state.list}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.1}
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