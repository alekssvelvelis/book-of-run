import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    console.log('Token stored successfully!', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const storeHearts = async (hearts) => {
  try {
    await AsyncStorage.setItem('hearts', JSON.stringify(hearts.hearts)); // Convert hearts to a string
    console.log('Hearts stored successfully!', hearts);
  } catch (error) {
    console.error('Error storing hearts:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token !== null) {
      // console.log('Token retrieved successfully:', token);
      return token;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    throw error;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('authToken');   //await AsyncStorage.clear();
    // console.log('Token removed successfully!');
    return true;
  } catch (error) {
    console.error('Error removing token:', error);
    return false;
  }
};