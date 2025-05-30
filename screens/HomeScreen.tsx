import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Modal, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const tweets = [
  { id: '1', name: 'Elon Musk', username: 'elonmusk', content: 'Coding is magic.', time: '2h', likes: 4523, retweets: 1203, comments: 432 },
  { id: '2', name: 'Bill Gates', username: 'BillGates', content: 'AI must be developed responsibly.', time: '5h', likes: 7892, retweets: 2341, comments: 876 },
  { id: '3', name: 'Tim Cook', username: 'tim_cook', content: 'Innovation is in our DNA.', time: '8h', likes: 3421, retweets: 892, comments: 234 },
  { id: '4', name: 'Satya Nadella', username: 'satyanadella', content: 'Technology should empower everyone.', time: '12h', likes: 2156, retweets: 567, comments: 189 },
  { id: '5', name: 'Jeff Bezos', username: 'JeffBezos', content: 'Customer obsession is everything.', time: '15h', likes: 5432, retweets: 1876, comments: 543 },
  { id: '6', name: 'Mark Zuckerberg', username: 'zuck', content: 'Building the metaverse, one step at a time.', time: '18h', likes: 3210, retweets: 987, comments: 321 },
  { id: '7', name: 'Sundar Pichai', username: 'sundarpichai', content: 'AI will benefit humanity.', time: '20h', likes: 2987, retweets: 654, comments: 198 },
  { id: '8', name: 'Jack Dorsey', username: 'jack', content: 'Decentralization is the future.', time: '1d', likes: 4165, retweets: 1432, comments: 567 },
  { id: '9', name: 'Reed Hastings', username: 'reedhastings', content: 'Content is king, but distribution is queen.', time: '1d', likes: 1876, retweets: 432, comments: 156 },
  { id: '10', name: 'Jensen Huang', username: 'JenHsun', content: 'The AI revolution is just beginning.', time: '1d', likes: 3654, retweets: 998, comments: 287 },
  { id: '11', name: 'Lisa Su', username: 'LisaSu_AMD', content: 'High performance computing for everyone.', time: '2d', likes: 2543, retweets: 765, comments: 198 },
  { id: '12', name: 'Dara Khosrowshahi', username: 'dkhos', content: 'Transportation is evolving rapidly.', time: '2d', likes: 1987, retweets: 543, comments: 123 },
  { id: '13', name: 'Patrick Collison', username: 'patrickc', content: 'Building infrastructure for the internet economy.', time: '2d', likes: 2876, retweets: 687, comments: 234 },
  { id: '14', name: 'Brian Chesky', username: 'bchesky', content: 'Belong anywhere. Travel is back!', time: '3d', likes: 4321, retweets: 1234, comments: 456 },
  { id: '15', name: 'Daniel Ek', username: 'eldsjal', content: 'Music connects us all.', time: '3d', likes: 3165, retweets: 876, comments: 298 }
];

const trends = [
  { id: '1', title: '#TechNews', tweets: '125K Tweets' },
  { id: '2', title: 'Artificial Intelligence', tweets: 'Trending in Technology' },
  { id: '3', title: '#MachineLearning', tweets: '89K Tweets' },
  { id: '4', title: 'React Native', tweets: 'Trending in Programming' },
  { id: '5', title: '#CloudComputing', tweets: '67K Tweets' }
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newTweetText, setNewTweetText] = useState('');
  const [tweetList, setTweetList] = useState(tweets);

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
      comments: 0
    };

    setTweetList([newTweet, ...tweetList]);
    setNewTweetText('');
    setModalVisible(false);
    Alert.alert('Thành công', 'Tweet đã được đăng!');
  };

  const renderTweet = ({ item }) => (
    <View style={styles.tweet}>
      <View style={styles.avatar}>
        <FontAwesome name="user" size={24} color="white" />
      </View>
      <View style={styles.tweetContent}>
        <Text style={styles.tweetHeader}>
          <Text style={styles.tweetName}>{item.name}</Text> @{item.username} · {item.time}
        </Text>
        <Text style={styles.tweetText}>{item.content}</Text>
        <View style={styles.tweetActions}>
          <TouchableOpacity style={styles.action}>
            <FontAwesome5 name="comment" size={16} color="gray" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <FontAwesome5 name="retweet" size={16} color="gray" />
            <Text style={styles.actionText}>{item.retweets}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action}>
            <FontAwesome name="heart" size={16} color="gray" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTrend = ({ item }) => (
    <View style={styles.trend}>
      <Text style={styles.trendTweets}>{item.tweets}</Text>
      <Text style={styles.trendTitle}>{item.title}</Text>
    </View>
  );

  const ListHeaderComponent = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={24} color="white" />
        </View>
        <Text style={styles.headerTitle}>Twitter Clone</Text>
        <FontAwesome name="cog" size={24} color="gray" />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>For you</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Following</Text>
        </TouchableOpacity>
      </View>

      {/* Tweet Box */}
      <View style={styles.tweetBox}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={24} color="white" />
        </View>
        <TextInput
          style={styles.tweetInput}
          placeholder="What's happening?"
          multiline
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tweetList}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
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
            {/* Modal Header */}
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

            {/* Modal Body */}
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

            {/* Character Counter */}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fa',paddingTop: 40 },
  flatList: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1DA1F2' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e1e8ed', backgroundColor: 'white' },
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#1DA1F2' },
  tabText: { fontSize: 16, color: '#657786' },
  tweetBox: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e1e8ed' },
  tweetInput: { flex: 1, fontSize: 16, paddingHorizontal: 8 },
  tweet: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e1e8ed', backgroundColor: 'white' },
  tweetContent: { flex: 1, marginLeft: 12 },
  tweetHeader: { fontSize: 14, color: '#657786' },
  tweetName: { fontWeight: 'bold', color: '#000' },
  tweetText: { marginVertical: 8, fontSize: 16 },
  tweetActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  action: { flexDirection: 'row', alignItems: 'center' },
  actionText: { marginLeft: 4, fontSize: 14, color: 'gray' },
  trending: { padding: 16, backgroundColor: '#f7f9fa' },
  trendingTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  trend: { paddingVertical: 8 },
  trendTweets: { fontSize: 14, color: '#657786' },
  trendTitle: { fontSize: 16, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 80, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e1e8ed' },

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
});

export default HomeScreen;
