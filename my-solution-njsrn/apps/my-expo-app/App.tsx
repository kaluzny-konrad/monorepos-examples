import { ScreenContent } from './components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import './global.css';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </View>
  );
}
