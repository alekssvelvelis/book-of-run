import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { getToken } from '../../utils/storageUtils.jsx';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;

const ChangePasswordModal = ({toggleModal}) => {
    const [isPasswordRevealed, setPasswordRevealed] = useState(false);
    const [errors, setErrors] = useState({}); 
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const togglePasswordVisibility = () => {
        setPasswordRevealed(!isPasswordRevealed);
    };

    const handleChange = (name, value) => {
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleSubmit = async () => { 
        const newErrors = {}; 
        
        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Current password is required.';
        }

        if (!formData.newPassword) { 
            newErrors.newPassword = 'New password is required.'; 
        } else if (formData.newPassword.length < 8) { 
            newErrors.newPassword = 'New password must be at least 8 characters.'; 
        }

        if (!formData.confirmNewPassword) { 
            newErrors.confirmNewPassword = 'Confirmed password is required.'; 
        } else if (formData.confirmNewPassword.length < 8) { 
            newErrors.confirmNewPassword = 'Confirmed password must be at least 8 characters.'; 
        } else if (formData.confirmNewPassword !== formData.newPassword) {
            newErrors.confirmNewPassword = 'New passwords do not match.';
        }

        setErrors(newErrors);
        if(Object.keys(newErrors).length === 0){
            console.log(Object.keys(newErrors).length, 'length in change password');
            try {
                const token = await getToken();
                const response = await fetch('http://10.13.6.174/api/updateUserPassword', {
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
                  console.log(responseData.errors);
                } else {
                  console.log(responseData.message);
                  setErrors({});
                }
              } catch (error) {
                console.error('Error occurred: inside of catch', error);
              }
        }     
    }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 3, alignItems: 'center', position: 'absolute', }}>
            <View style={{ backgroundColor: '#161616', display: 'flex', alignItems: 'center', zIndex: 5, marginTop: '50%', color: 'white', borderRadius: 20, width: screenWidth-20, }}>
                <Text style={{ textAlign: 'center', color: 'white', textTransform: 'uppercase', fontSize: 24, marginTop: 8,}}>Change password</Text>
                <View style={{ margin: 2, }}>
                    <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'white' }}>Current password:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput secureTextEntry={!isPasswordRevealed} style={{ width: 300, height: 40, backgroundColor: '#323232', paddingHorizontal: 5, color: 'white', borderRadius: 8, borderWidth: 1,  borderColor: errors.currentPassword ? '#E42727' : 'transparent' }} placeholderTextColor="gray" placeholder='Password...' id='currentPassword' name='currentPassword' onChangeText={(currentPassword) => handleChange('currentPassword', currentPassword)} value={formData.currentPassword}></TextInput>
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10 }}>
                        {isPasswordRevealed ? (
                        <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' width={24} height={24}>
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                        </Svg>
                        ) : (
                        <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' width={24} height={24}>
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                        </Svg>
                        )}
                    </TouchableOpacity>
                    </View>
                    {errors.currentPassword && <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'red' }}>{errors.currentPassword}</Text>}
                </View>
                <View style={{ margin: 2, }}>
                    <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'white' }}>New password:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput secureTextEntry={!isPasswordRevealed} style={{ width: 300, height: 40, backgroundColor: '#323232', paddingHorizontal: 5, color: 'white', borderRadius: 8, borderWidth: 1,  borderColor: errors.newPassword ? '#E42727' : 'transparent' }} placeholderTextColor="gray" placeholder='New Password...' id='newPassword' name='newPassword' onChangeText={(newPassword) => handleChange('newPassword', newPassword)} value={formData.newPassword}></TextInput>
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10 }}>
                        {isPasswordRevealed ? (
                        <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' width={24} height={24}>
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                        </Svg>
                        ) : (
                        <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' width={24} height={24}>
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                        </Svg>
                        )}
                    </TouchableOpacity>
                    </View>
                    {errors.newPassword && <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'red' }}>{errors.newPassword}</Text>}
                </View>
                <View style={{ margin: 2, }}>
                    <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'white' }}>New password:</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput secureTextEntry={!isPasswordRevealed} style={{ width: 300, height: 40, backgroundColor: '#323232', paddingHorizontal: 5, color: 'white', borderRadius: 8, borderWidth: 1,  borderColor: errors.confirmNewPassword ? '#E42727' : 'transparent' }} placeholderTextColor="gray" placeholder='Current password...' id='newPassword' name='confirmNewPassword' onChangeText={(confirmNewPassword) => handleChange('confirmNewPassword', confirmNewPassword)} value={formData.confirmNewPassword}></TextInput>
                    <TouchableOpacity onPress={togglePasswordVisibility} style={{ position: 'absolute', right: 10 }}>
                        {isPasswordRevealed ? (
                        <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' width={24} height={24}>
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                        </Svg>
                        ) : (
                        <Svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='white' width={24} height={24}>
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                            <Path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                        </Svg>
                        )}
                    </TouchableOpacity>
                    </View>
                    {errors.confirmNewPassword && <Text style={{ marginTop: 4, marginBottom: 4, marginLeft: 5, color: 'red' }}>{errors.confirmNewPassword}</Text>}
                </View>
                <Pressable style={{backgroundColor: '#323232', width: 100, textAlign: 'center', margin: 2, marginTop: 8, marginBottom: 6, borderRadius: 6}} onPress={() => {handleSubmit()}}>
                    <Text style={{color: 'white', margin: 2, textAlign: 'center', textTransform: 'uppercase', fontSize: 20,}}>Update</Text>
                </Pressable>
                <Pressable style={{backgroundColor: '#323232', position: 'absolute', width: 20, bottom: 0, right: 10, textAlign: 'center', margin: 2, marginTop: 8, marginBottom: 6, borderRadius: 6}} onPress={toggleModal}>
                    <Text style={{color: 'white', margin: 2, textAlign: 'center', textTransform: 'uppercase', fontSize: 20,}}>X</Text>
                </Pressable>
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
};
export default ChangePasswordModal;
