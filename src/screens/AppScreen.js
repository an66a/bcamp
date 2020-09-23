import React, { Component } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AuthScreen, AlbumScreen, UserProfile, SplashScreen, UserListScreen, SqAlbumScreen } from './'
import { userState, userLogout } from '../actions/userAction';

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} >
      <DrawerItemList {...props}  />
      <DrawerItem
        label="Logout"
        onPress={() => dispatch(userLogout())}
      />
    </DrawerContentScrollView>
  );
}
class AppScreen extends Component {

  componentDidMount() {
    this.props.userState()
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
            drawerContent={(props) => <CustomDrawer {...props} />}
          >
            <Drawer.Screen
              name='UserProfile'
              component={UserProfile}
              options={{ title: 'User Profile' }}
            />
            <Drawer.Screen
              name='UserListScreen'
              component={UserListScreen}
              options={{ title: 'User List' }}
            />
            <Drawer.Screen
              name='AlbumScreen'
              component={AlbumScreen}
              options={{ title: 'Album List' }}
            />
            <Drawer.Screen
              name='SqAlbumScreen'
              component={SqAlbumScreen}
              options={{ title: 'Album List SQL' }}
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
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppScreen)
