import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Platform, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import globalStyles from '../globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [usePhone, setUsePhone] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleRegister = () => {
    // if (!username || (!email && !usePhone) || !dob) {
    //   alert('Please fill in all fields');
    //   return;
    // }
    
    // Giả lập đăng ký thành công
    alert('Registration successful!');
    
    // Chuyển đến màn hình Home thay vì Main
    navigation.replace('Main');
  };

  const handleDateConfirm = (event: any, date?: Date) => {
    setIsDatePickerOpen(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      setDob(date.toISOString().split('T')[0]);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/twitter.png')}
          style={globalStyles.logo}
        />

        <Text style={styles.title}>Create your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder={usePhone ? 'Phone' : 'Email'}
          value={email}
          onChangeText={setEmail}
          keyboardType={usePhone ? 'phone-pad' : 'email-address'}
        />
        <TouchableOpacity onPress={() => setUsePhone(!usePhone)}>
          <Text style={styles.toggleText}>
            {usePhone ? 'Use email instead' : 'Use phone instead'}
          </Text>
        </TouchableOpacity>

        {/* Date of Birth Input */}
        <TouchableOpacity onPress={() => setIsDatePickerOpen(true)}>
          <TextInput
            style={styles.input}
            placeholder="Date of birth (yyyy-mm-dd)"
            value={dob}
            editable={false} // Prevent manual editing
          />
        </TouchableOpacity>

        {/* Date Picker */}
        {isDatePickerOpen && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateConfirm}
          />
        )}

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 14,
    color: '#1DA1F2',
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 15,
  },
  registerButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#1DA1F2',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
