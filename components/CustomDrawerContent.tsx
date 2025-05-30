import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props: any) => {
  const handleLogout = async () => {
    // Xóa session/token lưu trữ nếu có
    await AsyncStorage.removeItem('userToken');

    // Reset navigation stack và điều hướng về Login
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>@username</Text>
        <Text style={styles.name}>Tên đầy đủ</Text>
      </View>

      <DrawerItem label="Profile" onPress={() => props.navigation.navigate('Profile')} />
      <DrawerItem label="Cộng đồng" onPress={() => props.navigation.navigate('Community')} />
      <DrawerItem label="Settings & Privacy" onPress={() => props.navigation.navigate('SettingsPrivacy')} />
      <DrawerItem
        label="Đăng xuất"
        onPress={handleLogout}
      />

      <View style={styles.footer}>
        <Text style={styles.version}>App version 1.0</Text>
        <Text style={styles.copyright}>© 2025</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  username: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    color: '#555',
    fontSize: 14,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  version: {
    fontSize: 12,
    color: '#777',
  },
  copyright: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});
