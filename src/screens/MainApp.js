import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { AuthScreen, AlbumScreen, UserProfile, SplashScreen, UserListScreen, SqAlbumScreen } from './'
import { userState, userLogout } from '../actions/userAction';
import { insertAlbumSql, insertPhotoSql } from '../actions/dataAction'
import SplashScreen from './SplashScreen';
import AuthScreen from './AuthScreen'
import { createStackNavigator } from '@react-navigation/stack';
import { DebugScreen, AlbumScreen, UserListScreen, UserProfile, AlbumScreenSQL } from './ScreenContainer'
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }} >
      <View>
        <DrawerItemList {...props} />
      </View>

      {/* Drawer Item Bottom */}
      <View>
        <DrawerItem
          label="Logout"
          drawerIcon={<Icon name='menu' size={25} />}
          onPress={() => dispatch(userLogout())}
          icon={() => <Icon name='sign-out' type='font-awesome' style={{transform: [{rotateY: '180deg'}]}} />}
        // options={{
        //   drawerIcon: () => (<Icon name='menu' size={25} />)
        // }}
        />
      </View>
    </DrawerContentScrollView>
  );
}
class MainApp extends Component {
  componentDidMount() {
    this.props.userState();
    this.props.insertAlbumSql();
    this.props.insertPhotoSql();
  }
  render() {
    console.log(this.props);

    if (this.props.isLoading) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        {this.props.isLogin ? (
          <Drawer.Navigator
            initialRouteName='UserListScreen'
            drawerType='slide'
            drawerContent={(props) => <CustomDrawer {...props} />}

          >
            <Drawer.Screen
              name='UserProfile'
              component={UserProfile}
              options={{
                title: 'User Profile',
                drawerIcon: () => (<Icon name='user' type='font-awesome' size={25} />)
              }}
            />
            <Drawer.Screen
              name='UserListScreen'
              component={UserListScreen}
              options={{ title: 'User List', drawerIcon: () => (<Icon name='users' type='font-awesome' size={25} />) }}
            />
            <Drawer.Screen
              name='AlbumScreen'
              component={AlbumScreen}
              options={{ title: 'Album List', drawerIcon: () => (<Icon name='picture-o' type='font-awesome' size={25} />) }}
            />
            <Drawer.Screen
              name='AlbumScreenSQL'
              component={AlbumScreenSQL}
              options={{ title: 'Album List SQL', drawerIcon: () => (<Icon name='picture-o' type='font-awesome'  size={25} />) }}
            />
            <Drawer.Screen
              name='Debug'
              component={DebugScreen}
              options={{ title: 'DebugScreen', drawerIcon: () => (<Icon name='menu' size={25} />) }}
            />

          </Drawer.Navigator>
        )
          : (
            <AuthScreen />
          )
        }

      </NavigationContainer>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    isLogout: state.user.isLogout,
    isLoading: state.user.isLoading,
    isCamera: state.user.isCamera,
    isLoad: state.data.isLoad,
    getPhotoList: state.data.getPhotoList,
    getAlbumList: state.data.getAlbumList,
    getAlbumSql: state.data.getAlbumSql,
    getUserList: state.data.getUserList,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    userState: () => dispatch(userState()),
    insertAlbumSql: () => dispatch(insertAlbumSql()),
    insertPhotoSql: () => dispatch(insertPhotoSql())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainApp)
