import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import PostScreen from '../screens/post/PostScreen'
import COLORS from './colors'
import ProfileScreen from '../screens/profile/ProfileScreen'
import { FontAwesome5 } from '@expo/vector-icons'
import { Animated } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Dimensions } from 'react-native'

const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({children, onPress}) => (
    <TouchableOpacity activeOpacity={0.8}
    style={{top: -30, justifyContent: 'center', alignItems: 'center'}}
    onPress={onPress}>
      <View style={styles.circleButton}>
        {children}
      </View>
    </TouchableOpacity>
)

const BottomNavigator = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 15,
          marginHorizontal: 25,
          elevation: 3,
          backgroundColor: COLORS.white,
          borderRadius: 12,
          height: 60,
          shadowColor: COLORS.darkblue,
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
          },
        headerShown: false,
        }} >
        <Tab.Screen name='HomeScreen' component={HomeScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              position: 'absolute',
              //top: '50%',
            }}>
              <FontAwesome5 name='home' size={25} color={focused ? COLORS.lightgreen : 'grey'}/>
            </View>
          )
        }} listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start()
          }
        })}/>
         <Tab.Screen name='PostScreen' component={PostScreen} options={{
          tabBarIcon: ({focused}) => (
              <Image source={require('../assets/circle-plus-solid.png')}
              resizeMode='contain'
              style={{width: 35, height: 35, tintColor: COLORS.white}}>
              </Image>
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} />
          )
        }}/>
        <Tab.Screen name='ProfileScreen' component={ProfileScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              position: 'absolute',
              //top: '50%',
            }}>
              <FontAwesome5 name='user-alt' size={25} color={focused ? COLORS.lightgreen : 'grey'}/>
            </View>
          )
        }} listeners={({navigation, route}) => ({
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 2,
              useNativeDriver: true
            }).start()
          }
        })}/>
    </Tab.Navigator>
    <Animated.View style={{ 
    width: getWidth() -20,
    height: 4,
    backgroundColor: COLORS.lightgreen,
    position: 'absolute',
    bottom: 70,
    left: 70,
    borderRadius: 40,
    transform: [
      {translateX: tabOffsetValue}
    ]
    }}>

    </Animated.View>
    </SafeAreaView>
  )
}

function getWidth() {
  let width = Dimensions.get('window').width

  width = width - 30
  return width / 4
}

export default BottomNavigator

const styles = StyleSheet.create({
    circleButton: {
      width: 65,
      height: 65,
      backgroundColor: COLORS.lightgreen,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: COLORS.darkblue,
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 4,
    },
})