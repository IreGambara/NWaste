import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getAuth, signOut, updateCurrentUser } from 'firebase/auth';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import COLORS from '../consts/colors';
import { KeyboardAvoidingView } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { auth, db } from '../firebase';
import { AuthContext } from '../consts/AuthContext';


const {width, height} = Dimensions.get('window')

 function HomeScreen ({navigation}) {

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState('');
  const [users, setUsers] = useState([])

  const context = useContext(AuthContext)
    const getUsers = async () => {
        const user = auth.currentUser.uid
        console.log('$$$', user)
        firestore()
        .collection('users')
        .where('uid', '==', user)
        .get()
        .then((querySnaphot) => {
            querySnaphot.forEach((documentSnapshot) => {
                context.setUsername(documentSnapshot.data().username)
                context.setEmail(documentSnapshot.data().email)
                context.setPassword(documentSnapshot.data().password)
            })
        })
    }
    useEffect(() => {
        getUsers()
    }, [])
  // const logout = () => {
  //   Alert.alert('Logout', 'Are you want to logout?', [
  //     {
  //       text: 'Cancel',
  //       onPress: () => {return null},
  //     },
  //     {
  //       text: 'Confirm',
  //       onPress: () => {
  //         signOut()
  //         .then(() => navigation.replace('Auth'))
  //         .catch((error) => {
  //           if(error.code === 'auth/no-current-user')
  //             navigation.replace('Auth')
  //           else alert(error)
  //         })
  //       }
  //     }
  //   ], {cancelable: false})
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
        <View>
          <Text >Hello, {context.email}</Text>
        </View> 
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
      )
}

export default HomeScreen;

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