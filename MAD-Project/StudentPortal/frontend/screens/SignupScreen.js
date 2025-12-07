// frontend/screens/SignupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image, // ← CORRECT IMPORT NAME
} from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { signUpStudent } from '../services/firebaseService';
import LinearGradient from 'react-native-linear-gradient'; // ADD THIS

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [sapId, setSapId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Basic email format validation
    const emailRegex = /^\d+@students\.riphah\.edu\.pk$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please use a valid Riphah student email (e.g., 1234@students.riphah.edu.pk)');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!sapId.trim()) {
      Alert.alert('Error', 'Please enter your SAP ID');
      return;
    }

    setLoading(true);

    try {
      const studentData = {
        sapId: sapId.trim(),
        fullName: fullName.trim(),
        enrolledCourses: [],
        totalCredits: 0,
      };

      const result = await signUpStudent(email, password, studentData);

      if (result.success) {
        Alert.alert(
          'Success',
          'Account created successfully! Please login with your credentials.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back to Login screen instead of Home
                navigation.replace('Login');
              }
            }
          ]
        );
      } else {
        Alert.alert('Signup Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={GlobalStyles.screenContainer} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>

        <View style={GlobalStyles.card}>
          <Text style={GlobalStyles.label}>Full Name</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="Enter your full name"
            placeholderTextColor={colors.gray}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            editable={!loading}
          />

          <Text style={GlobalStyles.label}>SAP ID</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="Enter your SAP ID"
            placeholderTextColor={colors.gray}
            value={sapId}
            onChangeText={setSapId}
            keyboardType="numeric"
            editable={!loading}
          />

          <Text style={GlobalStyles.label}>Student Email</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="1234@students.riphah.edu.pk"
            placeholderTextColor={colors.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <Text style={GlobalStyles.label}>Password</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="Create a password (min. 6 characters)"
            placeholderTextColor={colors.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <Text style={GlobalStyles.label}>Confirm Password</Text>
          <TextInput
            style={GlobalStyles.input}
            placeholder="Confirm your password"
            placeholderTextColor={colors.gray}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={GlobalStyles.buttonText}>
                Create Account
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.secondaryButton}
            onPress={() => navigation.navigate('Login')}
            disabled={loading}
          >
            <Text style={[GlobalStyles.buttonText, { color: colors.black }]}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;