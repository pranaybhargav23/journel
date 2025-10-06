import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = (props) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(()=>{
      props.navigation.replace('Login');
    }, 3000)
  },[])

  return (
    <LinearGradient
      colors={['#43cea2', '#185a9d']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Travel Journal</Text>
        <Text style={styles.subtitle}>Capture your journeys, anywhere.</Text>

        {loading && (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    textAlign: 'center',
  },
});

export default SplashScreen;
