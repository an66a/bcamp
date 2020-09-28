import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Text, RefreshControl } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { getUserList } from '../../actions/userAction'
import { Avatar, Accessory } from 'react-native-elements';




const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const UserList = (props) => {
    // console.log(props);

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        dispatch(getUserList());
    }, [refreshing]);

    const userData = useSelector(state => state.user.getUserList)

    const toProfile = (id, item) => {
        props.navigation.navigate('User List Profile', { id, item })
    }

    const renderRow = (props) => {
        // console.log(props);
        const item = props.item
        // console.log(item);
        return (
            <TouchableOpacity delayLongPress={1000} onLongPress={() => toProfile(props.index, item)} >
                <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, padding: 15 }}>
                    <View>
                        <Avatar
                            rounded
                            size='medium'
                            source={{ uri: item.url }}
                        />
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={styles.itemText}>{item.username} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <FlatList
            style={styles.container}
            data={userData}
            renderItem={renderRow}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            onEndReachedThreshold={0.1}
        />
    )
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
        fontSize: 25,
        padding: 5
    },
    loader: {
        marginTop: 10,
        alignItems: "center"
    }
})
// const mapStateToProps = (state) => {
//     return {
//         userList: state.user.getUserList
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getUserList: () => dispatch(getUserList()),
//     }
// }
export default UserList