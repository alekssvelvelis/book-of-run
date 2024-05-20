import React, { useEffect } from 'react';
import { View } from 'react-native';
import Home from '../components/Home/Home';
import Game from "./Game";
const HomeScreen = ({ onLogout, isLoggedIn, loginToken }) => { 
    const updateCoins = (newCoins) => {
      setCoins(newCoins);
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#242424' }}>
        <Home onLogout={onLogout} isLoggedIn={isLoggedIn} loginToken={loginToken}/>
      </View>
    );
  }

export default HomeScreen;
