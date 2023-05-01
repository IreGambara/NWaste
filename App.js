import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import OnBoardScreen from './screens/OnBoardScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import SignInScreen from './screens/SignInScreen';
import ResetPassword from './screens/ResetPassword';

const Stack = createStackNavigator();

const App = () => {
  const [firstLaunch, setFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  return (
    firstLaunch != null && (
      <NavigationContainer>
        <StatusBar />
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {firstLaunch && (
          <Stack.Screen name="OnboardScreen" component={OnBoardScreen}/>
        )}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name='SignInScreen' component={SignInScreen} />
          <Stack.Screen name='ResetPassword' component={ResetPassword} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

registerRootComponent(App)
export default App;