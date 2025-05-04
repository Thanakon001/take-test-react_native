import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HeaderBar from './components/HeaderBar';
import BodyApp from './components/BodyApp';

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <BodyApp />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});
