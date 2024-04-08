import React from 'react';
import { View } from 'react-native';
import Home from '../components/Home/Home';
const HomeScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#242424' }}>
        <Home/>
      </View>
    );
  }

export default HomeScreen;
