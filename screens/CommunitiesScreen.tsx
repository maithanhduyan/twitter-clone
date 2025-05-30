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
  ScrollView,
  Modal
} from 'react-native';
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const mockCommunities = [
  {
    id: '1',
    name: 'The Design Sphere',
    category: 'Art',
    members: 15420,
    isJoined: true,
    isVerified: true,
    description: 'A community for designers and creative minds',
    avatar: '🎨'
  },
  {
    id: '2',
    name: 'Tech Innovators',
    category: 'Technology',
    members: 28300,
    isJoined: true,
    isVerified: false,
    description: 'Latest trends in technology and innovation',
    avatar: '💻'
  },
  {
    id: '3',
    name: 'Sports Central',
    category: 'Sports',
    members: 45600,
    isJoined: false,
    isVerified: true,
    description: 'All things sports and athletics',
    avatar: '⚽'
  },
  {
    id: '4',
    name: 'Book Lovers Club',
    category: 'Entertainment',
    members: 12100,
    isJoined: true,
    isVerified: false,
    description: 'Share your favorite reads and discoveries',
    avatar: '📚'
  }
];

const mockPosts = [
  {
    id: '1',
    communityId: '1',
    communityName: 'The Design Sphere',
    author: 'Knightly Legends',
    username: 'Knightly',
    isVerified: true,
    content: '"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs',
    time: '2h',
    likes: 433,
    retweets: 94,
    comments: 65,
    views: 724000,
    hasImage: true,
    isLiked: false,
    isRetweeted: false,
    isBookmarked: false
  },
  {
    id: '2',
    communityId: '2',
    communityName: 'Tech Innovators',
    author: 'AI Research Hub',
    username: 'AIResearch',
    isVerified: false,
    content: 'New breakthrough in quantum computing! The future of processing power is here.',
    time: '4h',
    likes: 256,
    retweets: 78,
    comments: 32,
    views: 156000,
    hasImage: false,
    isLiked: true,
    isRetweeted: false,
    isBookmarked: true
  },
  {
    id: '3',
    communityId: '4',
    communityName: 'Book Lovers Club',
    author: 'Literary Mind',
    username: 'BookWorm2024',
    isVerified: false,
    content: 'Just finished "Atomic Habits" - absolutely life-changing! What books have transformed your thinking?',
    time: '6h',
    likes: 189,
    retweets: 45,
    comments: 87,
    views: 89000,
    hasImage: false,
    isLiked: false,
    isRetweeted: true,
    isBookmarked: false
  }
];

const categories = [
  { id: 'all', name: 'All', icon: '🌟' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'art', name: 'Art', icon: '🎨' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'music', name: 'Music', icon: '🎵' }
];

const CommunitiesScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [communities, setCommunities] = useState(mockCommunities);
  const [posts, setPosts] = useState(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Thành công', 'Đã cập nhật cộng đồng!');
    }, 1500);
  };

  const handleJoinCommunity = (communityId) => {
    setCommunities(prev => 
      prev.map(community => 
        community.id === communityId 
          ? { ...community, isJoined: !community.isJoined }
          : community
      )
    );
    
    const community = communities.find(c => c.id === communityId);
    Alert.alert(
      'Thành công', 
      community?.isJoined ? `Đã rời khỏi ${community.name}` : `Đã tham gia ${community.name}`
    );
  };

  const handlePostAction = (postId, action) => {
    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          switch (action) {
            case 'like':
              return {
                ...post,
                isLiked: !post.isLiked,
                likes: post.isLiked ? post.likes - 1 : post.likes + 1
              };
            case 'retweet':
              return {
                ...post,
                isRetweeted: !post.isRetweeted,
                retweets: post.isRetweeted ? post.retweets - 1 : post.retweets + 1
              };
            case 'bookmark':
              return {
                ...post,
                isBookmarked: !post.isBookmarked
              };
            default:
              return post;
          }
        }
        return post;
      })
    );
  };

  const handleMenuAction = (action) => {
    setMenuVisible(false);
    
    switch (action) {
      case 'create':
        Alert.alert('Tạo cộng đồng', 'Tính năng tạo cộng đồng mới');
        break;
      case 'joined':
        Alert.alert('Cộng đồng đã tham gia', 'Hiển thị danh sách cộng đồng đã tham gia');
        break;
      case 'manage':
        Alert.alert('Quản lý', 'Tính năng quản lý cộng đồng (Admin/Mod)');
        break;
      default:
        break;
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getFilteredPosts = () => {
    if (activeCategory === 'all') return posts;
    return posts.filter(post => {
      const community = communities.find(c => c.id === post.communityId);
      return community?.category.toLowerCase() === activeCategory;
    });
  };

  const CustomHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Communities</Text>
      <View style={styles.headerActions}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setSearchVisible(true)}
        >
          <FontAwesome name="search" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={() => setMenuVisible(true)}
        >
          <MaterialIcons name="more-horiz" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const CategoryTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryTab,
            activeCategory === category.id && styles.activeCategoryTab
          ]}
          onPress={() => setActiveCategory(category.id)}
        >
          <Text style={[
            styles.categoryIcon,
            activeCategory === category.id && styles.activeCategoryIcon
          ]}>
            {category.icon}
          </Text>
          <Text style={[
            styles.categoryText,
            activeCategory === category.id && styles.activeCategoryText
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <View style={styles.communityHeader}>
        <View style={styles.communityInfo}>
          <View style={styles.communityAvatar}>
            <Text style={styles.communityAvatarText}>
              {communities.find(c => c.id === item.communityId)?.avatar || '👥'}
            </Text>
          </View>
          <Text style={styles.communityName}>{item.communityName}</Text>
        </View>
      </View>

      <View style={styles.postContent}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}>
            <FontAwesome name="user" size={16} color="white" />
          </View>
          <View style={styles.postHeaderInfo}>
            <View style={styles.postHeaderRow}>
              <Text style={styles.authorName}>{item.author}</Text>
              {item.isVerified && (
                <FontAwesome name="check-circle" size={14} color="#1DA1F2" style={styles.verifiedIcon} />
              )}
              <Text style={styles.username}>@{item.username}</Text>
              <Text style={styles.postTime}>·{item.time}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.postText}>{item.content}</Text>

        {item.hasImage && (
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <FontAwesome5 name="image" size={40} color="#657786" />
              <Text style={styles.imagePlaceholderText}>Design Artwork</Text>
            </View>
          </View>
        )}

        <View style={styles.postActions}>
          <TouchableOpacity 
            style={styles.action}
            onPress={() => Alert.alert('Trả lời', `Trả lời bài viết của ${item.author}`)}
          >
            <FontAwesome5 name="comment" size={16} color="#657786" />
            <Text style={styles.actionText}>{formatNumber(item.comments)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.action, item.isRetweeted && styles.activeRetweet]}
            onPress={() => handlePostAction(item.id, 'retweet')}
          >
            <FontAwesome5 name="retweet" size={16} color={item.isRetweeted ? "#00ba7c" : "#657786"} />
            <Text style={[styles.actionText, item.isRetweeted && styles.activeRetweetText]}>
              {formatNumber(item.retweets)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.action, item.isLiked && styles.activeLike]}
            onPress={() => handlePostAction(item.id, 'like')}
          >
            <FontAwesome name={item.isLiked ? "heart" : "heart-o"} size={16} color={item.isLiked ? "#e74c3c" : "#657786"} />
            <Text style={[styles.actionText, item.isLiked && styles.activeLikeText]}>
              {formatNumber(item.likes)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action}>
            <FontAwesome5 name="eye" size={16} color="#657786" />
            <Text style={styles.actionText}>{formatNumber(item.views)}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.action}
            onPress={() => handlePostAction(item.id, 'bookmark')}
          >
            <FontAwesome name={item.isBookmarked ? "bookmark" : "bookmark-o"} size={16} color={item.isBookmarked ? "#1DA1F2" : "#657786"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const MenuModal = () => (
    <Modal
      visible={menuVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setMenuVisible(false)}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        onPress={() => setMenuVisible(false)}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('create')}
          >
            <FontAwesome5 name="plus-circle" size={20} color="#1DA1F2" />
            <Text style={styles.menuText}>Tạo cộng đồng</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('joined')}
          >
            <FontAwesome5 name="users" size={20} color="#1DA1F2" />
            <Text style={styles.menuText}>Cộng đồng đã tham gia</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => handleMenuAction('manage')}
          >
            <FontAwesome5 name="cog" size={20} color="#1DA1F2" />
            <Text style={styles.menuText}>Quản lý vai trò</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );

  const filteredPosts = getFilteredPosts();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <CategoryTabs />
      
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1DA1F2']}
            tintColor="#1DA1F2"
            title="Đang tải cộng đồng..."
            titleColor="#657786"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <FontAwesome5 name="users" size={48} color="#657786" />
            <Text style={styles.emptyTitle}>Không có bài viết</Text>
            <Text style={styles.emptyDescription}>
              Hãy tham gia các cộng đồng để xem nội dung thú vị!
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Khám phá cộng đồng</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <MenuModal />

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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20
  },

  // Categories styles
  categoriesContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed'
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f7f9fa',
    borderWidth: 1,
    borderColor: '#e1e8ed'
  },
  activeCategoryTab: {
    backgroundColor: '#1DA1F2',
    borderColor: '#1DA1F2'
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6
  },
  activeCategoryIcon: {
    color: 'white'
  },
  categoryText: {
    fontSize: 14,
    color: '#657786',
    fontWeight: '500'
  },
  activeCategoryText: {
    color: 'white',
    fontWeight: 'bold'
  },

  // Post styles
  post: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed'
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8
  },
  communityInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  communityAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f7f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  communityAvatarText: {
    fontSize: 14
  },
  communityName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1DA1F2'
  },
  postContent: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  avatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#1DA1F2', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  postHeaderInfo: {
    flex: 1,
    marginLeft: 12
  },
  postHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  authorName: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 15
  },
  verifiedIcon: {
    marginLeft: 4
  },
  username: {
    color: '#657786',
    fontSize: 15,
    marginLeft: 4
  },
  postTime: {
    color: '#657786',
    fontSize: 15,
    marginLeft: 4
  },
  postText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#000',
    marginBottom: 12
  },
  imageContainer: {
    marginBottom: 12
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#f7f9fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e8ed'
  },
  imagePlaceholderText: {
    color: '#657786',
    marginTop: 8,
    fontSize: 14
  },
  postActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    paddingRight: 20
  },
  action: { 
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 8,
    borderRadius: 20
  },
  actionText: { 
    marginLeft: 4, 
    fontSize: 14, 
    color: '#657786' 
  },
  activeLike: {
    backgroundColor: '#ffeaa7'
  },
  activeLikeText: {
    color: '#e74c3c'
  },
  activeRetweet: {
    backgroundColor: '#d1f2eb'
  },
  activeRetweetText: {
    color: '#00ba7c'
  },

  // Menu modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 16
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  menuText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12
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
  exploreButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 24
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
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

export default CommunitiesScreen;
