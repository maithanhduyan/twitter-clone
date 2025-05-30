// Description: This component renders a menu for a tweet, allowing users to interact with the tweet through various options.
// biểu tượng dấu **(...)** (ba chấm dọc) nằm ở góc trên bên phải của mỗi bài đăng trên Twitter (X) có chức năng **mở menu tùy chọn** cho bài đăng đó.

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface TweetMenuProps {
  tweet: {
    id: string;
    name: string;
    username: string;
    isFollowed: boolean;
  };
  onMenuAction: (action: string, tweet: any) => void;
  onClose: () => void;
}

const TweetMenu: React.FC<TweetMenuProps> = ({ tweet, onMenuAction, onClose }) => {
  return (
    <View style={styles.menuOverlay}>
      <TouchableOpacity 
        style={styles.menuBackdrop} 
        onPress={onClose}
      />
      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('follow', tweet)}
        >
          <FontAwesome 
            name={tweet.isFollowed ? "user-times" : "user-plus"} 
            size={16} 
            color="#657786" 
          />
          <Text style={styles.menuItemText}>
            {tweet.isFollowed ? `Bỏ theo dõi @${tweet.username}` : `Theo dõi @${tweet.username}`}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('notInterested', tweet)}
        >
          <FontAwesome name="eye-slash" size={16} color="#657786" />
          <Text style={styles.menuItemText}>Không quan tâm bài viết này</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('mute', tweet)}
        >
          <FontAwesome name="volume-off" size={16} color="#657786" />
          <Text style={styles.menuItemText}>Tắt tiếng @{tweet.username}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('block', tweet)}
        >
          <FontAwesome name="ban" size={16} color="#e74c3c" />
          <Text style={[styles.menuItemText, { color: '#e74c3c' }]}>Chặn @{tweet.username}</Text>
        </TouchableOpacity>
        
        <View style={styles.menuSeparator} />
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('report', tweet)}
        >
          <FontAwesome name="flag" size={16} color="#e74c3c" />
          <Text style={[styles.menuItemText, { color: '#e74c3c' }]}>Báo cáo bài viết</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('copyLink', tweet)}
        >
          <FontAwesome name="link" size={16} color="#657786" />
          <Text style={styles.menuItemText}>Sao chép liên kết</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => onMenuAction('embed', tweet)}
        >
          <FontAwesome name="code" size={16} color="#657786" />
          <Text style={styles.menuItemText}>Nhúng Tweet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  menuContainer: {
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
  },
  menuSeparator: {
    height: 1,
    backgroundColor: '#e1e8ed',
    marginVertical: 4,
  },
});

export default TweetMenu;
