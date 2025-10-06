import React, { useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();

  // Check for existing token on component mount
  useEffect(() => {
    const checkExistingToken = async () => {
      try {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
          // Navigate to AppTabs if token exists
          navigation.replace('AppTabs');
        }
      } catch (error) {
        console.log('Error checking existing token:', error);
      }
    };

    checkExistingToken();
  }, [navigation]);

  const onHandleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();
      console.log(signInResult,"signInResult------->");
      await AsyncStorage.setItem("Token",signInResult.data.idToken);
      
      let idToken;
      // Try the new style of google-sign in result, from v13+ of that module
      idToken = signInResult.data?.idToken;
      if (!idToken) {
        // if you are using older versions of google-signin, try old style result
        idToken = signInResult.idToken;
      }
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);
      navigation.replace("AppTabs");
      // Sign-in the user with the credential
      return signInWithCredential(getAuth(), googleCredential);
    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/BG.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Travel Journal</Text>
        <Text style={styles.subtitle}>Capture your journeys anywhere</Text>

        <TouchableOpacity style={styles.googleBtn} onPress={onHandleGoogleSignIn}>
          <Image 
              source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
              style={styles.googleIcon}
            />

          <Text style={styles.btnText}>Sign in with Google</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.appleBtn}>
          <MaterialCommunityIcons name="apple" size={24} color="#000" style={styles.icon} />
          <Text style={styles.btnText}>Sign in with Apple</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width, height },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.55,
    height: 180,
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 50,
    textAlign: 'center',
    lineHeight: 22,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 18,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#DB4437',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
   googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  appleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: { marginRight: 12 },
  btnText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  orText: {
    color: 'white',
    marginVertical: 12,
    fontSize: 18,
    fontWeight: '500',
  },
});
