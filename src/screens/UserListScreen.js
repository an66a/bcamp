import React from 'react';
import UserList from './userlist/UserList'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/userAction';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

const UserListScreen = ({ navigation }) => {  
  const dispatch = useDispatch();
  return (
    
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRightContainerStyle: { paddingRight: 10 }
    }}>
      <Stack.Screen name='User List' component={UserList}
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

export default UserListScreen