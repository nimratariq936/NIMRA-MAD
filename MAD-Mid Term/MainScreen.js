import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { GlobalStyles, Colors } from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import MainPageImage from '../assets/images/MainPageImage.png';
import { Feather } from '@expo/vector-icons';

const MainScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 1,
      name: 'HOME',
      image: 'https://media.istockphoto.com/id/1210308463/photo/pastel-pink-living-room-with-sofa-and-furniture.jpg?s=612x612&w=0&k=20&c=aXguNSuo-__rMq2-DXyrfPQ9YENH0ZxNOu68CfH1iSw=',
      screen: 'Home',
    },
    {
      id: 2,
      name: 'WINTER COLLECTION',
      image: 'https://wallpapers.com/images/hd/amazing-4k-winter-adbo34c3ige95rg5.jpg',
      screen: 'Winter',
    },
    {
      id: 3,
      name: 'SUMMER COLLECTION', 
      image: 'https://img.freepik.com/free-photo/3d-render-palm-tree-landscape-against-sunset-sky_1048-6168.jpg?semt=ais_hybrid&w=740&q=80',
      screen: 'Summer',
    },
    {
      id: 4,
      name: 'PERFUMES',
      image: 'https://pikaso.cdnpk.net/private/production/2550834027/conversions/upload-preview.jpg?token=exp=1784419200~hmac=f56eb1b92cbface7b52832ca77f72a4a7161e6689b74c81542a0407dce6706bf',
      screen: 'Perfumes',
    },
    {
      id: 5,
      name: 'SALE',
      image: 'https://img.freepik.com/premium-photo/baby-pink-rough-abstract-background-design_851755-231697.jpg',
      screen: 'Sale',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header with Search Bar and Icons */}
      <View style={styles.header}>
        {/* Left side - Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
        </View>
        
        {/* Right side - Icons */}
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="bell" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="user" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* New Rounded Sale Banner */}
        <View style={styles.saleBanner}>
          {/* Left side - Text content */}
          <View style={styles.saleContent}>
            <Text style={styles.saleTitle}>UPTO 50%</Text>
            <Text style={styles.saleSubtitle}>OFF</Text>
            <Text style={styles.endsSoon}>ENDS SOON</Text>
            
            <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Sale')}>
              <Text style={styles.shopNowText}>Shop Now </Text>
              <Feather name="arrow-right" size={18} color="black" />
            </TouchableOpacity>
          </View>

          {/* Right side - Girl image */}
          <Image 
            source={MainPageImage}
            style={styles.girlImage}
            resizeMode="contain"
          />
        </View>

        {/* Categories Grid */}
        <Text style={styles.sectionTitle}>CATEGORIES</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate(category.screen)}
            >
              <Image 
                source={{ uri: category.image }} 
                style={styles.categoryImage}
              />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Products */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <View style={styles.featuredGrid}>
            <View style={styles.featuredItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200' }}
                style={styles.featuredImage}
              />
              <Text style={styles.featuredName}>Winter Coat</Text>
              <Text style={styles.featuredPrice}>PKR 12,999</Text>
            </View>
            <View style={styles.featuredItem}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200' }}
                style={styles.featuredImage}
              />
              <Text style={styles.featuredName}>Summer Dress</Text>
              <Text style={styles.featuredPrice}>PKR 7,499</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar - FIXED POSITION */}
      <View style={styles.bottomNav}>
        {/* Home Icon - Now navigates to HomeScreen */}
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={20} color={Colors.primary} />
          <Text style={[styles.navText, { color: Colors.primary }]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Feather name="shopping-bag" size={20} color={Colors.text} />
          <Text style={styles.navText}>Shop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Sale')}>
          <Feather name="shopping-cart" size={20} color={Colors.text} />
          <Text style={styles.navText}>Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Feather name="heart" size={20} color={Colors.text} />
          <Text style={styles.navText}>Wishlist</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={20} color={Colors.text} />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingBottom: 25, // Added bottom padding to prevent overlap
  },
  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 5,
    paddingBottom: 8,
    backgroundColor: Colors.primary,
    height: 60,
  },
  // Search Bar Styles
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 15,
    height: 40,
    maxWidth: '70%',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 80,
  },
  iconButton: {
    marginLeft: 16,
  },
  saleBanner: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginHorizontal: 15,
    marginVertical: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  girlImage: {
    width: 130,
    height: 190,
    borderRadius: 15,
  },
  saleContent: {
    flex: 1,
    justifyContent: 'center',
  },
  saleTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  saleSubtitle: {
    fontSize: 26,
    color: '#ffffffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  endsSoon: {
    fontSize: 16,
    color: '#ffffffff',
    fontWeight: '600',
    marginBottom: 20,
    opacity: 0.9,
  },
  shopNowButton: {
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    width: 140,
  },
  shopNowText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  // Scroll View
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 70, // Added padding to make space for bottom nav
  },
  // Section Titles
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    marginTop: 5,
    marginHorizontal: 16,
  },
  // Categories
  categoriesContainer: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  categoryCard: {
    height: 200,
    marginVertical: 6,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    padding: 90,
  },
  categoryText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Featured Products
  featuredSection: {
    marginBottom: 15,
    marginHorizontal: 16,
  },
  featuredGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featuredItem: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 6,
  },
  featuredName: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 3,
  },
  featuredPrice: {
    fontSize: 13,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  // Bottom Navigation - FIXED POSITION
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12, // Increased padding
    paddingBottom: 20, // Extra bottom padding for phone navigation bar
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70, // Increased height
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  navText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '500',
    marginTop: 5, // Increased margin
  },
});

export default MainScreen;