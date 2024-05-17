import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken, removeToken, storeToken } from './utils/storageUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthorizeScreen from './screens/AuthorizeScreen';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import Game from "./screens/Game.jsx";
import BackgroundMusic from "./utils/music";

const Stack = createStackNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [loginToken, setLoginToken] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setIsLoggedIn(!!storedToken);
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    setIsLoggedIn(false);
    await removeToken();
  };

  return (
    <View style={styles.container}>
      <BackgroundMusic />
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
                {(props) => <HomeScreen {...props} onLogout={handleLogout} isLoggedIn={isLoggedIn} loginToken={loginToken} />}
              </Stack.Screen>
              <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
              <Stack.Screen name="Game" component={Game} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
              {/* Add more screens here */}
            </>
          :
          <Stack.Screen name="Authorize"
              options={{
              headerStyle: { backgroundColor: '#242424' },
              headerTintColor: 'white',
            }}
          >
            {(props) => <AuthorizeScreen {...props} onLogin={handleLogin} setLoginToken={setLoginToken}/>}
          </Stack.Screen>
          }
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
