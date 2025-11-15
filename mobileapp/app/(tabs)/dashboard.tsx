import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import { mockItems } from '../../mockItems';

export default function DashboardScreen() {
  // Calculate total quantity for summary
  const totalQuantity = mockItems.reduce((sum, item) => sum + item.item_quantity, 0);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Inventory Dashboard</Text>
      <View style={globalStyles.separator} />

      {/* Summary Section */}
      <Text style={globalStyles.subtitle}>
        Total Items in Inventory: {totalQuantity}
      </Text>

      {/* Item List */}
      <FlatList
        data={mockItems}
        keyExtractor={(item) => item.item_sku}
        renderItem={({ item }) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{item.item_name}</Text>
            <Text style={globalStyles.cardDetail}>SKU: {item.item_sku}</Text>
            <Text style={globalStyles.cardDetail}>Color: {item.item_color}</Text>
            <Text style={globalStyles.cardDetail}>Size: {item.item_size}</Text>
            <Text style={globalStyles.cardDetail}>Quantity: {item.item_quantity}</Text>
          </View>
        )}
      />
    </View>
  );
}
