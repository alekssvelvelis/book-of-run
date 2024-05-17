import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeToken, getToken } from '../../utils/storageUtils';
const Home = ({ onLogout, isLoggedIn, loginToken}) => {
    
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
    const handleLogout = async () => {
        const logoutToken = await getToken();
        console.log('logout token', logoutToken);
        try {
            const response = await fetch('http://10.13.6.174/api/logout', {
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{flex: 1,}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Image source={require('../../assets/images/play.png')} />
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
