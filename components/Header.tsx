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
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  const mockNotifications = [
    { id: '1', title: 'Sự kiện mới sắp diễn ra!' },
    { id: '2', title: 'Ví của bạn vừa được cập nhật.' },
    { id: '3', title: 'Bạn có 2 người theo dõi mới.' },
  ];

  const settingsOptions = [
    { id: '1', title: 'Cài đặt tài khoản', icon: 'user' },
    { id: '2', title: 'Quyền riêng tư', icon: 'shield' },
    { id: '3', title: 'Thông báo', icon: 'bell' },
    { id: '4', title: 'Giao diện', icon: 'paint-brush' },
    { id: '5', title: 'Đăng xuất', icon: 'sign-out' },
  ];

  const handleSettingsPress = (option: any) => {
    setSettingsVisible(false);
    switch (option.id) {
      case '1':
        // Navigate to account settings
        console.log('Navigate to account settings');
        break;
      case '2':
        // Navigate to privacy settings
        console.log('Navigate to privacy settings');
        break;
      case '3':
        // Navigate to notification settings
        console.log('Navigate to notification settings');
        break;
      case '4':
        // Navigate to theme settings
        console.log('Navigate to theme settings');
        break;
      case '5':
        // Handle logout
        console.log('Logout');
        break;
    }
  };

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
      <TouchableOpacity onPress={() => setSettingsVisible(true)}>
        <FontAwesome name="cog" size={24} color="gray" />
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal
        visible={isSettingsVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.settingsModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cài đặt</Text>
              <TouchableOpacity onPress={() => setSettingsVisible(false)}>
                <FontAwesome name="times" size={20} color="gray" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={settingsOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.settingsItem}
                  onPress={() => handleSettingsPress(item)}
                >
                  <FontAwesome name={item.icon as any} size={18} color="#1DA1F2" />
                  <Text style={styles.settingsText}>{item.title}</Text>
                  <FontAwesome name="chevron-right" size={14} color="gray" />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsModal: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1DA1F2',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
});
