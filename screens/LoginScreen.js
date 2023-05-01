import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import COLORS from "../consts/colors";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";

const {width, height} = Dimensions.get('window')

const LoginScreen = ({navigation}) => {
return(
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
    <View style={{alignItems: 'center', height: '100%'}}>
        <Image source={require('../assets/Recipe-book-bro.png')} style={{height: '65%', width, resizeMode: 'contain', top: 15}} />
        {/* <Image source={require('../assets/logo1.png')} style={{height: 50, resizeMode: 'contain', marginBottom: 25}} /> */}
        <View style={{width: width * 0.90, top: height * 0.10}}>
        <View style={{height: 65}}>
            <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.white}}>
                SIGN IN
            </Text>
            </TouchableOpacity>
        </View>
        <View style={{height: 65, marginTop: 15}}>
            <TouchableOpacity
            style={{...styles.btn, backgroundColor: COLORS.grey}}
            onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.darkblue}}>
                SIGN UP
            </Text>
            </TouchableOpacity>
        </View>
        </View>
    </View>
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
    title: {
        color: COLORS.darkblue,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 25,
      },
    btn: {
      flex: 1,
      height: 80,
      borderRadius: 40,
      backgroundColor: COLORS.lightgreen,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  
export default LoginScreen;