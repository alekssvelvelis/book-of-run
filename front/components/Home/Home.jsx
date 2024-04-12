import React from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
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
    const handleLogout = async () => {
        const logoutToken = await getToken();
        console.log('logout token', logoutToken);
        try {
            const response = await fetch('http://10.13.6.232/api/logout', {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <TouchableOpacity onPress={goToLeaderboard} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Go to Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToProfile} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginBottom: 10, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Go to Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Log out</Text>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
