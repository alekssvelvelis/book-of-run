import React from 'react';
import { Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { removeToken } from '../../utils/storageUtils';
const Home = ({ onLogout, isLoggedIn, random}) => {
 
    const navigation = useNavigation();
    const goToLeaderboard = () => {
        navigation.navigate('Leaderboard');
    };
    console.log(random);
    const handleLogout = async () => {
        console.log(random);
        try {
            const response = await fetch('http://192.168.1.25/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${random}`,
                },
            });

            if (response.ok) {
                onLogout();
                console.log(random, 'pre remove token');
                removeToken();
                console.log(random, 'post remove token');
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
            <TouchableOpacity onPress={goToLeaderboard} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, marginBottom: 10 }}>
                <Text style={{ color: 'white' }}>Go to Leaderboard</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Log out</Text>
            </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
