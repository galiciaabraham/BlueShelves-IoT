import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { createItem } from '@/components/services/inventoryService';
import { globalStyles } from '@/styles/globalStyles';

export default function AddItemScreen() {
  const router = useRouter();

  const [item_name, setName] = useState('');
  const [item_color, setColor] = useState('');
  const [item_size, setSize] = useState('');
  const [item_quantity, setQuantity] = useState('');
  const [item_sku, setSku] = useState('');

  async function handleSubmit() {
    if (!item_name || !item_sku || !item_quantity || !item_color || !item_size) {
      Alert.alert("Missing fields", "Name, SKU, Quantity, Color, and Size are required");
      return;
    }

    try {
      await createItem({
        item_name,
        item_color,
        item_size,
        item_quantity: Number(item_quantity),
        item_sku,
      });

      Alert.alert("Success", "Item added successfully!");
      router.back(); // Go back to Dashboard
    } catch (err) {
      Alert.alert("Error", "Failed to add item");
    }
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add New Item</Text>

      <TextInput
        placeholder="Name"
        style={globalStyles.input}
        value={item_name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Color"
        style={globalStyles.input}
        value={item_color}
        onChangeText={setColor}
      />

      <TextInput
        placeholder="Size"
        style={globalStyles.input}
        value={item_size}
        onChangeText={setSize}
      />

      <TextInput
        placeholder="Quantity"
        keyboardType="numeric"
        style={globalStyles.input}
        value={item_quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        placeholder="SKU"
        style={globalStyles.input}
        value={item_sku}
        onChangeText={setSku}
      />

      <Button title="Add Item" onPress={handleSubmit} />
    </View>
  );
}
