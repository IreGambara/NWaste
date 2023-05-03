import { View, Text, StyleSheet, Dimensions, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut, updateCurrentUser } from 'firebase/auth';
import { SafeAreaView } from 'react-native';
import COLORS from '../consts/colors';
import { KeyboardAvoidingView } from 'react-native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore'
import { auth, db } from '../firebase';
import { Searchbar } from 'react-native-paper';


const {width, height} = Dimensions.get('window')

 const HomeScreen = ({navigation}) => {

  //const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('')

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, 'users'), where('uid', '==', auth?.currentUser.uid))
  //     const doc = await getDocs(q)
  //     const data = doc.docs[0].data();
  //     setUsername(data.username)
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // }

  // useEffect(() => {
  //   fetchUserName()
  // }, [])


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar backgroundColor={COLORS.white} />
      <ScrollView keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      }}>
        <View style={{height, width, marginHorizontal: 15}}>
          <View style={{height: height * 0.25}}>
            <Text style={styles.title} >Hello, {username}</Text>
            <Text style={styles.subtitle}>What would do you like to cook today?</Text>
            <View style={{marginTop: 15}}>
            <Searchbar
              placeholder='Enter the ingredient'
              style={{width: '93%'}}
              theme={{ roundness: 3 }}
              //icon={{source: 'tune-vertical', direction: 'ltr'}}
             />
          </View>
          </View>

        </View> 
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
    color: COLORS.lightgreen,
    fontSize: 35,
    fontWeight: '800',
    textAlign: 'left',
  },
  subtitle: {
    color: COLORS.darkblue,
    fontSize: 15,
    marginTop: 10,
    //maxWidth: '65%',
    textAlign: 'left',
    letterSpacing: 0.5,
    //alignSelf: 'center',
    //lineHeight: 23,
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