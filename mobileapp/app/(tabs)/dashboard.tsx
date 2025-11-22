import { View, Text } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import { DisplayItems } from '@/components/DisplayItems';

export default function DashboardScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Inventory Dashboard</Text>
      <View style={globalStyles.separator} />

      {/* Item List */}
      <DisplayItems/>    
      </View>
  );
}
