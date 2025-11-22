import { View, Text, Pressable } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import { DisplayItems } from '@/components/DisplayItems';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Inventory Dashboard</Text>
      <View style={globalStyles.separator} />
      <Pressable onPress={() => router.push('/add-item')}>
        <Text style={globalStyles.link}>Add New Item</Text>
      </Pressable>

      {/* Item List */}
      <DisplayItems/>    
      </View>
  );
}
