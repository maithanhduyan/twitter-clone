import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  RefreshControl,
  Alert,
  Image
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import headerNotification from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface Notification {
  id: string;
  type: 'new_post' | 'like' | 'retweet' | 'follow' | 'mention' | 'suggested';
  users: string[];
  content: string;
  time: string;
  isRead: boolean;
  postContent?: string;
  category: string;
  isVerified?: boolean;
  isSuggested?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'new_post',
    users: ['ThuanCapital', 'John Doe', 'Jane Smith'],
    content: 'New post from people you follow',
    time: '2h',
    isRead: false,
    postContent: 'Excited to share our latest insights on blockchain technology...',
    category: 'all'
  },
  {
    id: '2',
    type: 'like',
    users: ['Elon Musk'],
    content: 'liked your Tweet',
    time: '3h',
    isRead: false,
    postContent: 'Just shipped a new feature!',
    category: 'all'
  },
  {
    id: '3',
    type: 'retweet',
    users: ['Bill Gates', 'Tim Cook'],
    content: 'retweeted your Tweet',
    time: '5h',
    isRead: true,
    postContent: 'AI is the future of technology',
    category: 'all'
  },
  {
    id: '4',
    type: 'follow',
    users: ['Sam Altman'],
    content: 'followed you',
    time: '8h',
    isRead: false,
    isVerified: true,
    category: 'verified'
  },
  {
    id: '5',
    type: 'mention',
    users: ['Gergely Orosz'],
    content: 'mentioned you in a Tweet',
    time: '12h',
    isRead: true,
    postContent: 'Great insights from @yourhandle about software engineering!',
    isVerified: true,
    category: 'mentions'
  },
  {
    id: '6',
    type: 'suggested',
    users: ['OpenAI'],
    content: 'Suggested for you',
    time: '1d',
    isRead: false,
    postContent: 'GPT-4 is now available for everyone! Experience the power of advanced AI.',
    isVerified: true,
    category: 'verified',
    isSuggested: true
  },
  {
    id: '7',
    type: 'like',
    users: ['React Native', 'Meta', 'Google'],
    content: 'and 15 others liked your Tweet',
    time: '2d',
    isRead: true,
    postContent: 'React Native is amazing for cross-platform development',
    category: 'all'
  }
];

const NotificationScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async (): Promise<void> => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Thành công', 'Đã cập nhật thông báo!');
    }, 1500);
  };

  const getFilteredNotifications = (): Notification[] => {
    switch (activeTab) {
      case 'verified':
        return notifications.filter(notif => notif.isVerified || notif.category === 'verified');
      case 'mentions':
        return notifications.filter(notif => notif.type === 'mention');
      default:
        return notifications;
    }
  };

  const handleNotificationPress = (notification: Notification): void => {
    // Mark as read
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notification.id 
          ? { ...notif, isRead: true }
          : notif
      )
    );
    
    // Handle different notification types
    switch (notification.type) {
      case 'follow':
        Alert.alert('Thông báo', `${notification.users[0]} đã theo dõi bạn`);
        break;
      case 'like':
        Alert.alert('Thông báo', `${notification.users[0]} đã thích bài viết của bạn`);
        break;
      case 'retweet':
        Alert.alert('Thông báo', `${notification.users[0]} đã retweet bài viết của bạn`);
        break;
      case 'mention':
        Alert.alert('Thông báo', `${notification.users[0]} đã nhắc đến bạn`);
        break;
      default:
        Alert.alert('Thông báo', 'Mở bài viết...');
    }
  };

  const handleSettingsPress = (): void => {
    Alert.alert(
      'Cài đặt thông báo',
      'Tùy chọn thông báo sẽ được mở tại đây',
      [
        { text: 'Bật tất cả', onPress: () => {} },
        { text: 'Tắt tất cả', onPress: () => {} },
        { text: 'Hủy', style: 'cancel' }
      ]
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <FontAwesome name="heart" size={16} color="#e74c3c" />;
      case 'retweet':
        return <FontAwesome5 name="retweet" size={16} color="#00ba7c" />;
      case 'follow':
        return <FontAwesome5 name="user-plus" size={16} color="#1DA1F2" />;
      case 'mention':
        return <FontAwesome name="at" size={16} color="#1DA1F2" />;
      case 'new_post':
        return <FontAwesome5 name="bell" size={16} color="#657786" />;
      case 'suggested':
        return <FontAwesome name="star" size={16} color="#9b59b6" />;
      default:
        return <FontAwesome5 name="bell" size={16} color="#657786" />;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity 
      style={[styles.notification, !item.isRead && styles.unreadNotification]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationLeft}>
        <View style={styles.iconContainer}>
          {getNotificationIcon(item.type)}
        </View>
        <View style={styles.avatarsContainer}>
          {item.users.slice(0, 3).map((user: string, index: number) => (
            <View 
              key={index} 
              style={[
                styles.avatar, 
                { marginLeft: index > 0 ? -8 : 0, zIndex: 3 - index }
              ]}
            >
              <FontAwesome name="user" size={16} color="white" />
              {item.isVerified && index === 0 && (
                <View style={styles.verifiedBadge}>
                  <FontAwesome name="check" size={8} color="white" />
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationText}>
            <Text style={styles.usersText}>
              {item.users.length === 1 
                ? item.users[0]
                : item.users.length === 2
                ? `${item.users[0]} and ${item.users[1]}`
                : `${item.users[0]}, ${item.users[1]} and ${item.users.length - 2} others`
              }
            </Text>
            {' '}
            <Text style={styles.actionText}>{item.content}</Text>
          </Text>
          <View style={styles.notificationMeta}>
            {item.isSuggested && (
              <FontAwesome name="star" size={12} color="#9b59b6" style={styles.suggestedIcon} />
            )}
            <Text style={styles.timeText}>{item.time}</Text>
            {!item.isRead && <View style={styles.unreadDot} />}
          </View>
        </View>

        {item.postContent && (
          <View style={styles.postPreview}>
            <Text style={styles.postContent} numberOfLines={2}>
              {item.postContent}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const CustomHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {/* <View style={styles.avatar}>
          <FontAwesome name="user" size={20} color="white" />
        </View> */}
        {/* Avatar */}
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Notifications</Text>
      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={handleSettingsPress}
      >
        <FontAwesome name="cog" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const TabHeader = () => (
    <View style={styles.tabs}>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'all' && styles.activeTab]}
        onPress={() => setActiveTab('all')}
      >
        <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'verified' && styles.activeTab]}
        onPress={() => setActiveTab('verified')}
      >
        <Text style={[styles.tabText, activeTab === 'verified' && styles.activeTabText]}>
          Verified
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.tab, activeTab === 'mentions' && styles.activeTab]}
        onPress={() => setActiveTab('mentions')}
      >
        <Text style={[styles.tabText, activeTab === 'mentions' && styles.activeTabText]}>
          Mentions
        </Text>
      </TouchableOpacity>
    </View>
  );

  const filteredNotifications = getFilteredNotifications();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <TabHeader />
      
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1DA1F2']}
            tintColor="#1DA1F2"
            title="Đang tải thông báo..."
            titleColor="#657786"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="bell-slash" size={48} color="#657786" />
            <Text style={styles.emptyTitle}>Không có thông báo</Text>
            <Text style={styles.emptyDescription}>
              Khi có thông báo mới, chúng sẽ hiển thị ở đây.
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome5 name="feather-alt" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f7f9fa', 
    paddingTop: 40 
  },
  
  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
   headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20
  },

  // Tabs styles
  tabs: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e1e8ed', 
    backgroundColor: 'white' 
  },
  tab: { 
    flex: 1, 
    padding: 16, 
    alignItems: 'center' 
  },
  activeTab: { 
    borderBottomWidth: 3, 
    borderBottomColor: '#1DA1F2' 
  },
  tabText: { 
    fontSize: 16, 
    color: '#657786' 
  },
  activeTabText: { 
    color: '#000', 
    fontWeight: 'bold' 
  },

  // Notification styles
  notification: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    backgroundColor: 'white'
  },
  unreadNotification: {
    backgroundColor: '#f0f8ff'
  },
  notificationLeft: {
    marginRight: 12,
    alignItems: 'center'
  },
  iconContainer: {
    marginBottom: 8
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white'
  },
  notificationContent: {
    flex: 1
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  notificationText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20
  },
  usersText: {
    fontWeight: 'bold',
    color: '#000'
  },
  actionText: {
    color: '#657786'
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8
  },
  suggestedIcon: {
    marginRight: 4
  },
  timeText: {
    fontSize: 14,
    color: '#657786'
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1DA1F2',
    marginLeft: 8
  },
  postPreview: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f7f9fa',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#1DA1F2'
  },
  postContent: {
    fontSize: 14,
    color: '#000',
    lineHeight: 18
  },

  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    textAlign: 'center'
  },
  emptyDescription: {
    fontSize: 16,
    color: '#657786',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22
  },

  // FAB styles
  fab: { 
    position: 'absolute', 
    bottom: 80, 
    right: 20, 
    width: 56, 
    height: 56, 
    borderRadius: 28, 
    backgroundColor: '#1DA1F2', 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  }
});

export default NotificationScreen;
