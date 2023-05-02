import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useContext, useState } from 'react'
import COLORS from '../consts/colors'
import { StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'
import { IconButton } from 'react-native-paper'
import { TextInput } from 'react-native'
import { auth, db } from '../firebase'
import { Alert } from 'react-native'
import { addDoc, collection } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext, UseAuthContext } from '../consts/AuthContext'

const {width, height} = Dimensions.get('window')

const SignUpScreen = ({navigation}) => {

  const [isSignedIn, setIsSignedIn] = useState("false");

  //const context = useContext(AuthContext)

  const [data, setData] = UseAuthContext()

   //const [email, setEmail] = useState('')
   //const [password, setPassword] = useState('')
   //const [username, setUsername] = useState('')


    // const handleSignUp = () => {
    //   createUserWithEmailAndPassword(context.username, context.email, context.password)
    //   .then(async (res) => {
    //     firestore()
    //     .collection('users')
    //     .add({
    //       uid: res.user.uid,
    //       username: context.username,
    //       email: context.email,
    //       password: context.password,
    //     })
    //     .then(() => {
    //       console.log('User Added!')
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       Alert.alert(err.message)
    //     })
    //     console.log(res)
    //     setIsSignedIn(true)
    //     navigation.navigate('HomeScreen')
    //   })
    //   .catch((res) => {
    //     alert(res)
    //   })
    // }

  const handleSignUp = () => {
    createUserWithEmailAndPassword(context.username, context.email, context.password)
    .then(async (userCredentials) => { // make function async
        try {
          const docRef = await addDoc(collection(db, "users"), { // here you need to use await
            uid: userCredentials.user.uid,
            username: context.username,
            email: context.email,
            password: context.password,
          });
          console.log("Success writing document!");
          navigation.navigate('HomeScreen')
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        alert(error.message)
        console.log(error)
        console.error(error);
      });
    } 

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
            ]}
            onPress={() => navigation.navigate('SignInScreen')}>
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
          placeholder='Enter Username'
          style={styles.textInput}
          value={context.username}
          onChangeText={(username) => {context.setUsername(username)}}
          autoCapitalize='sentences'
          returnKeyType='next'
          blurOnSubmit={false}
          />
          <TextInput
          style={styles.textInput}
          value={context.email}
          onChangeText={(email) => {context.setEmail(email)}}
          placeholder="Enter Email"
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType="next"
          blurOnSubmit={false}
          />
          <TextInput
          placeholder='Enter Password'
          style={styles.textInput}
          value={context.password}
          onChangeText={(password) => {context.setPassword(password)}}
          secureTextEntry
          />
        </View>
        <View style={{height: 65, width: '90%', alignSelf: 'center', top: height * 0.25}}>
            <TouchableOpacity
            style={[styles.btn_SignUp, styles.shadowBtn]}
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
  shadowBtn: {
    shadowColor: COLORS.darkblue,
    shadowOffset: {
    width: 0,
    height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});