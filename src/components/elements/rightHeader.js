import React from 'react';
import { View, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Icon } from 'react-native-elements';
import { resetAllSql } from '../../actions/dataAction';
import { useDispatch } from 'react-redux';

const RightHeader = (props) => {
    const dispatch = useDispatch()
    // console.log(props);
    let _menu = null;

    const setMenuRef = ref => {
        _menu = ref;
    };

    const hideMenu = () => {
        _menu.hide();
    };

    const showMenu = () => {
        _menu.show();
    };
    const reset = () => {
        dispatch(resetAllSql())
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Menu
                ref={setMenuRef}
                button={<Icon name='caret-down'
                    type='font-awesome'
                    size={30}
                    onPress={() => showMenu()}
                />}
            >
                <MenuItem onPress={() => props.navigation.navigate(props.menu[0], hideMenu())}>{props.menu[0]}</MenuItem>
                {props.menu[1] ? <MenuItem onPress={() => props.navigation.navigate(props.menu[1], hideMenu())}>{props.menu[1]}</MenuItem> : null}
                <MenuItem onPress={() => reset(hideMenu())}>Reset Sql</MenuItem>
            </Menu>
        </View>
    )
}
export default RightHeader
