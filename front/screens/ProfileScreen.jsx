import React from 'react';
import { View } from 'react-native';
import Profile from '../components/Profile/Profile';
const ProfileScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#242424',}}>
        <Profile/>
      </View>
    );
  }

export default ProfileScreen;
