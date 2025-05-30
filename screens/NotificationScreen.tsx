import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from '../components/Header';

const mockNotifications = [
  { id: '1', title: 'Sự kiện mới sắp diễn ra!' },
  { id: '2', title: 'Ví của bạn vừa được cập nhật.' },
  { id: '3', title: 'Bạn có 2 người theo dõi mới.' },
];

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={mockNotifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  notification: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  text: { fontSize: 16 },
});
