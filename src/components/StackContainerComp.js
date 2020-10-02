
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import RightHeader from './elements/rightHeader';

const Stack = createStackNavigator();
class StackContainerComp extends Component {
   
    rightHeadBar = <RightHeader menu={this.props.menu} navigation={this.props.navigation} />
    render() {
        // console.log(this.props.menu);     
        return (
            <Stack.Navigator screenOptions={{
                headerTitleAlign: 'center',
                headerLeftContainerStyle: { paddingLeft: 10 },
                headerRightContainerStyle: { paddingRight: 15 }
            }}>
                <Stack.Screen name={this.props.stack[0].name} component={this.props.stack[0].component}
                    options={{
                        headerLeft: () => (
                            <Icon name='menu'
                                size={25}
                                onPress={() => this.props.navigation.openDrawer()}
                            />
                        ),
                        headerRight: () => (this.props.menu ? this.rightHeadBar : null)
                    }}
                />
                {this.props.stack[1] ? <Stack.Screen name={this.props.stack[1].name} component={this.props.stack[1].component}
                    options={{
                        headerRight: () => (this.props.menu ? this.rightHeadBar : null)
                    }}
                /> : null}
                {this.props.stack[2] ? <Stack.Screen name={this.props.stack[2].name} component={this.props.stack[2].component} /> : null}
                {this.props.stack[3] ? <Stack.Screen name={this.props.stack[3].name} component={this.props.stack[3].component} /> : null}
            </Stack.Navigator>
        )
    }
}

export default StackContainerComp