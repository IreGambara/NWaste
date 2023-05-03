import 'react-native-gesture-handler';
import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import OnBoardScreen from './screens/OnBoardScreen';
import SignUpScreen from './screens/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import SignInScreen from './screens/SignInScreen';
import ResetPassword from './screens/ResetPassword';
import Firebase, { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import BottomNavigator from './consts/BottomNavigator';

const Stack = createStackNavigator();

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false)

  onAuthStateChanged(auth, (user) => {
    if(user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  })
  
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
        <Stack.Navigator screenOptions={{headerShown: false}}>
        {firstLaunch && (
          <Stack.Screen name="OnboardScreen" component={OnBoardScreen}/>
        )}
{loggedIn ? null : (
  <Stack.Group>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name='SignInScreen' component={SignInScreen} />
     <Stack.Screen name='ResetPassword' component={ResetPassword} />
    <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
  </Stack.Group>
)}
      <Stack.Screen name='HomeScreen' component={BottomNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
    )
);
};

registerRootComponent(App)
export default App;