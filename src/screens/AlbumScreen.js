import React from 'react';
import { AlbumList, PhotoList } from './album'
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { userLogout } from '../actions/userAction';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

const AlbumScreen = ({ navigation }) => {  
  const dispatch = useDispatch();
  return (
    
    <Stack.Navigator screenOptions={{
      headerTitleAlign: 'center',
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerRightContainerStyle: { paddingRight: 10 }
    }}>
      <Stack.Screen name='Album' component={AlbumList}
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
      <Stack.Screen name='Photo' component={PhotoList} />
    </Stack.Navigator>
  )
}

export default AlbumScreen