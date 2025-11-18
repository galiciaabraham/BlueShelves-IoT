import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Navbar({ navigation }: { navigation: any }) {
  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#ccc',
    }}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signal')}>
        <Ionicons name="wifi-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
        <Ionicons name="list-outline" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Bluetooth')}>
        <Ionicons name="bluetooth-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
