import React from 'react'
import { View, Image, StyleSheet } from 'react-native';



const SplashScreen = () => {
    return (
        <View style={styles.container}>
        <Image style={styles.image} 
source={require('../img/loading.gif')} />
  </View>
    )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
    },
    image: {
    height: '50%',
    width: '50%'
    }
});

export default SplashScreen
