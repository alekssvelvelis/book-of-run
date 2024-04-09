import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken, removeToken, storeToken } from './utils/storageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthorizeScreen from './screens/AuthorizeScreen';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';

const Stack = createStackNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [random, setRandom] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setIsLoggedIn(!!storedToken);
    };

    checkLoginStatus();
  }, []);

  // useEffect(() => {
  //   const clearAsyncStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('AsyncStorage successfully cleared!');
  //     } catch (error) {
  //       console.error('Error clearing AsyncStorage:', error);
  //     }
  //   };
  //   clearAsyncStorage();
  // }, []);

  const handleLogin = async () => {
    // await storeToken(token);
    // console.log(token, 'inside of handle login')
    setIsLoggedIn(true);
  };
  const handleLogout = async () => {
    setIsLoggedIn(false);
    await removeToken();
  };

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? 
          <>
            <Stack.Screen
              name="Home"
              options={{
                headerStyle: { backgroundColor: '#242424' },
                headerTintColor: 'white',
              }}
            >
              {(props) => <HomeScreen {...props} onLogout={handleLogout} isLoggedIn={isLoggedIn} random={random} />}
            </Stack.Screen>
            <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
          {/* Add more screens here */}
          </>
        :
        <Stack.Screen name="Authorize"
            options={{
            headerStyle: { backgroundColor: '#242424' },
            headerTintColor: 'white',
          }}
        >
          {(props) => <AuthorizeScreen {...props} onLogin={handleLogin} setRandom={setRandom}/>}
        </Stack.Screen>
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
