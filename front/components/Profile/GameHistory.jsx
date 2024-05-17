import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker'

const GameHistory = () => {
  const [sortBy, setSortBy] = useState('id');

  const gameDummyData = [
    { id: 1, score: 80 },
    { id: 2, score: 95 },
    { id: 3, score: 115 },
    { id: 4, score: 60 },
    { id: 5, score: 73 },
    { id: 6, score: 11 },
    { id: 7, score: 35 },
  ];

  const sortGameData = () => {
    if (sortBy === 'id') {
      return gameDummyData.sort((a, b) => b.id - a.id);
    } else if (sortBy === 'score') {
      return gameDummyData.sort((a, b) => b.score - a.score);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#242424' }}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={[styles.heading, styles.profileHeading]}>Your previous games</Text>
        <View style={styles.sortContainer}>
          <Picker
            selectedValue={sortBy}
            dropdownIconColor={'#FFFFFF'}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setSortBy(itemValue)}
          >
            <Picker.Item label="Latest" value="id" />
            <Picker.Item label="Score" value="score" />
          </Picker>
        </View>
        {/* Render sorted game data */}
        {sortGameData().map((game) => (
          <View key={game.id} style={styles.gameItem}>
            <Text style={styles.gameText}>Game: #{game.id}</Text>
            <Text style={styles.gameText}>Score: {game.score}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    marginTop: 24,
  },
  profileHeading: {
    fontSize: 32,
    marginTop: 12,
    textTransform: 'uppercase',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 4,
    backgroundColor: '#181818',
    borderRadius: 10
  },
  picker: {
    height: 50,
    width: 150,
    color: 'white',
    backgroundColor: '#181818'
  },
  gameItem: {
    backgroundColor: '#181818',
    width: 300,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: 'white',
    borderWidth: 1
  },
  gameText: {
    color: 'white',
    fontSize: 18,
    justifyContent: 'space-between'
  },
});

export default GameHistory;
