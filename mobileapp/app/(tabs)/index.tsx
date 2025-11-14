import { StyleSheet, Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  // TODO: Replace with real auth logic
  const isLoggedIn = true; // temporary placeholder

  if (!isLoggedIn) {
    // If not logged in, redirect to login modal
    router.push('/modal');
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to BlueShelves!</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.subtitle}>
        Scan, manage, and connect your inventory with ease.
      </Text>

      <View style={styles.actions}>
        <Button
          title="Go to Dashboard"
          onPress={() => router.push('/dashboard')}
          color="#007bff"
        />
        <Button
          title="Scan Devices"
          onPress={() => router.push('/scan')}
          color="#28a745"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
    backgroundColor: '#ddd',
  },
  actions: {
    marginTop: 20,
    width: '80%',
    gap: 15,
  },
});
