import React, {useEffect, useState} from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeToken, getToken } from '../../utils/storageUtils';
import { useFonts } from "expo-font";
const Home = ({ onLogout, isLoggedIn, loginToken, coin}) => {
    const [coins, setCoins] = useState(0);
    const [tokenLoaded, setTokenLoaded] = useState(false);

    const [fontsLoaded, fontError] = useFonts({
        'VT': require('../../assets/fonts/VT323-Regular.ttf'),
    });
    const navigation = useNavigation();
    const goToLeaderboard = () => {
        navigation.navigate('Leaderboard');
    };
    const goToProfile = () => {
        navigation.navigate('Profile');
    }; 
  
    const goToShop = () => {
        navigation.navigate('Shop');
    };

    const goToGame = () => {
        navigation.navigate('Game');
    }

    const goToBuy = () => {
        navigation.navigate('Buy');
    }

    const handleLogout = async () => {
        const logoutToken = await getToken();
        console.log('logout token', logoutToken);
        try {
            const response = await fetch('http://192.168.1.25/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${logoutToken}`,
                },
            });
            if (response.ok) {
                onLogout();
                removeToken();
                console.log('Logged out');
                navigation.navigate('Authorize');
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error.message);
        }
    };

    // useEffect(() => {
    //     const handleUserCoins = async () => {
    //         const logoutToken = await getToken();
    //         console.log('get token for use', logoutToken);
    //         try {
    //             const response = await fetch('http://192.168.1.25/api/getUserCoin', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${logoutToken}`,
    //                 },
    //             });
    //             if (response.ok) {

    //                 const responseData = await response.json();

    //                 setCoins(responseData['user']['coin'][0]["coins"])

    //                 console.log('Coins currently', responseData['user']['coin'][0]["coins"]);
    //             } else {
    //                 console.error('Coin fetch failed:', response.statusText);
    //             }
    //             setTokenLoaded(true); 
    //         } catch (error) {
    //             console.error('Error during logout:', error.message);
    //         }
    //     };

    const fetchUserCoins = async (token) => {
        try {
            const response = await fetch('http://192.168.1.25/api/getUserCoin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                setCoins(responseData['user']['coin'][0]["coins"]);
            } else {
                // console.error('Coin fetch failed:', response.statusText);
            }
            setTokenLoaded(true); 
        } catch (error) {
            console.error('Error during coin fetch:', error.message);
        }
    };

    useEffect(() => {
        if (loginToken) {
            fetchUserCoins(loginToken);
        }
    }, [loginToken]);

    useEffect(() => {
        setCoins((coins+coin));
      }, [coin]);

    // if (!tokenLoaded) {
    //     return (
    //         <View>
    //             <Text style={{color: 'white', fontSize: 24, fontWeight: 400, textTransform: 'uppercase', letterSpacing: 2}}>Loading...</Text>
    //         </View>
    //     );
    // }

  return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity onPress={goToBuy} style={{ position: 'absolute', top: 6, right: -24, marginTop: 4, marginBottom: 4}}>
                    <Text style={{color: 'white', fontSize: 32, fontWeight: 400, fontFamily: "VT"}}>BUY - {coins}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToGame} style={{ marginTop: 4, marginBottom: 4}}>
                    <Image source={require('../../assets/images/play.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToLeaderboard} style={{ marginTop: 4, marginBottom: 4}}>
                    <Image source={require('../../assets/images/leaderboard.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToProfile} style={{ marginTop: 4, marginBottom: 4}}>
                    <Image source={require('../../assets/images/profile.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToShop}  style={{ marginTop: 4, marginBottom: 4}}>
                    <Image source={require('../../assets/images/shop.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout} style={{ marginTop: 4, marginBottom: 4}}>
                    <Image source={require('../../assets/images/logout.png')} />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
  );
};

export default Home;
