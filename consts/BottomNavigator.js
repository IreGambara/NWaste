import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { MainStackNavigator } from '../navigation/StackNavigator'
import COLORS from './colors'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{ 
        tabBarStyle: styles.bottonStyle,
        headerShown: false,
        tabBarActiveTintColor: COLORS.lightgreen,
        tabBarShowLabel: false
        }}>
        <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{tabBarIcon: ({color}) => (<Icon name='home' color={color} size={28}/>)}}
         />


    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({
    bottonStyle: {
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        height: 90,
        shadowColor: COLORS.darkblue,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})