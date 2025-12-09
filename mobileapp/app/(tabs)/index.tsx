import { Button } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { globalStyles } from '@/styles/globalStyles';
// import { useAuth } from '@/context/AuthContext';

export default function HomeScreen(isLoggedIn: boolean) {
  const router = useRouter();

  if (!isLoggedIn) {
    router.push('/login'); // redirect to login modal
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Welcome to BlueShelves!</Text>
      <View style={globalStyles.separator} />
      <Text style={globalStyles.subtitle}>
        Scan, manage, and connect your inventory with ease.
      </Text>

      <View style={globalStyles.actions}>
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
        {/* <Button
          title="Logout"
          onPress={() => {
            logout();       // ✅ simulate logout
            router.replace('/modal'); // go back to login modal
          }}
          color="#dc3545"
        /> */}
      </View>
    </View>
  );
}
