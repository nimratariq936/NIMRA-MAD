// frontend/screens/HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, colors } from '../styles/GlobalStyles';
import { getStudentProfile, getCurrentUser } from '../services/firebaseService';
import RiphahLogo from '../assets/RiphahLogo.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  // State to track expanded status for multiple events
  const [expandedEventIds, setExpandedEventIds] = useState({});

  // Marquee state and refs
  const marqueeAnim = useRef(new Animated.Value(0)).current;
  const marqueeText = "Good News! Free Medical Camp — All employees and students are invited to register";
  const textRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textWidth > 0) {
      startMarqueeAnimation();
    }
  }, [textWidth]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const onTextLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTextWidth(width);
  };

  const startMarqueeAnimation = () => {
    // Reset animation
    marqueeAnim.setValue(SCREEN_WIDTH);

    // Calculate total distance (screen width + text width)
    const totalDistance = SCREEN_WIDTH + textWidth;
    // Calculate duration (speed: 100 pixels per second)
    const duration = (totalDistance / 100) * 1000;

    // Start infinite loop
    Animated.loop(
      Animated.timing(marqueeAnim, {
        toValue: -textWidth,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: -1 }
    ).start();
  };

  const fetchProfile = async () => {
    try {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const result = await getStudentProfile(currentUser.uid);
        if (result.success) {
          setProfile(result.data);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentMonthCalendar = () => {
    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long' });
    const currentYear = now.getFullYear();
    const currentDate = now.getDate();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push('');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return { month: currentMonth, year: currentYear, currentDate, days };
  };

  const renderCalendar = () => {
    const calendar = getCurrentMonthCalendar();
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <View>
        <Text style={[GlobalStyles.text, { fontWeight: 'bold', marginBottom: 10 }]}>
          {calendar.month} {calendar.year}
        </Text>

        {/* Calendar Header: Flex Start ensuring alignment */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {weekDays.map((day, index) => (
            <View key={`header-${index}`} style={{ width: '14.28%', alignItems: 'center', marginBottom: 5 }}>
              <Text style={[GlobalStyles.textSmall, { fontWeight: 'bold' }]}>{day}</Text>
            </View>
          ))}

          {calendar.days.map((day, index) => (
            <View
              key={`day-${index}`}
              style={{
                width: '14.28%',
                alignItems: 'center',
                marginVertical: 2
              }}
            >
              {day ? (
                <View style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: day === calendar.currentDate ? colors.primary : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: day === calendar.currentDate ? 0 : 1,
                  borderColor: colors.secondary
                }}>
                  <Text style={[
                    GlobalStyles.textSmall,
                    {
                      color: day === calendar.currentDate ? colors.white : colors.black,
                      fontWeight: day === calendar.currentDate ? 'bold' : 'normal'
                    }
                  ]}>
                    {day}
                  </Text>
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    );
  };

  const toggleEvent = (id) => {
    setExpandedEventIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const events = [
    {
      id: 1,
      headline: '🩺 Free Medical Camp for all students — Register now!',
      details: [
        'Assalam-o-Alaikum,',
        'Respected All,',
        'We are pleased to announce a Free Medical Camp.',
        'Contact: +92312-5478932',
        'Regards,',
        'Ms. Saba Asim',
        'Principal RCN GGC'
      ]
    },
    {
      id: 2,
      headline: '🎒 SSD Student Trip to Ayubia Pipeline, Murree!',
      details: [
        '🌲 Get ready for an exciting hiking adventure with the Student Services Department (SSD), Riphah Gulberg Greens Campus!',
        '📍 Destination: Ayubia Pipeline, Murree',
        '📅 Trip Date: Saturday, 15th November',
        '💰 Charges: Rs. 500 per person (Cash only)',
        '🚌 Seats: 250 only — First come, first serve!',
        '',
        'Registration Details:',
        '* Submit Rs. 500 (cash only) at the SSD Office',
        '* Registration open from 12th November to 13th November',
        '* No online or late registrations will be accepted',
        '',
        'Departure & Arrival:',
        '* Report at campus by 7:30 AM',
        '* Bus leaves at 8:00 AM sharp (no entries after 8:00)',
        '* Expected return to campus by 8:00 PM',
        '',
        '📢 Don’t miss out — limited seats available! Register early and enjoy a refreshing day in the hills with your friends! 🌄'
      ]
    }
  ];

  if (loading) {
    return (
      <View style={GlobalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={GlobalStyles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={GlobalStyles.screenContainer}>
      {/* Fixed Marquee Announcement */}
      <View style={{
        backgroundColor: colors.secondary,
        height: 40,
        justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 30,
        marginBottom: 20,
        width: '100%',
        alignSelf: 'center',
        paddingHorizontal: 0,
      }}>

        <Animated.View
          style={{
            flexDirection: 'row',
            transform: [{ translateX: marqueeAnim }],
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Text
            ref={textRef}
            onLayout={onTextLayout}
            style={{
              color: colors.black,
              fontSize: 14,
              fontWeight: '600',
              paddingHorizontal: 10,
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            {marqueeText}
          </Text>

          {/* Duplicate text for seamless loop */}
          <Text
            style={{
              color: colors.black,
              fontSize: 14,
              fontWeight: '600',
              paddingHorizontal: 10,
              textAlign: 'center',
              opacity: 1,
            }}
            numberOfLines={1}
          >
            {marqueeText}
          </Text>
        </Animated.View>
      </View>

      {/* Riphah Logo and Welcome Message */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={RiphahLogo}
          style={{
            width: 160,
            height: 160,
            resizeMode: 'contain',
            marginBottom: 10,
          }}
        />

        <Text style={GlobalStyles.header}>
          Welcome
        </Text>
        <Text style={GlobalStyles.header}>
          {profile?.fullName || 'Student'}
        </Text>
      </View>

      {/* Events Sections - Horizontal Scroll */}
      <View style={{ marginBottom: 20 }}>
        <Text style={[GlobalStyles.subHeader, { marginLeft: 15, marginBottom: 10 }]}>
          Upcoming Events
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          {events.map((event) => (
            <View key={event.id} style={{
              backgroundColor: colors.white,
              padding: 15,
              borderRadius: 12,
              marginRight: 15, // Spacing between cards
              marginBottom: 10, // Shadow spacing
              width: SCREEN_WIDTH * 0.85, // 85% width
              elevation: 3,
              alignSelf: 'flex-start' // Ensure height adjusts naturally
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10
              }}>
                {/* Replaced 'Upcoming Event' title with View More link location or just layout */}
                <View style={{ flex: 1 }}>
                  <Text style={[GlobalStyles.text, { fontWeight: 'bold' }]}>
                    {event.headline}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: 'flex-end', marginTop: 5 }}>
                <TouchableOpacity onPress={() => toggleEvent(event.id)}>
                  <Text style={{
                    color: colors.primary,
                    textDecorationLine: 'underline',
                    fontSize: 12
                  }}>
                    {expandedEventIds[event.id] ? 'View Less' : 'View More'}
                  </Text>
                </TouchableOpacity>
              </View>

              {expandedEventIds[event.id] && (
                <View style={{
                  marginTop: 15,
                  padding: 15,
                  backgroundColor: colors.background,
                  borderRadius: 10,
                  borderLeftWidth: 3,
                  borderLeftColor: colors.primary
                }}>
                  {Array.isArray(event.details) ? (
                    event.details.map((line, idx) => (
                      <Text key={idx} style={[GlobalStyles.text, { marginBottom: 4 }]}>{line}</Text>
                    ))
                  ) : (
                    <Text style={GlobalStyles.text}>{event.details}</Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>

      {/* 🔹 Calendar Section (Separate Card + Spacing) */}
      <View>
        <Text style={[GlobalStyles.subHeader, { marginLeft: 15, marginBottom: 10 }]}>
          Calendar
        </Text>

        <View style={{
          backgroundColor: colors.white,
          padding: 15,
          borderRadius: 12,
          marginHorizontal: 15,
          marginBottom: 25,
          elevation: 3
        }}>
          {renderCalendar()}
        </View>
      </View>

    </ScrollView>
  );
};

export default HomeScreen;