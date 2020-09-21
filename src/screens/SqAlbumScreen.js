import React from 'react';
import ControllerDb from './sqAlbum/ControllerDb'
import AlbumSql from './sqAlbum/AlbumSql'
import AlbumTest from './sqAlbum/AlbumTest'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/userAction';
import { Icon } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();

const AlbumScreenSql = () => {
  return (
    <Tabs.Navigator swipeEnabled={false} tabBarPosition='top' >
      <Tabs.Screen name='Album Test' component={AlbumTest} />
      {/* <Tabs.Screen name='Album' component={AlbumSql} /> */}
      <Tabs.Screen name='Controller DB' component={ControllerDb} />
    </Tabs.Navigator>
  )
}

const SqAlbumScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRightContainerStyle: { paddingRight: 10 }
    }}>
      <Stack.Screen name='Album SQL' component={AlbumScreenSql}
        options={{
          headerLeft: () => (
            <Icon name='menu'
              size={30}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Icon name='sign-out'
              type='font-awesome'
              size={30}
              onPress={() => dispatch(userLogout())}
            />
          )
        }}
      />
    </Stack.Navigator>

  )
}

export default SqAlbumScreen