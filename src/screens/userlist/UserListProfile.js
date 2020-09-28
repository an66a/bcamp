import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import Input from '../../components/elements/Input'
import { useDispatch } from 'react-redux';
import { Avatar, Accessory } from 'react-native-elements';
import { deleteUser, getUserList, updateUser } from '../../actions//userAction';
import ImagePicker from 'react-native-image-picker';



const UserListProfile = ({ navigation, route }) => {
    // console.log(route);
    const dispatch = useDispatch()
    // console.log(route.params);
    const userId = route.params.id
    // console.log(userId);
    const [state, set] = useState(route.params.item)
    const [editable, setEdit] = useState(false)
    const [btnEdit, setBtn] = useState('Edit User Account')
    // console.log(state);

    const toggleEdit = () => {
        if (editable === false) {
            setEdit(true);
            setBtn('Save');
        }
        else {
            setEdit(false)
            setBtn('Edit User Account')
            doUpdate()
        }
    }
    const doUpdate = () => {
        dispatch(updateUser(userId, state))
    }
    const doDelete = () => {
        Alert.alert(
            "Delete Album",
            "Are you sure? ",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "OK", onPress: () => dispatch(deleteUser(userId), navigation.goBack(), alert('User delelted.')) }
            ],
            { cancelable: false }
        );
    }
    const photoLaunch = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);
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
                set({ ...state, url: source })
                console.log(state);
            }
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: 15, marginBottom: 15 }}>
                <TouchableOpacity onPress={() => photoLaunch()}>
                    <Avatar
                        size="xlarge"
                        rounded
                        source={{
                            uri: state.url,
                        }}
                    >
                        <Accessory />
                    </Avatar>
                </TouchableOpacity>

            </View>
            <Text style={styles.txt}>Username</Text>
            <Input mt={5} textAlign='center' editable={editable} value={state.username} set={(e) => set({ ...state, username: e })} />
            <Text style={styles.txt}>Password</Text>
            <Input mt={5} textAlign='center' editable={editable} value={state.password} set={(e) => set({ ...state, password: e })} />
            <TouchableOpacity style={styles.inputBtn} onPress={() => toggleEdit()}>
                <Text style={styles.btnTitle}>{btnEdit}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.inputBtn2} onPress={() => doDelete()}>
                <Text style={styles.btnTitle}>Delete User Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00ffc3',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    marginB: {
        marginBottom: 10
    },
    marginT: {
        marginTop: 10
    },
    marginText: {
        marginTop: 20,
        color: 'black'
    },

    inputTxt: {
        fontSize: 25

    },
    txt: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#00a2ff',
        marginBottom: 0,
        marginTop: 0
    },
    btnTitle: {
        color: '#fff',
        fontWeight: 'bold',
    },
    btnTitle2: {
        color: '#00a2ff',
        fontWeight: 'bold',
    },
    inputBtn: {
        width: '80%',
        backgroundColor: '#00a2ff',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    },
    inputBtn2: {
        width: '80%',
        backgroundColor: 'red',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 0
    }

})

export default UserListProfile