import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getToken, removeToken, storeToken } from './utils/storageUtils';
import {handleURLCallback, StripeProvider, useStripe} from "@stripe/stripe-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthorizeScreen from './screens/AuthorizeScreen';
import HomeScreen from './screens/HomeScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import Game from "./screens/Game.jsx";
import BuyCoins from "./components/BuyCoins";
import BackgroundMusic from "./utils/music";
import {useFonts} from "expo-font";

const Stack = createStackNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [token, setToken] = useState(null);
  const [loginToken, setLoginToken] = useState('');
  const [fontsLoaded, fontError] = useFonts({
    'VT': require('./assets/fonts/VT323-Regular.ttf'),
  });

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

  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
      async (url) => {
        if (url) {
          const stripeHandled = await handleURLCallback(url);
          if (stripeHandled) {
          } else {
          }
        }
      },
      [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      await handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
        'url',
        (event) => {
          handleDeepLink(event.url);
        }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
      <StripeProvider publishableKey= "pk_test_51P28YvP2bxrnQ5RhmWDK0oB42kWbMG4lOs1qk26FtEB7Nv05ZQpTKm97ILFiAvoPjQw48sS37eUsq0UkRBZjCG9v00EaNZxnkl">
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
                <Stack.Screen name="Buy" component={BuyCoins} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }} style={styles.customFont}/>
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
                {(props) => <HomeScreen {...props} onLogout={handleLogout} isLoggedIn={isLoggedIn} loginToken={loginToken} />}
              </Stack.Screen>
              <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
              <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
              <Stack.Screen name="Shop" component={ShopScreen} options={{ headerStyle: { backgroundColor: '#242424' }, headerTintColor: 'white', }}/>
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
  customFont: {
    fontFamily: "VT",
  }
});
