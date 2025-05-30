import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import DatePicker from 'react-native-date-picker'; // Import DatePicker
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import globalStyles from '../globalStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [usePhone, setUsePhone] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false); // State to control DatePicker
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date

  const handleRegister = () => {
    if (!username || (!email && !usePhone) || !dob) {
      alert('Please fill in all fields');
      return;
    }
    // Handle registration logic here
    navigation.replace('Main');
  };

  const handleDateConfirm = (date: Date) => {
    setSelectedDate(date);
    setDob(date.toISOString().split('T')[0]); // Format date as yyyy-mm-dd
    setIsDatePickerOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/twitter.svg')}
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

      {/* Date Picker Modal */}
      <Modal visible={isDatePickerOpen} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <DatePicker
            date={selectedDate}
            mode="date"
            onDateChange={setSelectedDate}
            onConfirm={() => handleDateConfirm(selectedDate)} // Call handleDateConfirm
            onCancel={() => setIsDatePickerOpen(false)}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsDatePickerOpen(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1DA1F2',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
