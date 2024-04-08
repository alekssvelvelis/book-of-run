import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken } from './utils/storageUtils';

import AuthorizeScreen from './screens/AuthorizeScreen';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Stack = createStackNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? 
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ 
          headerStyle: { backgroundColor: '#242424' }, // Change background color
          headerTintColor: 'white', // Change text color
        }}/>
          {/* Add more screens here */}
          </>
        :
          <Stack.Screen name="Authorize" component={AuthorizeScreen} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
