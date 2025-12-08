import React, { useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import { GOOGLE_AUTH_CONFIG } from '../config'; // import from your config.ts

// ✅ Must be called at the top level, outside any component
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  // ✅ Hardcode the Expo proxy redirect URI
  const redirectUri = "https://auth.expo.io/@thandokuhle/blueshelves";
  console.log("Redirect URI:", redirectUri);

  // ✅ Configure Google OAuth with redirectUri and useProxy
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: GOOGLE_AUTH_CONFIG.expoClientId,
    iosClientId: GOOGLE_AUTH_CONFIG.iosClientId,
    androidClientId: GOOGLE_AUTH_CONFIG.androidClientId,
    webClientId: GOOGLE_AUTH_CONFIG.webClientId,
    redirectUri,   // critical
    // useProxy: true // ensures Expo proxy is used
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Fetch user info from Google
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then(res => res.json())
        .then(userInfo => {
          console.log('User Info:', userInfo);
          router.replace('/(tabs)'); // navigate to dashboard
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
        onPress={() => promptAsync()} // ✅ no arguments
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