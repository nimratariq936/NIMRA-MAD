// frontend/navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/GlobalStyles';

// ===== IMPORT ALL TAB SCREENS =====

// Tab 1: Quotes Screen
import QuotesScreen from '../screens/QuotesScreen';

// Tab 2: Course Enrollment Screen
import CourseEnrollmentScreen from '../screens/CourseEnrollmentScreen';

// Tab 3: Home Screen (Center/Main)
import HomeScreen from '../screens/HomeScreen';

// Tab 4: Timetable Screen
import TimetableScreen from '../screens/TimetableScreen';

// Tab 5: Profile Screen
import ProfileScreen from '../screens/ProfileScreen';

// Create Tab Navigator
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab" // Home screen opens first
      screenOptions={{
        // Tab bar styling
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.secondary,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        // Hide header for all tab screens (we'll use custom headers)
        headerShown: false,
      }}
    >
      {/* ===== TAB 1: QUOTES ===== */}
      <Tab.Screen
        name="QuotesTab"
        component={QuotesScreen}
        options={{
          tabBarLabel: 'Quotes',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="star"
              size={focused ? 30 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* ===== TAB 2: COURSES ===== */}
      <Tab.Screen
        name="CoursesTab"
        component={CourseEnrollmentScreen}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="book"
              size={focused ? 30 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* ===== TAB 3: HOME (CENTER - BIGGER) ===== */}
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home"
              size={focused ? 32 : 28}
              color={color}
              style={{
                marginTop: focused ? -5 : 0,
              }}
            />
          ),
        }}
      />

      {/* ===== TAB 4: TIMETABLE ===== */}
      <Tab.Screen
        name="TimetableTab"
        component={TimetableScreen}
        options={{
          tabBarLabel: 'Timetable',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="calendar"
              size={focused ? 30 : 24}
              color={color}
            />
          ),
        }}
      />

      {/* ===== TAB 5: PROFILE ===== */}
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person"
              size={focused ? 30 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;