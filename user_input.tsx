import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

// Define a type for our form state
export type FormState = {
  username: string;
  gender: string;
  dateOfBirth: string;
  password: string;
  email: string;
  confirmPassword: string;
};

type RegistrationFormProps = {
  onRegister: (data: FormState) => void;
};

const RegistrationForm = ({ onRegister }: RegistrationFormProps) => {
  // Set initial state for the form fields
  const [form, setForm] = useState<FormState>({
    username: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Set initial state for error messages
  const [error, setError] = useState<string | null>(null);

  // Set initial state for success messages
  const [success, setSuccess] = useState<string | null>(null);

  // Handle form input changes
  const handleInputChange = (name: keyof FormState, value: string) => {
    setForm({ ...form, [name]: value });
  };

  // Validate and submit the form
  const handleSubmit = () => {
    const { username, gender, dateOfBirth, email, password, confirmPassword } = form;

    // Basic validation
    if (!username || !gender || !dateOfBirth || !email || !password || !confirmPassword) {
      setError('All fields are required, please fill all the fields');
      setSuccess(null); // Clear any previous success message
      return;
    }

    if (username.length <= 2) {
      setError('Username must be longer than two characters');
      setSuccess(null); // Clear any previous success message
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords are not the same, please check your passwords');
      setSuccess(null); // Clear any previous success message
      return;
    }

    // Email validation
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      setError('Please enter a valid email address.');
      setSuccess(null); // Clear any previous success message
      return;
    }

    // Date of Birth validation
    let dobReg = /^\d{4}-\d{2}-\d{2}$/;
    if (!dobReg.test(dateOfBirth)) {
      setError('Please enter a valid date of birth in the format YYYY-MM-DD');
      setSuccess(null); // Clear any previous success message
      return;
    }
    const [year, month, day] = dateOfBirth.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      setError('Please enter a valid date of birth');
      setSuccess(null); // Clear any previous success message
      return;
    }

    // Clear error, set success message, and log form data 
    setError(null);
    setSuccess('Registration successful!');
    console.log('Form submitted:', form);
    onRegister(form);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Registration</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>}
      
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender</Text>
        <View style={styles.genderOptions}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              form.gender === 'Female' && styles.genderOptionSelected,
            ]}
            onPress={() => handleInputChange('gender', 'Female')}
          >
            <Text style={styles.genderOptionText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderOption,
              form.gender === 'Male' && styles.genderOptionSelected,
            ]}
            onPress={() => handleInputChange('gender', 'Male')}
          >
            <Text style={styles.genderOptionText}>Male</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={form.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Date of birth (YYYY-MM-DD)"
        value={form.dateOfBirth}
        onChangeText={(text) => handleInputChange('dateOfBirth', text)}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email (something@example.com)"
        value={form.email}
        onChangeText={(text) => handleInputChange('email', text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) => handleInputChange('confirmPassword', text)}
        secureTextEntry
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: 'crimson',
    marginBottom: 20,
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  genderContainer: {
    marginBottom: 20,
  },
  genderLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  genderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderOptionSelected: {
    backgroundColor: '#add8e6',
  },
  genderOptionText: {
    fontSize: 16,
  },
});

export default RegistrationForm;
