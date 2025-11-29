import  useInventory  from '@/app/hooks/useInventory';
import { FlatList, ActivityIndicator, View, Text, Pressable } from 'react-native';
import { globalStyles } from '@/styles/globalStyles';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';


export function DisplayItems() {
    const router = useRouter();
    const { items, loading, error, refresh } = useInventory();

    useFocusEffect(
        useCallback(() => {
            refresh();
        }, [])
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <FlatList
        style={{ width: '100%' }}
         contentContainerStyle={{
            paddingVertical: 10,
            width: '100%',
          }}
        data={items}
        keyExtractor={(item) => item.item_id.toString()}
        refreshing={loading}
        onRefresh={refresh}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/update-item/${item.item_id}`)} style={globalStyles.itemCard}>
            <Text style={globalStyles.cardTitle}>{item.item_name}</Text>
            <Text style={globalStyles.cardDetail}>SKU: {item.item_sku}</Text>
            <Text style={globalStyles.cardDetail}>Color: {item.item_color}</Text>
            <Text style={globalStyles.cardDetail}>Size: {item.item_size}</Text>
            <Text style={globalStyles.cardDetail}>Quantity: {item.item_quantity}</Text>
          </Pressable>
        )}
      />
    )
}