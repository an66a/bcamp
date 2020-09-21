import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'

class PhotoList extends Component {
    state = {
        page: 1,
        isLoading: false
    }
    // handleLoadMore = () => {
    //     this.setState({ page: this.state.page + 1, isLoading: true }, this.getData)
    // }
    renderRow = ({ item }) => {
        return (

            <View style={styles.itemRow}>
                <Image source={{uri: item.url}} style={styles.itemImg} />
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
    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.props.getPhotoList}
                renderItem={this.renderRow}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
            />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        // backgroundColor: '#00ffc3'
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
    }
})
const mapStateToProps = (state) => {
    return {
        getPhotoList: state.data.getPhotoList
    }
}
export default connect(mapStateToProps, null)(PhotoList)