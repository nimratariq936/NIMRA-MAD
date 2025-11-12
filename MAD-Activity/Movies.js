// MovieScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Color theme - Deep Ocean & Emerald
  const colors = {
    primary: '#0f172a',       // Deep navy
    secondary: '#1e293b',     // Lighter navy
    accent: '#06b6d4',        // Cyan accent
    accent2: '#10b981',       // Emerald green
    text: '#f8fafc',          // Light text
    textSecondary: '#94a3b8', // Gray text
    card: '#1e293b',          // Card background
    loading: '#0ea5e9',       // Sky blue for loading
  };

  useEffect(() => {
    // Loading animations start karen
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      })
    ]).start();

    // Data fetch with delay
    setTimeout(() => {
      fetchMovieData();
    }, 2000);
  }, []);

  const fetchMovieData = async () => {
    try {
      console.log('Fetching movies data...');
      const response = await fetch('https://reactnative.dev/movies.json');
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Data received:', data.movies.length, 'movies');
      setMovies(data.movies);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  };

  // Generate random progress width
  const getRandomProgress = () => `${Math.random() * 60 + 40}%`;

  // Loading Screen Component
  const LoadingScreen = () => (
    <View style={[styles.loadingContainer, { backgroundColor: colors.loading }]}>
      <StatusBar backgroundColor={colors.loading} barStyle="light-content" />
      <Animated.View 
        style={[
          styles.loadingContent,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <View style={styles.pulsingCircle} />
        </View>
        <Text style={styles.loadingTitle}>🎬 Cinema Hub</Text>
        <Text style={styles.loadingSubtitle}>
          Curating your cinematic experience...
        </Text>
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, styles.dot1]} />
          <Animated.View style={[styles.dot, styles.dot2]} />
          <Animated.View style={[styles.dot, styles.dot3]} />
        </View>
      </Animated.View>
    </View>
  );

  // Movie Item Component
  const MovieItem = ({ item, index }) => (
    <Animated.View 
      style={[
        styles.movieCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          backgroundColor: colors.card
        }
      ]}
    >
      <View style={styles.cardContent}>
        <View style={styles.movieHeader}>
          <View style={[styles.movieNumberContainer, { backgroundColor: colors.accent }]}>
            <Text style={styles.movieNumber}>#{String(index + 1).padStart(2, '0')}</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.movieTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={[styles.ratingBadge, { backgroundColor: 'rgba(6, 182, 212, 0.1)' }]}>
              <Text style={[styles.ratingText, { color: colors.accent }]}>
                ⭐ {(8 + Math.random() * 0.5).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.movieFooter}>
          <View style={styles.yearContainer}>
            <Text style={styles.yearLabel}>RELEASE YEAR</Text>
            <Text style={[styles.movieYear, { color: colors.accent }]}>{item.releaseYear}</Text>
          </View>
          <View style={[styles.genreTag, { backgroundColor: colors.accent2 }]}>
            <Text style={styles.genreText}>CLASSIC</Text>
          </View>
        </View>
        
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: getRandomProgress(), backgroundColor: colors.accent2 }]} />
        </View>
      </View>
    </Animated.View>
  );

  // Header Component
  const Header = () => (
    <View style={[styles.header, { backgroundColor: colors.secondary }]}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>🎬 Cinema Hub</Text>
        <Text style={styles.headerSubtitle}>
          {movies.length} Masterpieces • Updated now
        </Text>
      </View>
      <View style={[styles.headerStats, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{movies.length}</Text>
          <Text style={styles.statLabel}>Movies</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2024</Text>
          <Text style={styles.statLabel}>Latest</Text>
        </View>
      </View>
    </View>
  );

  // List Header Component
  const ListHeader = () => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderTitle}>Featured Collection</Text>
      <Text style={styles.listHeaderSubtitle}>
        Handpicked classics for your watchlist
      </Text>
    </View>
  );

  // Empty State Component
  const EmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No movies found</Text>
    </View>
  );

  // Main return - Loading check
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <StatusBar backgroundColor={colors.secondary} barStyle="light-content" />
      
      <Header />
      
      <FlatList
        data={movies}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => <MovieItem item={item} index={index} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={<EmptyList />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loaderContainer: {
    position: 'relative',
    marginBottom: 30,
  },
  pulsingCircle: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  loadingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  dot1: { 
    opacity: 0.6,
    transform: [{ scale: 0.8 }]
  },
  dot2: { 
    opacity: 0.8,
    transform: [{ scale: 0.9 }]
  },
  dot3: { 
    opacity: 1,
    transform: [{ scale: 1 }]
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  listContainer: {
    padding: 20,
    paddingTop: 30,
  },
  listHeader: {
    marginBottom: 25,
  },
  listHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  listHeaderSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
  },
  movieCard: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  cardContent: {
    borderRadius: 20,
    padding: 20,
  },
  movieHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  movieNumberContainer: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 15,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  movieNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  titleContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 8,
    lineHeight: 24,
  },
  ratingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  movieFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b7280',
    marginRight: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    letterSpacing: 0.5,
  },
  movieYear: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  genreTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  genreText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 16,
  },
});

export default Movies;