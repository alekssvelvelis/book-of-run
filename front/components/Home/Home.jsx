import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Home = () => {


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Text style={{color: 'white',}}>I will return to home base.</Text>
    </TouchableWithoutFeedback>
  );
};

export default Home;
