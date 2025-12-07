// frontend/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { MenuIcon, SettingsIcon } from '../components/Icon';
import { colors } from '../styles/GlobalStyles';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import CourseEnrollmentScreen from '../screens/CourseEnrollmentScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import QuotesScreen from '../screens/QuotesScreen';
import SettingScreen from '../screens/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTabNavigator from './BottomTabNavigator'; // Moved to top

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Riphah Sphere ',
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Student Portal',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Settings')}
                style={{
                  marginRight: 15,
                  padding: 5,
                }}
              >
                <SettingsIcon
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            ),
            headerLeft: () => null,
          })}
        />
        <Stack.Screen
          name="App"
          component={BottomTabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CourseEnrollment"
          component={CourseEnrollmentScreen}
          options={{ title: 'Course Enrollment' }}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{ title: 'Course Details' }}
        />
        <Stack.Screen
          name="MotivationalQuotes"
          component={QuotesScreen}
          options={{ title: 'Motivational Quotes' }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={{ title: 'Settings' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'My Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;