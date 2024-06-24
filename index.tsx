import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import RegistrationForm from './user_input';
import { FormState } from './user_input'; // Import the FormState type

const App = () => {
  const [userData, setUserData] = useState<FormState | null>(null);

  const handleRegistration = (data: FormState) => {
    setUserData(data);
    // data is stored and can be used when needed 
    Alert.alert('Success', 'Registration successful!');
    console.log('User Data:', data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <RegistrationForm onRegister={handleRegistration} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
