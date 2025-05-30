import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24 },
});
