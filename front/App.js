import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AnimalComponent from './components/AnimalComponent';
import Login from './components/Authorize/Login';
import Register from './components/Authorize/Register';
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>Try book of shoot! 🎉</Text>
      <Register/>
      {/* <Login/> */}
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
