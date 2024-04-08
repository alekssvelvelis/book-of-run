import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AuthorizeView from './views/AuthorizeView';
import Home from './components/Home/Home';
import { getToken } from './utils/storageUtils';

export default function App() {
  const isLoggedIn = getToken();
  return (
    <View style={styles.container}>
      {isLoggedIn ? 
      <Home/> 
      : 
      <AuthorizeView/>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
});
