import React, { useEffect, useState } from "react";
import { Image, View , Text, StyleSheet, StatusBar, FlatList, SafeAreaView, Dimensions, TouchableOpacity} from "react-native";
import COLORS from "../consts/colors";
import { useFonts } from "@expo-google-fonts/poppins";

const {width, height} = Dimensions.get('window')

const slides = [{
    key: 'one',
    title: 'Welcome to Nwaste app',
    subtitle: 'The Nwaste app was designed to help you prepare dishes with what you have in your pentry.',
    image: require('../assets/Cooking-bro.png')
},
{
    key: 'two',
    title: 'Helps you not to waste food',
    subtitle: 'Just write down the ingredients you would like to consume and choose from the many recipes that will appear with the keywords you entered.',
    image: require('../assets/Waste-management-bro.png')
},
{
    key: 'three',
    title: 'Express and share your creativity',
    subtitle: 'You will have the chance to try new dishes and share yours.',
    image: require('../assets/Creative-team-bro.png')
},

]

const Slide = ({item}) => {
    return (
      <View style={{alignItems: 'center', width}}>
        <Image
          source={item?.image}
          style={{height: '75%', width, resizeMode: 'contain'}}
        />
        <View>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.subtitle}</Text>
        </View>
      </View>
    );
  };
  
  const OnBoardScreen = ({navigation}) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = e => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(contentOffsetX / width);
      setCurrentSlideIndex(currentIndex);
    };
  
    const goToNextSlide = () => {
      const nextSlideIndex = currentSlideIndex + 1;
      if (nextSlideIndex != slides.length) {
        const offset = nextSlideIndex * width;
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(currentSlideIndex + 1);
      }
    };
  
    const skip = () => {
      const lastSlideIndex = slides.length - 1;
      const offset = lastSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(lastSlideIndex);
    };
  
    const Footer = () => {
      return (
        <View
          style={{
            height: height * 0.20,
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          {/* Indicator container */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
            }}>
            {/* Render indicator */}
            {slides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  currentSlideIndex == index && {
                    backgroundColor: COLORS.lightgreen,
                    width: 25,
                  },
                ]}
              />
            ))}
          </View>
  
          {/* Render buttons */}
          <View style={{marginBottom: 20}}>
            {currentSlideIndex == slides.length - 1 ? (
              <View style={{height: 55}}>
                <TouchableOpacity
                  style={[styles.btn, styles.shadowBtn]}
                  onPress={() => navigation.replace('LoginScreen')}>
                  <Text style={{fontWeight: 'bold', fontSize: 15, color: COLORS.white}}>
                    GET STARTED
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.btn,
                    {
                      borderColor: COLORS.lightgreen,
                      borderWidth: 1,
                      backgroundColor: 'transparent',
                    },
                   ]}
                  onPress={skip}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: COLORS.lightgreen,
                    }}>
                    SKIP
                  </Text>
                </TouchableOpacity>
                <View style={{width: 15}} />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={goToNextSlide}
                  style={[styles.btn, styles.shadowBtn]}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: COLORS.white,
                    }}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    };
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
        <StatusBar backgroundColor={COLORS.white} />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          contentContainerStyle={{height: height * 0.75}}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({item}) => <Slide item={item} />}
        />
        <Footer />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    subtitle: {
      color: COLORS.darkblue,
      fontSize: 13,
      marginTop: 10,
      maxWidth: '65%',
      textAlign: 'center',
      alignSelf: 'center',
      //lineHeight: 23,
    },
    title: {
      color: COLORS.darkblue,
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 20,
      textAlign: 'center',
    },
    image: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
    },
    indicator: {
      height: 5,
      width: 10,
      backgroundColor: COLORS.grey,
      marginHorizontal: 3,
      borderRadius: 3,
    },
    btn: {
      flex: 1,
      height: 50,
      borderRadius: 30,
      backgroundColor: COLORS.lightgreen,
      justifyContent: 'center',
      alignItems: 'center',
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

export default OnBoardScreen;