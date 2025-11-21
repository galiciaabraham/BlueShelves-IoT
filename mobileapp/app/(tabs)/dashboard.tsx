import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import DisplayItems from '@/components/DisplayItems';
import { fetchAllItems } from '@/components/services/inventoryService';

export default async function DashboardScreen() {
  // Calculate total quantity for summary
  const items = await fetchAllItems();

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Inventory Dashboard</Text>
      <View style={globalStyles.separator} />

      {/* Item List */}
      <DisplayItems items={items}/>    
      </View>
  );
}
