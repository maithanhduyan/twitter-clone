import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { FontAwesome } from '@expo/vector-icons';


const Header = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState(false);

  const mockNotifications = [
    { id: '1', title: 'Sự kiện mới sắp diễn ra!' },
    { id: '2', title: 'Ví của bạn vừa được cập nhật.' },
    { id: '3', title: 'Bạn có 2 người theo dõi mới.' },
  ];

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/twitter.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <FontAwesome name="cog" size={24} color="gray" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 30, height: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1DA1F2' },
});
