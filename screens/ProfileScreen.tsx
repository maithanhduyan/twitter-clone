import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Tên đầy đủ</Text>
        <Text style={styles.username}>@username</Text>
        <Text style={styles.email}>email@example.com</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { alignItems: 'center', padding: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold' },
  username: { fontSize: 16, color: '#666' },
  email: { fontSize: 14, color: '#999', marginTop: 8 },
});
