import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  SafeAreaView, 
  Modal,
  Alert,
  ScrollView 
} from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// Sample trending data
const trendsData = [
  { id: '1', title: '#TechNews', category: 'Technology', tweets: '125K Tweets', isPromoted: false },
  { id: '2', title: 'Artificial Intelligence', category: 'Technology', tweets: '89.5K Tweets', isPromoted: false },
  { id: '3', title: '#MachineLearning', category: 'Programming', tweets: '67.2K Tweets', isPromoted: false },
  { id: '4', title: 'React Native', category: 'Programming', tweets: '45.8K Tweets', isPromoted: false },
  { id: '5', title: '#CloudComputing', category: 'Technology', tweets: '34.1K Tweets', isPromoted: false },
  { id: '6', title: 'ChatGPT', category: 'Technology', tweets: '156K Tweets', isPromoted: true },
  { id: '7', title: '#WebDevelopment', category: 'Programming', tweets: '23.7K Tweets', isPromoted: false },
  { id: '8', title: 'Blockchain', category: 'Technology', tweets: '78.3K Tweets', isPromoted: false },
];

// Sample search results data
const searchResultsData = {
  users: [
    { id: '1', name: 'Elon Musk', username: 'elonmusk', followers: '100M', verified: true, bio: 'CEO of Tesla and SpaceX' },
    { id: '2', name: 'Bill Gates', username: 'BillGates', followers: '60M', verified: true, bio: 'Co-chair of the Bill & Melinda Gates Foundation' },
    { id: '3', name: 'Tim Cook', username: 'tim_cook', followers: '15M', verified: true, bio: 'CEO of Apple' },
  ],
  tweets: [
    { id: '1', name: 'OpenAI', username: 'OpenAI', content: 'Introducing GPT-4: our most capable and aligned model yet', time: '2h', likes: 15420, retweets: 8900, verified: true },
    { id: '2', name: 'Google', username: 'Google', content: 'Machine learning is transforming how we understand and interact with information', time: '4h', likes: 9876, retweets: 4321, verified: true },
    { id: '3', name: 'Microsoft', username: 'Microsoft', content: 'Azure AI services now support 100+ languages for global accessibility', time: '6h', likes: 6543, retweets: 2109, verified: true },
  ]
};

// Location data
const locations = [
  { id: '1', name: 'Worldwide', country: 'Global' },
  { id: '2', name: 'Vietnam', country: 'Vietnam' },
  { id: '3', name: 'United States', country: 'United States' },
  { id: '4', name: 'Japan', country: 'Japan' },
  { id: '5', name: 'United Kingdom', country: 'United Kingdom' },
  { id: '6', name: 'South Korea', country: 'South Korea' },
  { id: '7', name: 'Singapore', country: 'Singapore' },
  { id: '8', name: 'Thailand', country: 'Thailand' },
];

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeSearchTab, setActiveSearchTab] = useState('top');
  const [trends, setTrends] = useState(trendsData);
  const [selectedLocation, setSelectedLocation] = useState('Vietnam');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState(searchResultsData);

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.trim().length > 0) {
      setIsSearching(true);
      // Simulate search API call
      setTimeout(() => {
        // In real app, you would fetch search results here
        console.log('Searching for:', text);
      }, 500);
    } else {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setIsSearching(false);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location.name);
    setLocationModalVisible(false);
    
    // Simulate fetching trends for new location
    Alert.alert(
      'Thành công', 
      `Đã thay đổi vị trí thành ${location.name}`,
      [{ text: 'OK' }]
    );
  };

  const renderTrendItem = ({ item }) => (
    <TouchableOpacity style={styles.trendItem}>
      <View style={styles.trendContent}>
        <Text style={styles.trendCategory}>{item.category} • Trending</Text>
        <Text style={styles.trendTitle}>{item.title}</Text>
        <Text style={styles.trendTweets}>{item.tweets}</Text>
      </View>
      <TouchableOpacity style={styles.trendMenu}>
        <FontAwesome name="ellipsis-h" size={16} color="#657786" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderUserResult = ({ item }) => (
    <TouchableOpacity style={styles.userResult}>
      <View style={styles.userAvatar}>
        <FontAwesome name="user" size={24} color="white" />
      </View>
      <View style={styles.userInfo}>
        <View style={styles.userNameRow}>
          <Text style={styles.userName}>{item.name}</Text>
          {item.verified && (
            <FontAwesome name="check-circle" size={16} color="#1DA1F2" style={styles.verifiedIcon} />
          )}
        </View>
        <Text style={styles.userHandle}>@{item.username}</Text>
        <Text style={styles.userBio}>{item.bio}</Text>
        <Text style={styles.userFollowers}>{item.followers} followers</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderTweetResult = ({ item }) => (
    <TouchableOpacity style={styles.tweetResult}>
      <View style={styles.userAvatar}>
        <FontAwesome name="user" size={24} color="white" />
      </View>
      <View style={styles.tweetContent}>
        <View style={styles.tweetHeader}>
          <Text style={styles.tweetName}>{item.name}</Text>
          {item.verified && (
            <FontAwesome name="check-circle" size={14} color="#1DA1F2" style={styles.verifiedIcon} />
          )}
          <Text style={styles.tweetHandle}>@{item.username} · {item.time}</Text>
        </View>
        <Text style={styles.tweetText}>{item.content}</Text>
        <View style={styles.tweetActions}>
          <View style={styles.tweetAction}>
            <FontAwesome5 name="retweet" size={14} color="#657786" />
            <Text style={styles.tweetActionText}>{item.retweets}</Text>
          </View>
          <View style={styles.tweetAction}>
            <FontAwesome name="heart-o" size={14} color="#657786" />
            <Text style={styles.tweetActionText}>{item.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.locationItem, selectedLocation === item.name && styles.selectedLocationItem]}
      onPress={() => handleLocationChange(item)}
    >
      <Text style={[styles.locationText, selectedLocation === item.name && styles.selectedLocationText]}>
        {item.name}
      </Text>
      {selectedLocation === item.name && (
        <FontAwesome name="check" size={16} color="#1DA1F2" />
      )}
    </TouchableOpacity>
  );

  const SearchTabs = () => (
    <View style={styles.searchTabs}>
      {['top', 'latest', 'people', 'photos', 'videos'].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.searchTab, activeSearchTab === tab && styles.activeSearchTab]}
          onPress={() => setActiveSearchTab(tab)}
        >
          <Text style={[styles.searchTabText, activeSearchTab === tab && styles.activeSearchTabText]}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSearchResults = () => {
    switch (activeSearchTab) {
      case 'people':
        return (
          <FlatList
            data={searchResults.users}
            renderItem={renderUserResult}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        );
      case 'top':
      case 'latest':
        return (
          <FlatList
            data={searchResults.tweets}
            renderItem={renderTweetResult}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        );
      default:
        return (
          <View style={styles.emptyResults}>
            <FontAwesome5 name="search" size={48} color="#657786" />
            <Text style={styles.emptyTitle}>No results for "{searchText}"</Text>
            <Text style={styles.emptyDescription}>
              Try searching for something else, or check the spelling of what you typed.
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#657786" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Twitter"
            value={searchText}
            onChangeText={handleSearch}
            autoCapitalize="none"
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <FontAwesome name="times" size={16} color="#657786" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isSearching ? (
        <View style={styles.searchResultsContainer}>
          <SearchTabs />
          {renderSearchResults()}
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Trends Section */}
          <View style={styles.trendsSection}>
            <View style={styles.trendsHeader}>
              <Text style={styles.trendsTitle}>Trends for you</Text>
              <TouchableOpacity>
                <FontAwesome name="cog" size={20} color="#657786" />
              </TouchableOpacity>
            </View>
            
            {trends.length > 0 ? (
              <FlatList
                data={trends}
                renderItem={renderTrendItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.noTrends}>
                <Text style={styles.noTrendsText}>No new trends for you</Text>
                <TouchableOpacity 
                  style={styles.changeLocationButton}
                  onPress={() => setLocationModalVisible(true)}
                >
                  <Text style={styles.changeLocationText}>Change location</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Current Location */}
          <TouchableOpacity 
            style={styles.locationSection}
            onPress={() => setLocationModalVisible(true)}
          >
            <FontAwesome name="map-marker" size={16} color="#657786" />
            <Text style={styles.locationText}>Trends for {selectedLocation}</Text>
            <FontAwesome name="chevron-right" size={12} color="#657786" />
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome5 name="feather-alt" size={24} color="white" />
      </TouchableOpacity>

      {/* Location Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={locationModalVisible}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Choose location</Text>
              <View style={styles.placeholder} />
            </View>
            
            <FlatList
              data={locations}
              renderItem={renderLocationItem}
              keyExtractor={(item) => item.id}
              style={styles.locationsList}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fa',
    paddingTop: 40,
  },
  searchHeader: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  trendsSection: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  trendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trendsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  trendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f4',
  },
  trendContent: {
    flex: 1,
  },
  trendCategory: {
    fontSize: 13,
    color: '#657786',
    marginBottom: 2,
  },
  trendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
  },
  trendTweets: {
    fontSize: 13,
    color: '#657786',
  },
  trendMenu: {
    padding: 8,
  },
  noTrends: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noTrendsText: {
    fontSize: 16,
    color: '#657786',
    marginBottom: 12,
  },
  changeLocationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  changeLocationText: {
    fontSize: 15,
    color: '#1DA1F2',
    fontWeight: '500',
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  locationText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#657786',
  },
  searchResultsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchTabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  searchTab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeSearchTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#1DA1F2',
  },
  searchTabText: {
    fontSize: 15,
    color: '#657786',
    fontWeight: '500',
  },
  activeSearchTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  userResult: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  userHandle: {
    fontSize: 14,
    color: '#657786',
    marginBottom: 4,
  },
  userBio: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
  userFollowers: {
    fontSize: 13,
    color: '#657786',
  },
  followButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tweetResult: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  tweetContent: {
    flex: 1,
    marginLeft: 12,
  },
  tweetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  tweetName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  tweetHandle: {
    fontSize: 14,
    color: '#657786',
    marginLeft: 4,
  },
  tweetText: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
    lineHeight: 20,
  },
  tweetActions: {
    flexDirection: 'row',
  },
  tweetAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 32,
  },
  tweetActionText: {
    fontSize: 13,
    color: '#657786',
    marginLeft: 4,
  },
  emptyResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#657786',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
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
    shadowRadius: 4,
  },
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
  placeholder: {
    width: 60,
  },
  locationsList: {
    flex: 1,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  selectedLocationItem: {
    backgroundColor: '#f0f8ff',
  },
  locationText: {
    fontSize: 16,
    color: '#000',
  },
  selectedLocationText: {
    color: '#1DA1F2',
    fontWeight: '500',
  },
});

export default SearchScreen;
