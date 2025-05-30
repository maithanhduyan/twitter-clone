import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import Header from '../components/Header';

const SettingsPrivacyScreen = () => {
  const [isPrivate, setIsPrivate] = React.useState(false);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Cài đặt & Quyền riêng tư</Text>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Tài khoản riêng tư</Text>
          <Switch
            value={isPrivate}
            onValueChange={setIsPrivate}
          />
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.label}>Thông báo email</Text>
          <Switch value={true} disabled />
        </View>
      </View>
    </View>
  );
};

export default SettingsPrivacyScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  content: { padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  label: { fontSize: 16 },
});
