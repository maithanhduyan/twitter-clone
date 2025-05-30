import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Modal, Alert, Image, RefreshControl } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Header from '../components/Header';
import TweetMenu from '../components/TweetMenu';

// Define interfaces
interface Tweet {
  id: string;
  name: string;
  username: string;
  content: string;
  time: string;
  likes: number;
  retweets: number;
  comments: number;
  views: number;
  isFollowed: boolean;
  isLiked: boolean;
  isRetweeted: boolean;
  isBookmarked: boolean;
  quotedTweet?: {
    name: string;
    username: string;
    content: string;
  };
}

interface Trend {
  id: string;
  title: string;
  tweets: string;
}

const tweets: Tweet[] = [
  { id: '1', name: 'Elon Musk', username: 'elonmusk', content: 'Coding is magic.', time: '2h', likes: 4523, retweets: 1203, comments: 432, views: 125000, isFollowed: true, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: '2', name: 'Bill Gates', username: 'BillGates', content: 'AI must be developed responsibly.', time: '5h', likes: 7892, retweets: 2341, comments: 876, views: 198000, isFollowed: true, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: '3', name: 'Tim Cook', username: 'tim_cook', content: 'Innovation is in our DNA.', time: '8h', likes: 3421, retweets: 892, comments: 234, views: 87000, isFollowed: false, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: '4', name: 'Satya Nadella', username: 'satyanadella', content: 'Technology should empower everyone.', time: '12h', likes: 2156, retweets: 567, comments: 189, views: 65000, isFollowed: true, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: '5', name: 'Jeff Bezos', username: 'JeffBezos', content: 'Customer obsession is everything.', time: '15h', likes: 5432, retweets: 1876, comments: 543, views: 142000, isFollowed: false, isLiked: false, isRetweeted: false, isBookmarked: false },
];

// Sample new tweets for refresh simulation
const newTweetsData: Tweet[] = [
  { id: 'new1', name: 'OpenAI', username: 'OpenAI', content: 'GPT-4 is now available to everyone!', time: 'now', likes: 12000, retweets: 3500, comments: 890, views: 250000, isFollowed: false, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: 'new2', name: 'Meta', username: 'Meta', content: 'Introducing the next generation of VR technology.', time: '1m', likes: 8500, retweets: 2100, comments: 456, views: 180000, isFollowed: false, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: 'new3', name: 'Google', username: 'Google', content: 'Machine learning is transforming how we search.', time: '5m', likes: 6700, retweets: 1800, comments: 320, views: 150000, isFollowed: true, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: 'new4', name: 'Microsoft', username: 'Microsoft', content: 'Azure AI services now support 100+ languages.', time: '10m', likes: 4200, retweets: 1200, comments: 230, views: 95000, isFollowed: true, isLiked: false, isRetweeted: false, isBookmarked: false },
  { id: 'new5', name: 'Tesla', username: 'Tesla', content: 'Full self-driving update rolling out globally.', time: '15m', likes: 15000, retweets: 4500, comments: 1200, views: 300000, isFollowed: false, isLiked: false, isRetweeted: false, isBookmarked: false },
];

const trends: Trend[] = [
  { id: '1', title: '#TechNews', tweets: '125K Tweets' },
  { id: '2', title: 'Artificial Intelligence', tweets: 'Trending in Technology' },
  { id: '3', title: '#MachineLearning', tweets: '89K Tweets' },
  { id: '4', title: 'React Native', tweets: 'Trending in Programming' },
  { id: '5', title: '#CloudComputing', tweets: '67K Tweets' }
];

const HomeScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [retweetModalVisible, setRetweetModalVisible] = useState(false);
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [newTweetText, setNewTweetText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [quoteText, setQuoteText] = useState('');  const [tweetList, setTweetList] = useState<Tweet[]>(tweets);
  const [activeTab, setActiveTab] = useState<'forYou' | 'following'>('forYou');
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [selectedTweet, setSelectedTweet] = useState<Tweet | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  // Simulate fetching new tweets
  const fetchNewTweets = (): Promise<Tweet[]> => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        // Get random number of new tweets (1-3)
        const numberOfNewTweets = Math.floor(Math.random() * 3) + 1;
        const selectedNewTweets = newTweetsData
          .slice(0, numberOfNewTweets)
          .map(tweet => ({
            ...tweet,
            id: `${tweet.id}_${Date.now()}`, // Make IDs unique
            time: Math.random() > 0.5 ? 'now' : `${Math.floor(Math.random() * 5) + 1}m`
          }));
        resolve(selectedNewTweets);
      }, 1500); // 1.5 second delay to simulate network request
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const newTweets = await fetchNewTweets();
      setTweetList(prevTweets => [...newTweets, ...prevTweets]);
      
      // Show success message
      if (newTweets.length > 0) {
        Alert.alert(
          'Cập nhật thành công', 
          `Đã tải ${newTweets.length} tweet mới!`,
          [{ text: 'OK' }],
          { cancelable: true }
        );
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tải tweets mới. Vui lòng thử lại.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleCreateTweet = () => {
    if (newTweetText.trim().length === 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung tweet');
      return;
    }

    if (newTweetText.length > 280) {
      Alert.alert('Lỗi', 'Tweet không được vượt quá 280 ký tự');
      return;
    }

    const newTweet = {
      id: Date.now().toString(),
      name: 'You',
      username: 'yourhandle',
      content: newTweetText.trim(),
      time: 'now',
      likes: 0,
      retweets: 0,
      comments: 0,
      views: 0,
      isFollowed: false,
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false
    };

    setTweetList([newTweet, ...tweetList]);
    setNewTweetText('');
    setModalVisible(false);
    Alert.alert('Thành công', 'Tweet đã được đăng!');
  };

  const getDisplayTweets = () => {
    if (activeTab === 'following') {
      const followingTweets = tweetList.filter(tweet => tweet.isFollowed || tweet.username === 'yourhandle');
      return followingTweets.length > 0 ? followingTweets : [];
    }
    return tweetList;
  };

  const handleMenuPress = (tweetId: string): void => {
    setMenuVisible(menuVisible === tweetId ? null : tweetId);
  };

  const handleFollowToggle = (tweetId: string): void => {
    setTweetList(prevTweets => 
      prevTweets.map(tweet => 
        tweet.id === tweetId 
          ? { ...tweet, isFollowed: !tweet.isFollowed }
          : tweet
      )
    );
    setMenuVisible(null);
      const tweet = tweetList.find(t => t.id === tweetId);
    Alert.alert(
      'Thành công', 
      tweet ? (tweet.isFollowed ? `Đã bỏ theo dõi ${tweet.name}` : `Đã theo dõi ${tweet.name}`) : 'Không tìm thấy tweet'
    );
  };

  const handleMenuAction = (action: string, tweet: Tweet): void => {
    setMenuVisible(null);
    
    switch (action) {
      case 'follow':
        handleFollowToggle(tweet.id);
        break;
      case 'notInterested':
        Alert.alert('Thông báo', 'Đã đánh dấu không quan tâm bài viết này');
        break;
      case 'mute':
        Alert.alert('Thông báo', `Đã tắt tiếng ${tweet.name}`);
        break;
      case 'block':
        Alert.alert('Thông báo', `Đã chặn ${tweet.name}`);
        break;
      case 'report':
        Alert.alert('Thông báo', 'Đã báo cáo bài viết');
        break;
      case 'copyLink':
        Alert.alert('Thông báo', 'Đã sao chép liên kết');
        break;
      case 'embed':
        Alert.alert('Thông báo', 'Đã sao chép mã nhúng');
        break;
      default:
        break;
    }
  };

  // Tweet Action Handlers
  const handleReply = (tweet: Tweet): void => {
    setSelectedTweet(tweet);
    setReplyModalVisible(true);
  };
  const handleSubmitReply = (): void => {
    if (replyText.trim().length === 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung phản hồi');
      return;
    }

    if (!selectedTweet) {
      Alert.alert('Lỗi', 'Không tìm thấy tweet để trả lời');
      return;
    }

    // Update comment count
    setTweetList(prevTweets => 
      prevTweets.map(tweet => 
        tweet.id === selectedTweet.id 
          ? { ...tweet, comments: tweet.comments + 1 }
          : tweet
      )
    );

    setReplyText('');
    setReplyModalVisible(false);
    Alert.alert('Thành công', 'Đã gửi phản hồi!');
  };

  const handleRetweet = (tweet: Tweet): void => {
    setSelectedTweet(tweet);
    setRetweetModalVisible(true);
  };
  const handleSimpleRetweet = (): void => {
    if (!selectedTweet) {
      Alert.alert('Lỗi', 'Không tìm thấy tweet để retweet');
      return;
    }

    setTweetList(prevTweets => 
      prevTweets.map(tweet => 
        tweet.id === selectedTweet.id 
          ? { 
              ...tweet, 
              isRetweeted: !tweet.isRetweeted,
              retweets: tweet.isRetweeted ? tweet.retweets - 1 : tweet.retweets + 1
            }
          : tweet
      )
    );
    setRetweetModalVisible(false);
    Alert.alert('Thành công', selectedTweet.isRetweeted ? 'Đã hủy retweet' : 'Đã retweet!');
  };
  const handleQuoteTweet = (): void => {
    if (quoteText.trim().length === 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung quote tweet');
      return;
    }

    if (!selectedTweet) {
      Alert.alert('Lỗi', 'Không tìm thấy tweet để quote');
      return;
    }

    const quoteTweet: Tweet = {
      id: Date.now().toString(),
      name: 'You',
      username: 'yourhandle',
      content: quoteText.trim(),
      time: 'now',
      likes: 0,
      retweets: 0,
      comments: 0,
      views: 0,
      isFollowed: false,
      isLiked: false,
      isRetweeted: false,
      isBookmarked: false,
      quotedTweet: {
        name: selectedTweet.name,
        username: selectedTweet.username,
        content: selectedTweet.content
      }
    };

    setTweetList([quoteTweet, ...tweetList]);
    setQuoteText('');
    setRetweetModalVisible(false);
    Alert.alert('Thành công', 'Đã đăng quote tweet!');
  };

  const handleLike = (tweet: Tweet): void => {
    setTweetList(prevTweets => 
      prevTweets.map(t => 
        t.id === tweet.id 
          ? { 
              ...t, 
              isLiked: !t.isLiked,
              likes: t.isLiked ? t.likes - 1 : t.likes + 1
            }
          : t
      )
    );
  };

  const handleShare = (tweet: any) => {
    setSelectedTweet(tweet);
    setShareModalVisible(true);
  };

  const handleShareAction = (action: string) => {
    setShareModalVisible(false);
    
    switch (action) {
      case 'message':
        Alert.alert('Thông báo', 'Đã gửi qua tin nhắn');
        break;
      case 'copy':
        Alert.alert('Thông báo', 'Đã sao chép liên kết');
        break;
      case 'email':
        Alert.alert('Thông báo', 'Đã mở ứng dụng email');
        break;
      case 'bookmark':
        setTweetList(prevTweets => 
          prevTweets.map(tweet => 
            tweet.id === selectedTweet?.id 
              ? { ...tweet, isBookmarked: !tweet.isBookmarked }
              : tweet
          )
        );
        Alert.alert('Thành công', selectedTweet?.isBookmarked ? 'Đã bỏ bookmark' : 'Đã bookmark!');
        break;
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const renderTweet = ({ item }: { item: Tweet }) => (
    <View style={styles.tweet}>
      <View style={styles.avatar}>
        <FontAwesome name="user" size={24} color="white" />
      </View>
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeaderRow}>
          <View style={styles.tweetHeaderLeft}>
            <Text style={styles.tweetHeader}>
              <Text style={styles.tweetName}>{item.name}</Text> @{item.username} · {item.time}
            </Text>
            {item.isFollowed && activeTab === 'forYou' && (
              <View style={styles.followingBadge}>
                <FontAwesome name="check" size={10} color="#1DA1F2" />
                <Text style={styles.followingBadgeText}>Following</Text>
              </View>
            )}
          </View>
          <View style={styles.tweetHeaderRight}>
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={() => handleMenuPress(item.id)}
            >
              <FontAwesome name="ellipsis-h" size={16} color="#657786" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.tweetText}>{item.content}</Text>
        
        {/* Quoted Tweet */}
        {item.quotedTweet && (
          <View style={styles.quotedTweet}>
            <Text style={styles.quotedTweetHeader}>
              <Text style={styles.quotedTweetName}>{item.quotedTweet.name}</Text> @{item.quotedTweet.username}
            </Text>
            <Text style={styles.quotedTweetText}>{item.quotedTweet.content}</Text>
          </View>
        )}
        
        <View style={styles.tweetActions}>
          {/* Reply */
          /* <TouchableOpacity 
            style={styles.action}
            onPress={() => handleReply(item)}
          >
            <FontAwesome5 name="comment" size={16} color="#657786" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity> */}
          
          {/* Retweet */}
          <TouchableOpacity 
            style={styles.action}
            onPress={() => handleRetweet(item)}
          >
            <FontAwesome5 
              name="retweet" 
              size={16} 
              color={item.isRetweeted ? "#00ba7c" : "#657786"} 
            />
            <Text style={[styles.actionText, { color: item.isRetweeted ? "#00ba7c" : "#657786" }]}>
              {item.retweets}
            </Text>
          </TouchableOpacity>
          
          {/* Like */}
          <TouchableOpacity 
            style={styles.action}
            onPress={() => handleLike(item)}
          >
            <FontAwesome 
              name={item.isLiked ? "heart" : "heart-o"} 
              size={16} 
              color={item.isLiked ? "#e74c3c" : "#657786"} 
            />
            <Text style={[styles.actionText, { color: item.isLiked ? "#e74c3c" : "#657786" }]}>
              {item.likes}
            </Text>
          </TouchableOpacity>
          
          {/* Views */}
          <TouchableOpacity style={styles.action}>
            <FontAwesome5 name="chart-bar" size={16} color="#657786" />
            <Text style={styles.actionText}>{formatNumber(item.views)}</Text>
          </TouchableOpacity>
          
          {/* Share */}
          <TouchableOpacity 
            style={styles.action}
            onPress={() => handleShare(item)}
          >
            <FontAwesome5 name="share" size={16} color="#657786" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Menu Modal */}
      {menuVisible === item.id && (
        <Modal
          transparent={true}
          visible={true}
          animationType="fade"
          onRequestClose={() => setMenuVisible(null)}
        >
          <TweetMenu
            tweet={item}
            onMenuAction={handleMenuAction}
            onClose={() => setMenuVisible(null)}
          />
        </Modal>
      )}
    </View>
  );

  const renderEmptyFollowing = () => (
    <View style={styles.emptyContainer}>
      <FontAwesome5 name="user-friends" size={48} color="#657786" />
      <Text style={styles.emptyTitle}>Welcome to your timeline!</Text>
      <Text style={styles.emptyDescription}>
        When you follow people, you'll see their Tweets here.
      </Text>
      <TouchableOpacity style={styles.exploreButton} onPress={() => setActiveTab('forYou')}>
        <Text style={styles.exploreButtonText}>Find people to follow</Text>
      </TouchableOpacity>
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      <Header/>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'forYou' && styles.activeTab]}
          onPress={() => setActiveTab('forYou')}
        >
          <Text style={[styles.tabText, activeTab === 'forYou' && styles.activeTabText]}>
            For you
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'following' && styles.activeTab]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'forYou' && (
        <View style={styles.tweetBox}>
          <View style={styles.avatar}>
            <FontAwesome name="user" size={24} color="white" />
          </View>
          <TextInput
            style={styles.tweetInput}
            placeholder="What's happening?"
            multiline
            onFocus={() => setModalVisible(true)}
          />
        </View>
      )}
    </>
  );

  const displayTweets = getDisplayTweets();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={displayTweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={activeTab === 'following' ? renderEmptyFollowing : null}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
        contentContainerStyle={displayTweets.length === 0 ? styles.emptyListContainer : {}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1DA1F2']} // Android
            tintColor="#1DA1F2" // iOS
            title="Đang tải tweets mới..." // iOS
            titleColor="#657786" // iOS
          />
        }
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome5 name="feather-alt" size={24} color="white" />
      </TouchableOpacity>

      {/* Tweet Creation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Hủy</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Tạo Tweet</Text>
              <TouchableOpacity
                onPress={handleCreateTweet}
                style={[
                  styles.tweetButton,
                  { opacity: newTweetText.trim().length > 0 ? 1 : 0.5 }
                ]}
                disabled={newTweetText.trim().length === 0}
              >
                <Text style={styles.tweetButtonText}>Tweet</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.avatar}>
                <FontAwesome name="user" size={24} color="white" />
              </View>
              <TextInput
                style={styles.modalTextInput}
                placeholder="What's happening?"
                multiline
                value={newTweetText}
                onChangeText={setNewTweetText}
                maxLength={280}
                autoFocus
              />
            </View>

            <View style={styles.modalFooter}>
              <Text style={[
                styles.characterCounter,
                { color: newTweetText.length > 260 ? 'red' : '#657786' }
              ]}>
                {newTweetText.length}/280
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reply Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={replyModalVisible}
        onRequestClose={() => setReplyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setReplyModalVisible(false)}>
                <Text style={styles.cancelButton}>Hủy</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Trả lời</Text>
              <TouchableOpacity
                onPress={handleSubmitReply}
                style={[
                  styles.tweetButton,
                  { opacity: replyText.trim().length > 0 ? 1 : 0.5 }
                ]}
                disabled={replyText.trim().length === 0}
              >
                <Text style={styles.tweetButtonText}>Trả lời</Text>
              </TouchableOpacity>
            </View>

            {selectedTweet && (
              <View style={styles.originalTweet}>
                <Text style={styles.originalTweetHeader}>
                  Trả lời cho <Text style={styles.originalTweetName}>@{selectedTweet.username}</Text>
                </Text>
                <Text style={styles.originalTweetContent}>{selectedTweet.content}</Text>
              </View>
            )}

            <View style={styles.modalBody}>
              <View style={styles.avatar}>
                <FontAwesome name="user" size={24} color="white" />
              </View>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Tweet your reply"
                multiline
                value={replyText}
                onChangeText={setReplyText}
                maxLength={280}
                autoFocus
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Retweet Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={retweetModalVisible}
        onRequestClose={() => setRetweetModalVisible(false)}
      >
        <View style={styles.menuOverlay}>
          <TouchableOpacity 
            style={styles.menuBackdrop} 
            onPress={() => setRetweetModalVisible(false)}
          />
          <View style={styles.retweetMenuContainer}>
            <TouchableOpacity 
              style={styles.retweetMenuItem}
              onPress={handleSimpleRetweet}
            >
              <FontAwesome5 name="retweet" size={20} color="#657786" />
              <Text style={styles.retweetMenuText}>
                {selectedTweet?.isRetweeted ? 'Hủy Retweet' : 'Retweet'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.retweetMenuItem}
              onPress={() => {
                setRetweetModalVisible(false);
                setTimeout(() => setModalVisible(true), 100);
              }}
            >
              <FontAwesome5 name="edit" size={20} color="#657786" />
              <Text style={styles.retweetMenuText}>Quote Tweet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Share Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={shareModalVisible}
        onRequestClose={() => setShareModalVisible(false)}
      >
        <View style={styles.menuOverlay}>
          <TouchableOpacity 
            style={styles.menuBackdrop} 
            onPress={() => setShareModalVisible(false)}
          />
          <View style={styles.shareMenuContainer}>
            <TouchableOpacity 
              style={styles.shareMenuItem}
              onPress={() => handleShareAction('message')}
            >
              <FontAwesome5 name="envelope" size={20} color="#657786" />
              <Text style={styles.shareMenuText}>Gửi qua tin nhắn</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.shareMenuItem}
              onPress={() => handleShareAction('copy')}
            >
              <FontAwesome5 name="link" size={20} color="#657786" />
              <Text style={styles.shareMenuText}>Sao chép liên kết</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.shareMenuItem}
              onPress={() => handleShareAction('bookmark')}
            >
              <FontAwesome 
                name={selectedTweet?.isBookmarked ? "bookmark" : "bookmark-o"} 
                size={20} 
                color="#657786" 
              />
              <Text style={styles.shareMenuText}>
                {selectedTweet?.isBookmarked ? 'Bỏ bookmark' : 'Bookmark'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.shareMenuItem}
              onPress={() => handleShareAction('email')}
            >
              <FontAwesome5 name="at" size={20} color="#657786" />
              <Text style={styles.shareMenuText}>Chia sẻ qua Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fa', paddingTop: 40 },
  flatList: { flex: 1 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e1e8ed', backgroundColor: 'white' },
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#1DA1F2' },
  tabText: { fontSize: 16, color: '#657786' },
  activeTabText: { color: '#000', fontWeight: 'bold' },
  tweetBox: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e1e8ed' },
  tweetInput: { flex: 1, fontSize: 16, paddingHorizontal: 8 },
  tweet: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e1e8ed', backgroundColor: 'white' },
  tweetContent: { flex: 1, marginLeft: 12 },
  tweetHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start'
  },
  tweetHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tweetHeaderRight: {
    marginLeft: 8
  },
  tweetHeader: { fontSize: 14, color: '#657786', flex: 1 },
  tweetName: { fontWeight: 'bold', color: '#000' },
  followingBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#e8f5fd', 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 10,
    marginLeft: 8
  },
  followingBadgeText: { 
    fontSize: 10, 
    color: '#1DA1F2', 
    marginLeft: 2,
    fontWeight: '500'
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
  },
  tweetText: { marginVertical: 8, fontSize: 16 },
  quotedTweet: {
    borderWidth: 1,
    borderColor: '#e1e8ed',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#f7f9fa'
  },
  quotedTweetHeader: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 4
  },
  quotedTweetName: {
    fontWeight: 'bold',
    color: '#000'
  },
  quotedTweetText: {
    fontSize: 14,
    color: '#000'
  },
  tweetActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 8,
    paddingRight: 20
  },
  action: { 
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 8,
    borderRadius: 20
  },
  actionText: { marginLeft: 4, fontSize: 14, color: '#657786' },
  
  // Empty state styles
  emptyListContainer: { flexGrow: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
    backgroundColor: 'white'
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
  fab: { position: 'absolute', bottom: 80, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center', elevation: 5 },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    minHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  cancelButton: {
    fontSize: 16,
    color: '#1DA1F2',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  tweetButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tweetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalBody: {
    flexDirection: 'row',
    padding: 16,
    flex: 1,
  },
  modalTextInput: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
    textAlignVertical: 'top',
    maxHeight: 200,
  },
  modalFooter: {
    padding: 16,
    alignItems: 'flex-end',
  },
  characterCounter: {
    fontSize: 14,
  },
  originalTweet: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    backgroundColor: '#f7f9fa'
  },
  originalTweetHeader: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 4
  },
  originalTweetName: {
    fontWeight: 'bold',
    color: '#1DA1F2'
  },
  originalTweetContent: {
    fontSize: 16,
    color: '#000'
  },

  // Menu overlay styles
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  retweetMenuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  retweetMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  retweetMenuText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  shareMenuContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  shareMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  shareMenuText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
});

export default HomeScreen;
