import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

// Define RootStackParamList type
interface RootStackParamList extends ParamListBase {
  Login: undefined;
  Register: undefined;
  Main: undefined;
}

type Props = {
  navigation: {
    replace: (routeName: string) => void;
    navigate: (routeName: string) => void;
  };
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, isLoading, isAuthenticated } = useAuth();

  // Kiểm tra trạng thái đăng nhập
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Main');
    }
  }, [isAuthenticated, navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const success = await login(username, password);
    if (success) {
      Alert.alert('Success', 'Login successful!', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Main')
        }
      ]);
    } else {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await logout();
    Alert.alert('Success', 'Logged out successfully!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/twitter.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Sign in to Twitter</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone, email, or username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={[
              styles.loginButton, 
              isLoading && styles.loginButtonDisabled
            ]} 
            onPress={handleLogin} 
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Debug button để test logout */}
          <TouchableOpacity style={styles.debugButton} onPress={handleLogout}>
            <Text style={styles.debugButtonText}>Clear Token (Debug)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
   logo: {
    width: 50,
    height: 50,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#14171A',
  },
  formContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    marginTop: -100,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#AAB8C2',
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1DA1F2',
  },
  debugButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  debugButtonText: {
    fontSize: 12,
    color: '#657786',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#657786',
  },
  signUpText: {
    fontSize: 14,
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
});
