import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

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

  const menuItems = [
    { 
      label: 'Profile', 
      icon: 'user', 
      iconType: 'FontAwesome',
      onPress: () => props.navigation.navigate('Profile') 
    },
    { 
      label: 'Cộng đồng', 
      icon: 'users', 
      iconType: 'FontAwesome',
      onPress: () => props.navigation.navigate('Community') 
    },
    // Chưa có Bookmarks 
    // Chưa có Lists
    { 
      label: 'Settings & Privacy', 
      icon: 'cog', 
      iconType: 'FontAwesome',
      onPress: () => props.navigation.navigate('SettingsPrivacy') 
    },
    { 
      label: 'Đăng xuất', 
      icon: 'sign-out-alt', 
      iconType: 'FontAwesome5',
      onPress: handleLogout,
      isLogout: true
    }
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity 
      key={item.label}
      style={[styles.menuItem, item.isLogout && styles.logoutItem]} 
      onPress={item.onPress}
    >
      <View style={styles.menuItemContent}>
        <View style={[styles.iconContainer, item.isLogout && styles.logoutIconContainer]}>
          {item.iconType === 'FontAwesome' ? (
            <FontAwesome name={item.icon} size={20} color={item.isLogout ? '#e74c3c' : '#657786'} />
          ) : (
            <FontAwesome5 name={item.icon} size={20} color={item.isLogout ? '#e74c3c' : '#657786'} />
          )}
        </View>
        <Text style={[styles.menuItemText, item.isLogout && styles.logoutText]}>
          {item.label}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.name}>Tên đầy đủ</Text>
            <Text style={styles.username}>@username</Text>
          </View>
          
          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>120</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </DrawerContentScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.version}>App version 1.0</Text>
          <Text style={styles.copyright}>© 2025 Twitter Clone</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
  },
  scrollContent: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1DA1F2',
  },
  userInfo: {
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  username: {
    fontSize: 14,
    color: '#657786',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    marginRight: 20,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#657786',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e1e8ed',
  },
  menuItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutIconContainer: {
    // Special styling for logout icon if needed
  },
  logoutText: {
    color: '#e74c3c',
    fontWeight: '600',
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  footerContent: {
    padding: 16,
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#657786',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#657786',
  },
});
