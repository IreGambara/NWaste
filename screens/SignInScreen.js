import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useContext, useState } from 'react'
import COLORS from '../consts/colors'
import { Dimensions } from 'react-native'
import { IconButton } from 'react-native-paper'
import { initializeApp } from 'firebase/app'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import { Alert } from 'react-native'
import { AuthContext } from '../consts/AuthContext'


const {width, height} = Dimensions.get('window')

const SignInScreen = ({navigation}) => {

    //const [email, setEmail] = useState('')
    //const [password, setPassword] = useState('')

    const [isSignedIn, setIsSignedIn] = useState('false')

    const context = useContext(AuthContext)

    const handleSignIn = () => {
      signInWithEmailAndPassword(context.username, context.email, context.password)
      .then((res) => {
        console.log(res)
        setIsSignedIn(true)
        console.log('Signed In!')
        navigation.navigate('HomeScreen')
      })
      .catch((err) => {
        Alert.alert(err.message)
      })
    }

    // const handleSignIn = () => {
    // const app = initializeApp(firebaseConfig);
    // const auth = getAuth(app);

    // signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     console.log('Signed In!')
    //     const user = userCredential.user
    //     console.log(user)
    //     navigation.navigate('HomeScreen')
    // })
    // .catch(error => {
    //   console.log(error)
    //   Alert.alert(error.message)
    // })
    // }

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
            style={styles.btn}>
            {/* onPress={skip}> */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: COLORS.white,
                    }}>
                    SignIn
                  </Text>
                </TouchableOpacity>
                <View style={{width: 20}} />
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
                onPress={() => navigation.navigate('SignUpScreen')}>
                  <Text
                   style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      color: COLORS.darkblue,
                    }}>
                    SignUp
                  </Text>
                </TouchableOpacity>
              </View>
        <View style={{top: height * 0.10, alignItems: 'center'}}>
          <Text style={styles.title}>Welcome Back</Text>
        </View>
        <View style={{top: height * 0.18, marginHorizontal: 25}}>
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
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={styles.subtitle} >Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 65, width: '90%', alignSelf: 'center', top: height * 0.25}}>
            <TouchableOpacity
            style={[styles.btn_SignIn, styles.shadowBtn]}
            onPress={handleSignIn}
            >
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.white}}>
                SIGN IN
            </Text>
            </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
    btn_SignIn: {
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
      subtitle: {
        color: COLORS.darkblue,
        fontSize: 13,
        marginTop: 15,
        marginRight: 5,
        maxWidth: '65%',
        textAlign: 'right',
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        letterSpacing: 2,
      },
      title: {
        color: COLORS.darkblue,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
      },
      textInput: {
        backgroundColor: COLORS.grey,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 12,
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
})