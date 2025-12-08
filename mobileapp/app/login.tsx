import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import { GOOGLE_AUTH_CONFIG } from '../config'; // import from your config.ts

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();


const redirectUri = "https://auth.expo.io/@thandokuhle/blueshelves";
console.log("Redirect URI:", redirectUri);

  // Configure Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_AUTH_CONFIG.expoClientId,
    iosClientId: GOOGLE_AUTH_CONFIG.iosClientId,
    androidClientId: GOOGLE_AUTH_CONFIG.androidClientId,
    webClientId: GOOGLE_AUTH_CONFIG.webClientId,
    redirectUri: redirectUri,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // For now, just log user info and navigate
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then(res => res.json())
        .then(userInfo => {
          console.log('User Info:', userInfo);
          router.replace('/(tabs)'); // go to dashboard
        })
        .catch(err => console.error(err));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MobileApp</Text>
      <Button
        title="Sign in with Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: '600',
  },
});