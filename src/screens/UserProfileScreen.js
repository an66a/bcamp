import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/userAction';
import { Icon } from 'react-native-elements';
import Profile from '../screens/profile/Proflle';

const Stack = createStackNavigator();

const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRightContainerStyle: { paddingRight: 10 }
    }}>
      <Stack.Screen name='Profile' component={Profile}
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

export default UserProfile
