import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import  Icon  from 'react-native-vector-icons/FontAwesome'

const Tab = createBottomTabNavigator()

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{tabBarIcon:({color}) => <Icon name='rocket'/>}} />

    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({})