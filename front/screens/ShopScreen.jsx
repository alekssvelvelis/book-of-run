import React from 'react';
import { View } from 'react-native';
import Shop from '../components/Shop/Shop';
const ShopScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#242424',}}>
        <Shop/>
      </View>
    );
  }

export default ShopScreen;
