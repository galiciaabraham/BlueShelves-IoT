import { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, Pressable, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { updateItem, deleteItem } from "@/components/services/inventoryService";
import { globalStyles } from "@/styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import { fetchAllItems } from "@/components/services/inventoryService";
import { validateItemFields } from "@/components/utilities/validateItem";

export default function UpdateItemScreen() {
  const router = useRouter();
  const { item_id } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [item_name, setName] = useState("");
  const [item_color, setColor] = useState("");
  const [item_size, setSize] = useState("");
  const [item_quantity, setQuantity] = useState("");
  const [item_sku, setSku] = useState("");

  // Fetch specific item
  useEffect(() => {
    async function loadItem() {
      try {
        const data = await fetchAllItems().then(items => items.find((i : any)  => i.item_id === Number(item_id)));

        setName(data.item_name);
        setColor(data.item_color);
        setSize(data.item_size);
        setQuantity(String(data.item_quantity));
        setSku(data.item_sku);

      } catch (err) {
        Alert.alert("Error", "Failed to load item");
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [item_id]);

  async function handleUpdate() {
    const error = validateItemFields({
        item_name,
        item_color,
        item_size,
        item_quantity,
        item_sku,
        });

    try {

       
        
        if (error) {
            Alert.alert("Invalid Input", error);
            return;
        }

      await updateItem(Number(item_id), {
        item_name,
        item_color,
        item_size,
        item_quantity: Number(item_quantity),
        item_sku,
      });

      Alert.alert("Success", "Item updated!");
      router.back(); // returns to dashboard
    } catch (err) {
      Alert.alert("Error", "Failed to update item");
    }
  }

  function confirmDelete() {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteItem(Number(item_id));
              Alert.alert("Deleted", "Item removed");
              router.replace("/dashboard"); // ensures it's removed from list
            } catch (err) {
              Alert.alert("Error", "Failed to delete item");
            }
          },
        },
      ]
    );
  }

  if (loading) return <Text>Loading...</Text>;

  return (
    <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}  // adjust based on header height
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
    <View style={globalStyles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={globalStyles.title}>Edit Item</Text>
      </View>

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
        style={globalStyles.input}
        keyboardType="numeric"
        value={item_quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        placeholder="SKU"
        style={globalStyles.input}
        value={item_sku}
        onChangeText={setSku}
      />
    <View style={globalStyles.buttonContainer}>
      <Pressable style={globalStyles.buttonUpdate} onPress={handleUpdate}>
        <Text style={globalStyles.buttonText}>Update Item</Text>
      </Pressable>
      <Pressable style={globalStyles.deleteButton} onPress={confirmDelete}>
          <Ionicons name="trash" size={28} color="red" />
        </Pressable>
      </View>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
