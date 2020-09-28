import React from 'react'
import StackContainerComp from '../components/StackContainerComp';
import { AlbumList, PhotoList } from './album/';
import UserList from './userlist/UserList';
import Profile from '../screens/profile/Proflle';
import { AlbumSQL, PhotoSQL, CreateAlbum, AddPhotoSQL } from './sqAlbum';
import ControllerDb from './sqAlbum/ControllerDb';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserListProfile from './userlist/UserListProfile'
import Debug from './Debug'

const Tabs = createMaterialTopTabNavigator();

const AlbumScreen = ({ navigation }) => {
    const stack = [
        {
            name: 'Album',
            component: AlbumList
        },
        {
            name: 'Photo',
            component: PhotoList
        }
    ]
    return (
        <StackContainerComp navigation={navigation} stack={stack} />
    )
}

const UserListScreen = ({ navigation }) => {
    const stack = [
        {
            name: 'User List',
            component: UserList
        },
        {
            name: 'User List Profile',
            component: UserListProfile
        }
    ]
    return (
        <StackContainerComp navigation={navigation} stack={stack} />
    )
}

const UserProfile = ({ navigation }) => {
    const stack = [
        {
            name: 'Profile',
            component: Profile
        }
    ]
    return (
        <StackContainerComp navigation={navigation} stack={stack} />
    )
}

const AlbumSQLTab = () => {
    return (
        <Tabs.Navigator swipeEnabled={true} tabBarPosition='top' backBehavior='none'
            tabBarOptions={{
                showIcon: true,
                showLabel: true
            }}
        >
            <Tabs.Screen name='Album Test' component={AlbumSQL} options={{ title: 'Album' }} />
            <Tabs.Screen name='Controller DB' component={ControllerDb} options={{ title: 'Settings' }} />
        </Tabs.Navigator>
    )
}

const AlbumScreenSQL = ({ navigation }) => {
    const stack = [
        {
            name: 'Album SQL',
            component: AlbumSQL
        },
        {
            name: 'Photo List',
            component: PhotoSQL
        },
        {
            name: 'Create Album',
            component: CreateAlbum
        },
        {
            name: 'Add Photo',
            component: AddPhotoSQL
        }
    ]
    const menu = ['Create Album', 'Add Photo']
    return (
        <StackContainerComp menu={menu} navigation={navigation} stack={stack} />
    )
}
const DebugScreen = ({ navigation }) => {
    const stack = [
        {
            name: 'Debug',
            component: Debug
        }
    ]
    return (
        <StackContainerComp navigation={navigation} stack={stack} />
    )
}
export { DebugScreen, AlbumScreen, UserListScreen, UserProfile, AlbumScreenSQL }
