import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Events</Text>
    </View>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});
