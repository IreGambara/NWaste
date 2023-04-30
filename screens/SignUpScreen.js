import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../consts/colors'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { IconButton } from 'react-native-paper'
import { TextInput } from 'react-native'
import {initializeApp} from 'firebase/app'
import { firebaseConfig } from '../firebase'
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'
import { Alert } from 'react-native'
import { useNavigation } from '@react-navigation/core'

const {width, height} = Dimensions.get('window')

const SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)

  const handleSignUp = async () => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Account created!')
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('HomeScreen')
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <ScrollView keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}>
      <KeyboardAvoidingView enabled> 
      <View style={{height: '100%'}}>
        <IconButton icon='arrow-left' onPress={() => navigation.goBack(null)} size={35} iconColor={COLORS.darkblue} style={{marginLeft: 15, marginTop: 35}}/>
        
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
            styles.btn,
            {
              borderColor: COLORS.darkblue,
              borderWidth: 1,
              backgroundColor: 'transparent',
            },
            ]}>
            {/* onPress={skip}> */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: COLORS.darkblue,
                    }}>
                    SignIn
                  </Text>
                </TouchableOpacity>
                <View style={{width: 20}} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: COLORS.white,
                    }}>
                    SignUp
                  </Text>
                </TouchableOpacity>
              </View>
        <View style={{top: height * 0.10, alignItems: 'center'}}>
          <Text style={styles.title}>Create an account</Text>
        </View>
        <View>
          <TextInput 
          placeholder='username'
          style={styles.textInput}
          value={username}
          onChangeText={(username) => setUsername(username)}
          autoCapitalize='sentences'
          returnKeyType='next'
          blurOnSubmit={false}
          />
          <TextInput
          style={styles.textInput}
          onChangeText={(email) => setEmail(email)}
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          value={email}
          blurOnSubmit={false}
          />
          <TextInput
          placeholder='Password'
          style={styles.textInput}
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry
          />
        </View>
        <View style={{height: 65, width: '90%', alignSelf: 'center', top: height * 0.25}}>
            <TouchableOpacity
            style={styles.btn_SignUp}
            onPress={() => handleSignUp()}
            >
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.white}}>
                SIGN UP
            </Text>
            </TouchableOpacity>
        </View>    
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  btn_SignUp: {
    flex: 1,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightgreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    top: height * 0.03,
    width: 120,
    height: 40,
    borderRadius: 30,
    backgroundColor: COLORS.darkblue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.darkblue,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  textInput: {
    top: height * 0.18,
    backgroundColor: COLORS.grey,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 25,
    fontSize: 18,
    marginTop: 15,
  },
});