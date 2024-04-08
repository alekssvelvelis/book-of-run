import React from 'react';
import { View } from 'react-native';
import Leaderboard from '../components/Leaderboard/Leaderboard';
const LeaderboardScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#242424' }}>
        <Leaderboard/>
      </View>
    );
  }

export default LeaderboardScreen;
