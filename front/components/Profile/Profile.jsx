import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, Pressable, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, Animated } from 'react-native';
import { getToken } from '../../utils/storageUtils';
import ChangePasswordModal from './ChangePasswordModal';
import GameHistory from './GameHistory';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Profile = () => {
  const [isPasswordRevealed, setPasswordRevealed] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [usernameLength, setNameLength] = useState(0);
  const [errors, setErrors] = useState({}); 
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    setScrollEnabled(!isModalOpen);
  }, [isModalOpen]);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const togglePasswordVisibility = () => {
    setPasswordRevealed(!isPasswordRevealed);
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleLengthChange = (value) => {
    setNameLength(value.length);
  };

  const handleToggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const getUserData = async () => {
      const token = await getToken();
      try {
        const response = await fetch('http://10.13.6.174/api/getUserData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userData = data && data.user ? data.user : null
          setFormData({
            username: userData.name || '',
            email: userData.email || '',
          });
          setNameLength(userData.name.length);
        } else {
          const errorData = await response.json();
          console.error('Error fetching user info, response error', errorData);
        }
      } catch (error) {
        console.error('Error fetching user info, caught error', error);
      }
    }
    getUserData();
  }, []);

  const handleSubmit = async () => { 
    const newErrors = {}; 
    
    if (!formData.username) {
      newErrors.username = 'Username is required.';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    } else if (formData.username.length > 15) {
      newErrors.username = 'Username cannot exceed 15 characters.';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters and numbers.';
    }

    if (!formData.email) { 
      newErrors.email = 'Email is required.'; 
    }
    setErrors(newErrors);
    setSuccess('');

    if(Object.keys(newErrors).length === 0){
      try {
        const token = await getToken();
        const response = await fetch('http://172.20.10.2/api/updateUserData', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        if (!response.ok) {
          setErrors(responseData.errors);
          setSuccess('');
        } else {
          setSuccess(responseData.message);
          setErrors({});
          fadeAnim.setValue(1); // Reset opacity value
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 3000, // Adjust the duration as needed
            useNativeDriver: true,
          }).start();
        }
      } catch (error) {
        console.error('Error occurred: inside of catch', error);
      }
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', }}>
    <ScrollView contentContainerStyle={[styles.scrollViewContainer, { width: screenWidth }]} scrollEnabled={scrollEnabled}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <Text style={[styles.heading, styles.profileHeading]}>Your profile</Text>
          <Text style={styles.heading}>See everything you can do below</Text>
          <View style={styles.changeProfileData}>
            <View style={{ margin: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'white' }}>Username:</Text>
              <View style={{position: 'relative',}}>
                <TextInput
                  style={[ styles.textInput, errors.username ? { borderColor: '#E42727' } : { borderColor: 'transparent' }]} placeholderTextColor="gray" placeholder='Username...' id='username' name='username'
                  onChangeText={(text) => { handleChange('username', text); handleLengthChange(text); }}
                  value={formData.username}
                  maxLength={15}
                />
                <Text style={[styles.textLengthCounter, usernameLength === 0 ? {color: 'gray'} : {color: 'white'}]}>{usernameLength}/15</Text>
              </View>
              {errors.username && <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'red' }}>{errors.username}</Text>}
            </View>
            <View style={{ margin: 2, }}>
              <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'white' }}>Email:</Text>
              <View>
                <TextInput
                  style={[ styles.textInput, errors.email ? { borderColor: '#E42727' } : { borderColor: 'transparent' }]} placeholderTextColor="gray" placeholder='Email...' id='email' name='email'
                  onChangeText={(email) => {handleChange('email', email);}}
                  value={formData.email}
                />
              </View>
              {errors.email && <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'red' }}>{errors.email}</Text>}
            </View>
            <Pressable style={{backgroundColor: '#323232', width: 100, textAlign: 'center', margin: 2, marginTop: 8, marginBottom: 6, borderRadius: 6}} onPress={() => {handleSubmit()}}>
              <Text style={{color: 'white', margin: 2, textAlign: 'center', textTransform: 'uppercase', fontSize: 20,}}>Update</Text>
            </Pressable>
            <Animated.View style={[{opacity: fadeAnim}]}>
              {success && <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'green' }}>{success}</Text>}
            </Animated.View>
            <Text onPress={handleToggleModal} style={{color: 'white', margin: 4, textAlign: 'center', textTransform: 'uppercase', fontSize: 20,}}>Change password</Text>
          </View>
          <GameHistory/>
        </>
      </TouchableWithoutFeedback>
      {isModalOpen && <ChangePasswordModal toggleModal={handleToggleModal}/>}
      
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: 'white',
    flex: 1,
    backgroundColor: '#242424',
    paddingHorizontal: 45,
    paddingVertical: 30,
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
  changeProfileData: {
    width: 320, 
    backgroundColor: '#181818', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10, 
    color: 'white', 
    borderRadius: 20,
    marginLeft: 30,
    marginBottom: 30,
  },
  textLengthCounter: {
    position: 'absolute',
    zIndex: 1, 
    top: 10, 
    right: 4, 
    fontSize: 14,
  },
  textInput:{
    width: 300, 
    height: 40, 
    backgroundColor: '#323232', 
    paddingHorizontal: 5, 
    color: 'white', 
    borderRadius: 8, 
    borderWidth: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default Profile;
