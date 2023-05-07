import { View, Text, StyleSheet, Dimensions, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut, updateCurrentUser } from 'firebase/auth';
import { SafeAreaView } from 'react-native';
import COLORS from '../consts/colors';
import { KeyboardAvoidingView } from 'react-native';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import firestore from '@react-native-firebase/firestore'
import { auth, db } from '../firebase';
import {  Card, IconButton, Searchbar } from 'react-native-paper';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
//import cheerio from 'cheerio-without-node-native/lib/cheerio';
import Carousel from 'react-native-snap-carousel';


const {width, height} = Dimensions.get('window')

function Popular() {

  const [popular, setPopular] = useState([])
  const [imageUrl, setImageUrl] = useState("")

  const getPopular = async () => {

    //var popular = '595b3070ad544bd6b4c28e3f0cf8e2f0'
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=595b3070ad544bd6b4c28e3f0cf8e2f0&number=9`)
    const data = await api.json()
    setPopular(data.recipes)
    
    //console.log(data)
    console.log(data.recipes)
    console.log(data.recipes.image)

  }

  useEffect(() => {
    getPopular()
  }, [])

  return (
    <View>
    {popular.map((recipe) => {
      return (
          <View style={styles.wrapper}>
            <Text style={styles.titleSection}>Trending</Text>
          {popular.map((recipe) => {
            return (
           // <ScrollView style={styles.wrapper} horizontal pagingEnabled showsHorizontalScrollIndicator={false} >
            <Card>
              <View key={recipe.id}>
              {/* <Image source={imageUrl} /> */}
              <Card.Cover source={recipe.image} />
              <Card.Title title={recipe.title} />
              </View>
            </Card>
          //  </ScrollView>

            )
          })}
          </View>
       // <Carousel ref={(c) => {car}} />
      )
    })}
    </View>
  )
}


 const HomeScreen = ({navigation}) => {

  //const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('')

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, 'users'), where('uid', '==', auth.currentUser.uid))
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
            <View style={{marginTop: 15, flexDirection: 'row'}}>
            <Searchbar
              placeholder='Enter the ingredient'
              style={{width: '78%'}}
              theme={{ roundness: 2 }}
              iconColor={COLORS.darkblue}
              placeholderTextColor='grey'
              //icon={{source: 'tune-vertical', direction: 'ltr'}}
             />
             <View style={styles.sortBtn}>
                <IconButton icon='tune' size={30} iconColor={COLORS.white}/>
             </View>   
          </View>
          </View>
          {/* Trending */}
            <Popular />

        </View> 
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 4,
    marginVertical: 0,
  },
  title: {
    color: COLORS.lightgreen,
    fontSize: 35,
    fontWeight: '800',
    textAlign: 'left',
  },
  titleSection: {
    color: COLORS.darkblue,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  subtitle: {
    color: COLORS.darkblue,
    fontSize: 15,
    marginTop: 10,
    textAlign: 'left',
    letterSpacing: 0.5,
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
  sortBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightgreen,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 4,
  }
});