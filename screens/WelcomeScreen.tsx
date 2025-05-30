import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type WelcomeScreenProps = NativeStackScreenProps<any, any>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/twitter.png')}
          style={styles.logo} // Use global style
        />

        {/* Title */}
        <Text style={styles.title}>Happening now</Text>
        <Text style={styles.subtitle}>Join today.</Text>

        {/* Buttons */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.buttonText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appleButton}>
          <Text style={styles.buttonText}>Sign up with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.createAccountText}>Create account</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>
          By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
        </Text>

        {/* Sign In */}
        <Text style={styles.signInText}>
          Already have an account?
        </Text>
        <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.termsText}>
          This is a private computer system. Unauthorized access is prohibited.
          All activity is monitored and recorded. By using this system, you consent to such monitoring and recording.
        </Text>
        <Text style={styles.copyRightText}>
          Twitter Clone, Inc. © 2025
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

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
    paddingTop: 40, // Thêm padding top để tạo khoảng cách
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 30,
  },
  googleButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  appleButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  orText: {
    fontSize: 16,
    color: '#888',
    marginVertical: 10,
  },
  createAccountButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  createAccountText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 16,
    color: '#1DA1F2',
    fontWeight: 'bold',
  },
  signInButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  copyRightText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 0,
  },
});
