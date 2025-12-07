import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  Easing
} from 'react-native';
import { GlobalStyles, colors } from '../styles/GlobalStyles';

const { width, height } = Dimensions.get('window');

// --- MOVING STAR LAYER COMPONENT ---
// Renders a layer of stars that scrolls infinitely
const StarLayer = ({ count, speed, starSize, opacity }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [stars] = useState(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * width,
      top: Math.random() * height,
    }))
  );

  useEffect(() => {
    // Determine duration based on speed
    const duration = 10000 / speed;

    // Reset value ensuring consistent start
    scrollY.setValue(0);

    const animation = Animated.loop(
      Animated.timing(scrollY, {
        toValue: height,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    animation.start();

    return () => animation.stop();
  }, [speed]); // Removed scrollY from dependencies

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, height],
                outputRange: [0, height], // Moves from 0 to height
              }),
            },
          ],
        },
      ]}
    >
      {/* 
         We render two copies of the star pattern:
         1. The primary view (starts on screen)
         2. The duplicate view (starts above the screen at -height)
         
         As the container moves down (+Y), the duplicate view slides into view from the top.
         When it reaches +height, it snaps back to 0.
      */}

      {/* Primary Pattern */}
      <View style={{ width, height }}>
        {stars.map((star) => (
          <View
            key={`a-${star.id}`}
            style={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: starSize,
              height: starSize,
              borderRadius: starSize / 2,
              backgroundColor: 'white',
              opacity: opacity,
            }}
          />
        ))}
      </View>

      {/* Duplicate Pattern (starts off-screen top) */}
      <View style={{ width, height, position: 'absolute', top: -height }}>
        {stars.map((star) => (
          <View
            key={`b-${star.id}`}
            style={{
              position: 'absolute',
              left: star.left,
              top: star.top,
              width: starSize,
              height: starSize,
              borderRadius: starSize / 2,
              backgroundColor: 'white',
              opacity: opacity,
            }}
          />
        ))}
      </View>
    </Animated.View>
  );
};

const MovingSpaceBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: '#0b0d17', overflow: 'hidden' }]}>
      {/* Layer 1: Distant stars (Slowest, smallest) */}
      <StarLayer count={60} speed={0.2} starSize={1.5} opacity={0.5} />

      {/* Layer 2: Mid-distance stars (Medium speed) */}
      <StarLayer count={30} speed={0.5} starSize={2} opacity={0.7} />

      {/* Layer 3: Close stars (Fastest, largest) */}
      <StarLayer count={15} speed={1.0} starSize={3} opacity={0.9} />
    </View>
  );
};

const QuotesScreen = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  // Animation values for content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const fetchQuote = async () => {
    setLoading(true);
    fadeAnim.setValue(0);
    slideAnim.setValue(20);

    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      // ZenQuotes returns an array: [{ q: "quote text", a: "author name", h: "html" }]
      if (Array.isArray(data) && data.length > 0) {
        setQuote(data[0].q);
        setAuthor(data[0].a);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      const fallbackQuotes = [
        { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { content: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
        { content: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { content: "Shoot for the moon. Even if you miss, you'll land among the stars.", author: "Les Brown" }
      ];
      const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(randomQuote.content);
      setAuthor(randomQuote.author);
    }

    setLoading(false);

    // Fade + Slide animation for quotes
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      {/* 1. Background Layer */}
      <MovingSpaceBackground />

      {/* 2. Content Layer */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[GlobalStyles.header, styles.headerTitle]}>Motivational Quotes</Text>

        <View style={styles.glassCard}>
          <Text style={styles.cardLabel}>TODAY'S INSPIRATION</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#267A8E" />
              <Text style={styles.loadingText}>Connecting to the universe...</Text>
            </View>
          ) : (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
                marginTop: 10,
              }}
            >
              <Text style={styles.quoteText}>"{quote}"</Text>
              {author && (
                <Text style={styles.authorText}>- {author}</Text>
              )}
            </Animated.View>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={fetchQuote}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Transmitting...' : 'Discover New Quote'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  star: {
    position: 'absolute',
    backgroundColor: 'white',
  },
  headerTitle: {
    marginTop: 30,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Glass effect
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cardLabel: {
    color: '#267A8E',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 15,
    textAlign: 'center'
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20
  },
  loadingText: {
    color: '#ccc',
    marginTop: 10,
    fontStyle: 'italic'
  },
  quoteText: {
    fontSize: 22,
    color: 'white',
    lineHeight: 32,
    textAlign: 'center',
    fontStyle: 'italic',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Elegant font
  },
  authorText: {
    fontSize: 18,
    color: '#ddd',
    marginTop: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    backgroundColor: 'rgba(38, 122, 142, 0.3)', // Bright Gold
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#267A8E',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default QuotesScreen;
