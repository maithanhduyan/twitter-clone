import React from 'react';
import {
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';

const CustomDrawerContent = (props: any) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
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
      icon: 'person-outline', 
      iconType: 'Ionicons',
      onPress: () => props.navigation.navigate('Profile') 
    },
    { 
      label: 'Premium', 
      icon: 'star', 
      iconType: 'FontAwesome',
      onPress: () => props.navigation.navigate('Premium'),
      isPremium: true
    },
    { 
      label: 'Communities', 
      icon: 'people-outline', 
      iconType: 'Ionicons',
      onPress: () => props.navigation.navigate('Communities') 
    },
    { 
      label: 'Lists', 
      icon: 'list-outline', 
      iconType: 'Ionicons',
      onPress: () => props.navigation.navigate('Lists') 
    },
    { 
      label: 'Bookmarks', 
      icon: 'bookmark-outline', 
      iconType: 'Ionicons',
      onPress: () => props.navigation.navigate('Bookmarks') 
    },
    { 
      label: 'Verified Orgs', 
      icon: 'verified', 
      iconType: 'MaterialIcons',
      onPress: () => props.navigation.navigate('VerifiedOrgs'),
      isVerified: true
    },
    { 
      label: 'Monetization', 
      icon: 'attach-money', 
      iconType: 'MaterialIcons',
      onPress: () => props.navigation.navigate('Monetization') 
    },
    { 
      label: 'Ads', 
      icon: 'campaign', 
      iconType: 'MaterialIcons',
      onPress: () => props.navigation.navigate('Ads') 
    },
    { 
      label: 'Jobs', 
      icon: 'work-outline', 
      iconType: 'MaterialIcons',
      onPress: () => props.navigation.navigate('Jobs') 
    },
    { 
      label: 'Settings and privacy', 
      icon: 'settings-outline', 
      iconType: 'Ionicons',
      onPress: () => props.navigation.navigate('SettingsPrivacy') 
    }
  ];

  const renderMenuItem = (item: any) => (
    <TouchableOpacity 
      key={item.label}
      style={styles.menuItem} 
      onPress={item.onPress}
    >
      <View style={styles.menuItemContent}>
        <View style={styles.iconContainer}>
          {item.iconType === 'FontAwesome' ? (
            <FontAwesome 
              name={item.icon} 
              size={20} 
              color={item.isPremium ? '#FFD700' : '#657786'} 
            />
          ) : item.iconType === 'FontAwesome5' ? (
            <FontAwesome5 
              name={item.icon} 
              size={20} 
              color={item.isVerified ? '#1DA1F2' : '#657786'} 
            />
          ) : item.iconType === 'MaterialIcons' ? (
            <MaterialIcons 
              name={item.icon} 
              size={20} 
              color={item.isVerified ? '#1DA1F2' : '#657786'} 
            />
          ) : (
            <Ionicons 
              name={item.icon} 
              size={20} 
              color='#657786' 
            />
          )}
        </View>
        <Text style={styles.menuItemText}>
          {item.label}
        </Text>
        {item.isPremium && (
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumText}>PRO</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView 
        {...props} 
        contentContainerStyle={styles.scrollContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.topSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300' }}
                style={styles.avatar}
              />
            </View>
            <TouchableOpacity style={styles.addAccountButton}>
              <Ionicons name="add" size={20} color="#1DA1F2" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Text style={styles.name}>AnMTD</Text>
            <Text style={styles.username}>@maithanhduyan</Text>
          </View>
          
          {/* Stats */}
          <View style={styles.stats}>
            <TouchableOpacity style={styles.stat}>
              <Text style={styles.statNumber}>759</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stat}>
              <Text style={styles.statNumber}>6M</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>

        {/* Logout Section */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity 
            style={styles.logoutItem} 
            onPress={handleLogout}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="sign-out-alt" size={20} color="#e74c3c" />
              </View>
              <Text style={styles.logoutText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    backgroundColor: '#ffffff',
    minHeight: '100%', // Thêm dòng này
  },
  scrollContent: {
    flexGrow: 1, // Thay vì flex: 1
    paddingBottom: 20, // Thêm padding bottom
  },  header: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50, // Thêm padding top để tránh camera trước
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#1DA1F2',
  },
  addAccountButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f7f9fa',
    borderWidth: 1,
    borderColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  username: {
    fontSize: 15,
    color: '#657786',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 4,
  },
  statLabel: {
    fontSize: 15,
    color: '#657786',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginTop: 8,
  },
  menuItem: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f7f9fa',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    minHeight: 52,
  },
  iconContainer: {
    width: 32,
    alignItems: 'flex-start',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
    flex: 1,
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  premiumText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000',
  },
  logoutContainer: {
    backgroundColor: 'white',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
  },
  logoutItem: {
    backgroundColor: 'white',
  },
  logoutText: {
    fontSize: 17,
    color: '#e74c3c',
    fontWeight: '400',
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    marginBottom: 20,
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
