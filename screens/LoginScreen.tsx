import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

// Define RootStackParamList type
interface RootStackParamList extends ParamListBase {
  Login: undefined;
  Main: undefined;
}

type Props = {
  navigation: {
    replace: (routeName: string) => void;
  };
};

const API_URL = 'http://localhost:3000';

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
    // Giả lập đăng nhập thành công
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('Main');
    }, 1500);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while logging in. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={isLoading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={isLoading} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});
