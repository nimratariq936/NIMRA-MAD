// frontend/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { loginStudent } from '../services/firebaseService';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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

    setLoading(true);

    try {
      const result = await loginStudent(email, password);

      if (result.success) {
        // Navigate to App (BottomTabNavigator) which opens HomeScreen by default
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      } else {
        Alert.alert('Login Failed', result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={GlobalStyles.screenContainer} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={GlobalStyles.Welcomeheader}>
          Welcome
        </Text>

        <View style={[GlobalStyles.card, { marginTop: 30, marginHorizontal: 20 }]}>
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
            placeholder="Enter your password"
            placeholderTextColor={colors.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={GlobalStyles.buttonText}>
                Login
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.secondaryButton}
            onPress={() => navigation.navigate('Signup')}
            disabled={loading}
          >
            <Text style={[GlobalStyles.buttonText, { color: colors.black }]}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignItems: 'center', marginTop: 15 }}
            onPress={() => Alert.alert('Forgot Password', 'Please contact administration to reset your password.')}
            disabled={loading}
          >
            <Text style={[GlobalStyles.text, { color: colors.primary, textDecorationLine: 'underline' }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;