import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

const CommunityScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Cộng đồng</Text>
        <Text style={styles.description}>Các hoạt động, nhóm, và sự kiện cộng đồng sẽ được hiển thị tại đây.</Text>
      </View>
    </View>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#444' },
});
