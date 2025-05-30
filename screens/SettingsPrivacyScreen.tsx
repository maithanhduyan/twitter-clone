import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../components/Header';

const SettingsPrivacyScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);

  const settingsSections = [
    {
      title: 'Your account',
      icon: 'user',
      description: 'Thay đổi thông tin cá nhân, mật khẩu, xóa tài khoản',
      items: ['Account information', 'Change password', 'Deactivate account']
    },
    {
      title: 'Monetization',
      icon: 'dollar',
      description: 'Quản lý thu nhập từ quảng cáo và subscriptions',
      items: ['Creator monetization', 'Ad revenue sharing', 'Super Follows']
    },
    {
      title: 'Premium',
      icon: 'star',
      description: 'Quản lý gói X Premium và các tính năng đặc biệt',
      items: ['Premium features', 'Verification', 'Edit tweets']
    },
    {
      title: 'Creator Subscriptions',
      icon: 'bookmark',
      description: 'Quản lý nội dung trả phí và người đăng ký',
      items: ['Subscription settings', 'Content monetization', 'Subscriber management']
    },
    {
      title: 'Security and account access',
      icon: 'shield',
      description: 'Bảo mật tài khoản và xác thực 2 lớp',
      items: ['Two-factor authentication', 'Active sessions', 'Connected apps']
    },
    {
      title: 'Privacy and safety',
      icon: 'lock',
      description: 'Cài đặt quyền riêng tư và an toàn',
      items: ['Privacy settings', 'Safety', 'Block and mute', 'Content filtering']
    },
    {
      title: 'Notifications',
      icon: 'bell',
      description: 'Tùy chỉnh các loại thông báo',
      items: ['Push notifications', 'Email notifications', 'SMS notifications']
    },
    {
      title: 'Accessibility, display, and languages',
      icon: 'cog',
      description: 'Giao diện, ngôn ngữ và accessibility',
      items: ['Display settings', 'Language', 'Accessibility', 'Dark mode']
    },
    {
      title: 'Additional resources',
      icon: 'plus-circle',
      description: 'Công cụ và tài nguyên bổ sung',
      items: ['Developer tools', 'Business tools', 'Ad preferences']
    },
    {
      title: 'Help Center',
      icon: 'question-circle',
      description: 'Trung tâm trợ giúp và hỗ trợ',
      items: ['Help articles', 'Contact support', 'Report a problem']
    }
  ];

  const filteredSections = settingsSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSectionPress = (section: any) => {
    console.log(`Navigate to ${section.title}`);
    // Implement navigation to specific settings screen
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.username}>@username</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={16} color="#657786" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Settings"
            placeholderTextColor="#657786"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Settings */}
        <View style={styles.quickSettings}>
          <Text style={styles.sectionTitle}>Quick Settings</Text>
          
          <View style={styles.quickSettingRow}>
            <View style={styles.quickSettingLeft}>
              <FontAwesome name="moon-o" size={18} color="#1DA1F2" />
              <Text style={styles.quickSettingLabel}>Dark mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e1e8ed', true: '#1DA1F2' }}
              thumbColor={darkMode ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.quickSettingRow}>
            <View style={styles.quickSettingLeft}>
              <FontAwesome name="bell" size={18} color="#1DA1F2" />
              <Text style={styles.quickSettingLabel}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e1e8ed', true: '#1DA1F2' }}
              thumbColor={notifications ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.quickSettingRow}>
            <View style={styles.quickSettingLeft}>
              <FontAwesome name="lock" size={18} color="#1DA1F2" />
              <Text style={styles.quickSettingLabel}>Private account</Text>
            </View>
            <Switch
              value={privateAccount}
              onValueChange={setPrivateAccount}
              trackColor={{ false: '#e1e8ed', true: '#1DA1F2' }}
              thumbColor={privateAccount ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Settings Sections */}
        <View style={styles.sectionsContainer}>
          <Text style={styles.sectionTitle}>All Settings</Text>
          
          {filteredSections.map((section, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingSection}
              onPress={() => handleSectionPress(section)}
            >
              <View style={styles.sectionLeft}>
                <View style={styles.sectionIconContainer}>
                  <FontAwesome name={section.icon as any} size={20} color="#1DA1F2" />
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.sectionTitleText}>{section.title}</Text>
                  <Text style={styles.sectionDescription}>{section.description}</Text>
                </View>
              </View>
              <FontAwesome name="chevron-right" size={16} color="#657786" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Actions */}
        <View style={styles.accountActions}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="sign-out" size={18} color="#e0245e" />
            <Text style={styles.actionButtonText}>Log out</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <FontAwesome name="trash" size={18} color="#e0245e" />
            <Text style={[styles.actionButtonText, styles.dangerText]}>Deactivate account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsPrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  content: {
    flex: 1,
  },
  headerSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14171a',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#657786',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f7f9fa',
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#14171a',
  },
  quickSettings: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14171a',
    marginBottom: 16,
  },
  quickSettingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  quickSettingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickSettingLabel: {
    fontSize: 16,
    color: '#14171a',
    marginLeft: 12,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
  },
  settingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  sectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionTitleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#14171a',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#657786',
    lineHeight: 18,
  },
  accountActions: {
    padding: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e8ed',
    marginBottom: 80,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#f7f9fa',
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e0245e',
    marginLeft: 12,
  },
  dangerButton: {
    backgroundColor: '#fef2f2',
    borderColor: '#e0245e',
    borderWidth: 1,
  },
  dangerText: {
    color: '#e0245e',
  },
});
