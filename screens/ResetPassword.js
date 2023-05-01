import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../consts/colors'
import { Dimensions } from 'react-native'
import { IconButton } from 'react-native-paper'
import { initializeApp } from 'firebase/app'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { firebaseConfig } from '../firebase'
import { Alert } from 'react-native'
import { ActivityIndicator } from 'react-native'

const {width, height} = Dimensions.get('window')

const ResetPassword = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [showLoading, setShowLoading] = useState('')

    const reset = async() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    setShowLoading(true)
    try {
        sendPasswordResetEmail(auth, email)
        .then((userCredential) => {
            console.log('Email sent')
            const user = userCredential.user;
            console.log(user)
            Alert.alert('Password reset email sent')
        })
        setShowLoading(false)
    } catch (e) {
        setShowLoading(false)
        Alert.alert(e.message)
    }
}

    return(
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
          <View style={{top: height * 0.10, alignItems: 'center'}}>
            <Text style={styles.title}>Reset Password</Text>
          </View>
          <View style={{top: height * 0.18, marginHorizontal: 25}}>
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
          </View>
          <View style={{height: 65, width: '90%', alignSelf: 'center', top: height * 0.25}}>
          <View style={{height: 65, marginBottom: 20}}>
              <TouchableOpacity
              style={[styles.btn_SignIn, styles.shadowBtn]}
              onPress={() => reset()}
              >
              <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.white}}>
                  SUBMIT
              </Text>
              </TouchableOpacity>
          </View>

          <View style={{height: 65}}>
              <TouchableOpacity
              style={[styles.btn_SignIn,  {borderColor: COLORS.lightgreen, borderWidth: 1, backgroundColor: 'transparent'}]}
              onPress={() => navigation.navigate('SignInScreen')}
              >
              <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.lightgreen}}>
                  BACK TO LOGIN
              </Text>
              </TouchableOpacity>
          </View>
          {showLoading &&
          <View style={styles.activity}>
            <ActivityIndicator size='large' color={COLORS.grey} />
          </View>
          }
          </View>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    )
}

export default ResetPassword

const styles = StyleSheet.create({
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_SignIn: {
        flex: 1,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.lightgreen,
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