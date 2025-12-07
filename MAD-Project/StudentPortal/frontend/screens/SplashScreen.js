import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions, Easing } from 'react-native';
import { colors } from '../styles/GlobalStyles';
import RiphahLogo from '../assets/RiphahLogo.png';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// --- GRADIENT BACKGROUND COMPONENT ---
const GradientBackground = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Base Gradient (Sky Blue) */}
      <LinearGradient
        colors={['#e0f7faff', '#81D4FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Overlay Gradient (Golden-ish Tint) - Fades in and out */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity }]}>
        <LinearGradient
          colors={['#e0f7faff', '#fadf8dff']} // Light blue to light gold
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

// --- FLOATING ICON COMPONENT ---
const FloatingIcon = ({ name, size, startX, startY, duration, delay }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -20, // Float up
          duration: duration,
          delay: delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0, // Float down
          duration: duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ])
    ).start();
  }, [duration, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: startX,
        top: startY,
        transform: [{ translateY }],
        opacity: 0.25, // Subtle opacity
      }}
    >
      <Ionicons name={name} size={size} color="#cd950c" />
    </Animated.View>
  );
};

// --- BACKGROUND COMPONENT ---
const StudyBackground = () => {
  // Array of study-related icons
  const icons = [
    { name: 'book', size: 40, x: width * 0.1, y: height * 0.15, dur: 2000, del: 0 },
    { name: 'school', size: 50, x: width * 0.7, y: height * 0.1, dur: 2500, del: 500 },
    { name: 'pencil', size: 35, x: width * 0.15, y: height * 0.4, dur: 2200, del: 200 },
    { name: 'library', size: 45, x: width * 0.8, y: height * 0.35, dur: 2800, del: 800 },
    { name: 'bulb', size: 40, x: width * 0.2, y: height * 0.7, dur: 2400, del: 100 },
    { name: 'desktop', size: 42, x: width * 0.85, y: height * 0.65, dur: 2600, del: 600 },
    { name: 'calculator', size: 38, x: width * 0.5, y: height * 0.85, dur: 2300, del: 300 },
    { name: 'glasses', size: 55, x: width * 0.4, y: height * 0.25, dur: 2900, del: 700 },
    { name: 'flask', size: 40, x: width * 0.75, y: height * 0.8, dur: 2100, del: 400 },
    { name: 'ribbon', size: 45, x: width * 0.1, y: height * 0.85, dur: 2700, del: 100 },
  ];

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          name={icon.name}
          size={icon.size}
          startX={icon.x}
          startY={icon.y}
          duration={icon.dur}
          delay={icon.del}
        />
      ))}
    </View>
  );
};

// --- LOADING DOTS COMPONENT ---
const LoadingDots = () => {
  const animations = useRef([...Array(3)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animate = () => {
      const loops = animations.map((anim, index) => {
        return Animated.sequence([
          Animated.delay(index * 150),
          Animated.loop(
            Animated.sequence([
              Animated.timing(anim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
              }),
            ])
          ),
        ]);
      });
      Animated.parallel(loops).start();
    };

    animate();
  }, []);

  return (
    <View style={styles.loadingContainer}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: anim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.3, 1, 0.3],
              }),
              transform: [
                {
                  scale: anim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.8, 1.2, 0.8],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const SplashScreen = ({ navigation }) => {
  // Animations for Logo and Text
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current; // Start from 0 for "coming from inside" effect
  const textSlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Start entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(textSlideAnim, {
        toValue: 0,
        duration: 1000,
        delay: 300,
        useNativeDriver: true,
      })
    ]).start();

    // Navigate away after 3.5 seconds
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* 1. Animated Gradient Layer */}
      <GradientBackground />

      {/* 2. Floating Icons Layer */}
      <StudyBackground />

      {/* 3. Content Layer */}
      <View style={styles.logoContainer}>

        {/* Animated Logo Container */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            marginBottom: 30,
          }}
        >
          <Image
            source={RiphahLogo}
            style={styles.logoImage}
          />
        </Animated.View>

        {/* Animated Text */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: textSlideAnim }], alignItems: 'center' }}>
          <Text style={styles.universityName}>
            Riphah International University
          </Text>

          {/* Loading Animation (Custom Pulsing Dots) */}
          <LoadingDots />
        </Animated.View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Background color handled by GradientBackground
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    zIndex: 10, // Ensure content is above background icons
  },
  logoImage: {
    width: 160,
    height: 160,
    resizeMode: 'contain',
  },
  universityName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3d5a80', // Darker Blue for contrast against light blue
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 34,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cd950c', // Gold color to match icons
    marginHorizontal: 5,
  },
});

export default SplashScreen;