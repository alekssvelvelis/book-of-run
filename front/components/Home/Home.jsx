import React from 'react';
import { Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const goToLeaderboard = () => {
    navigation.navigate('Leaderboard');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <TouchableOpacity onPress={goToLeaderboard} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
        <Text style={{ color: 'white' }}>Go to Leaderboard</Text>
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  );
};

export default Home;
