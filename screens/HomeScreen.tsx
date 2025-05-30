import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const tweets = [
  { id: '1', name: 'Elon Musk', username: 'elonmusk', content: 'Coding is magic.', time: '2h', likes: 4523, retweets: 1203, comments: 432 },
  { id: '2', name: 'Bill Gates', username: 'BillGates', content: 'AI must be developed responsibly.', time: '5h', likes: 7892, retweets: 2341, comments: 876 },
];

const trends = [
  { id: '1', title: '#TechNews', tweets: '125K Tweets' },
  { id: '2', title: 'Artificial Intelligence', tweets: 'Trending in Technology' },
];

const HomeScreen = () => {
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={24} color="white" />
        </View>
        <Text style={styles.headerTitle}>Twitter</Text>
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

      {/* Tweets */}
      <FlatList
        data={tweets}
        renderItem={renderTweet}
        keyExtractor={(item) => item.id}
        style={styles.tweetsList}
      />

      {/* Trending Section */}
      <View style={styles.trending}>
        <Text style={styles.trendingTitle}>Trends for you</Text>
        <FlatList
          data={trends}
          renderItem={renderTrend}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity>
          <FontAwesome name="home" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="search" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="bell" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="envelope" size={24} color="gray" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1DA1F2', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1DA1F2' },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e1e8ed' },
  tab: { flex: 1, padding: 16, alignItems: 'center' },
  activeTab: { borderBottomWidth: 3, borderBottomColor: '#1DA1F2' },
  tabText: { fontSize: 16, color: '#657786' },
  tweetBox: { flexDirection: 'row', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e1e8ed' },
  tweetInput: { flex: 1, fontSize: 16, paddingHorizontal: 8 },
  tweetsList: { flex: 1 },
  tweet: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e1e8ed', backgroundColor: 'white' },
  tweetContent: { flex: 1 },
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
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#e1e8ed' },
});

export default HomeScreen;
