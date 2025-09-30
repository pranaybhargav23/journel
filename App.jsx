import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StackNavigation from './src/navigations/StackNavigation';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function App() {
  
GoogleSignin.configure({
  webClientId: '662832415825-aeg4s0e8d53pgmms80evmcaiuktie3dk.apps.googleusercontent.com',
});
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
