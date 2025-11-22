import  useInventory  from '@/app/hooks/useInventory';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';


export function DisplayItems() {
    const { items, loading, error, refresh } = useInventory();

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <FlatList
        data={items}
        keyExtractor={(item) => item.item_id.toString()}
        refreshing={loading}
        onRefresh={refresh}
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
    )
}