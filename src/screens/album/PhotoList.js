import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native'
import { ButtonGroup, Image } from 'react-native-elements'
import { getPhotoList, unMount } from '../../actions/dataAction'
import axios from 'axios'
// import { Button } from 'react-native-paper'


class PhotoList extends Component {
    state = {
        page: 1,
        isLoading: false,
        data: null,
        list: [],
    }
    componentWillUnmount() {
        // this.props.unMount()
    }
    renderRow = ({ item }) => {
        // console.log(item);
        let url = item.url
        return (

            <View style={styles.itemRow}>
                <Image source={{ uri: url }} style={styles.itemImg} />
                <Text style={styles.itemText}>{item.id}. {item.title}</Text>
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
    getData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=` + this.props.route.params.id + `&?_limit=10&_page=` + this.state.page)
            .then(res => {
                this.setState({
                    list: res.data,
                    isLoading: false,
                    isLoad: false,
                });
            })
    }
    componentDidMount() {
        this.getData()
    }
    nextPage = () => {
        if (this.state.page === 5) return
       this.setState({ page: this.state.page + 1 }, this.getData)
    }
    backPage = () => {
        if (this.state.page === 1) return
        this.setState({ page: this.state.page - 1 }, this.getData)
    }

    render() {


        return (
            // this.state.list ?
            <>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    style={styles.container}
                    data={this.state.list}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={this.renderFooter}
                />
                <View style={{ flex: 0, flexDirection: 'row', padding: 0, justifyContent: "space-between" }}>

                    {this.state.page === 1 ? <TouchableOpacity /> :
                        <TouchableOpacity style={styles.inputBtn} onPress={() => this.backPage()}>
                            <Text style={styles.btnTitle}>Back</Text>
                        </TouchableOpacity>}
                    {this.state.page === 5 ? null :
                        <TouchableOpacity style={styles.inputBtn} onPress={() => this.nextPage()}>
                            <Text style={styles.btnTitle} >Next</Text>
                        </TouchableOpacity>}

                </View>

            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        backgroundColor: '#fff'
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
    inputBtn: {
        width: '50%',
        backgroundColor: '#00a2ff',
        borderRadius: 0,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 0
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    }
})
const mapStateToProps = (state) => {
    return {
        PhotoList: state.data.getPhotoList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        unMount: () => dispatch(unMount()),
        getPhotoList: (id) => dispatch(getPhotoList(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)