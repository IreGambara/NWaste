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
    <View  style={{alignItems: 'center', height}}>
        <Image source={require('../assets/logo2.png')} style={{height: '40%', width, resizeMode: 'contain', top: 15, marginBottom: 90}} />
        <View>
        <View style={{height: 65}}>
            <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.replace('LoginScreen1')}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.white}}>
                Continue with Email
            </Text>
            </TouchableOpacity>
        </View>
        <View style={{height: 65, marginTop: 10}}>
            <TouchableOpacity
            style={{...styles.btn, backgroundColor: COLORS.grey}}
            onPress={() => navigation.replace('LoginScreen1')}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.darkblue}}>
                Sign In with Google
            </Text>
            </TouchableOpacity>
        </View>
        <View style={{height: 65, marginTop: 10, width: width * 0.90}}>
            <TouchableOpacity
            style={{...styles.btn, backgroundColor: COLORS.grey}}
            onPress={() => navigation.replace('LoginScreen1')}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: COLORS.darkblue}}>
                Sign In with Facebook
            </Text>
            </TouchableOpacity>
        </View>
        </View>
            <Text style={{marginTop: '10%', fontSize: 15}}>Don't have an account? <Text onPress={() => navigation.navigate('SignUpScreen')} style={{color: COLORS.lightgreen, fontWeight: 'bold'}}>Sign Up</Text></Text>
    </View>
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
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