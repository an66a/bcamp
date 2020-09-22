import React, { Component } from 'react'
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import SplashScreen from '../SplashScreen'
import { getUserList } from '../../actions/dataAction'
class UserList extends Component {
    state = {
            isLoad: false
        }
    componentDidMount() {
this.props.getUserList()
    }
    renderRow = ({ item }) => {
        return (

            <View style={styles.itemRow}>
                <TouchableOpacity >
                    <Text style={styles.itemText}>username: {item.username} </Text>
                    <Text style={styles.itemText}>password: {item.password} </Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        if (this.state.isLoad) {
            return <SplashScreen />;
        }
        return (
            <FlatList
                style={styles.container}
                data={this.props.userList}
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
        backgroundColor: '#fff'
    },
    itemRow: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    itemText: {
        fontSize: 20,
        padding: 5
    },
    loader: {
        marginTop: 10,
        alignItems: "center"
    }
})
const mapStateToProps = (state) => {
    return {
        userList: state.user.getUserList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserList: () => dispatch(getUserList()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserList)