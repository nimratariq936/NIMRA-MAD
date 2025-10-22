import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyles, Colors } from '../styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const productSections = {
    winter: {
      title: 'Winter Collection',
      products: [
        {
          id: 1,
          name: 'Khaddar Suit',
          price: 'PKR 12,999',
          image: 'https://cdn.shopify.com/s/files/1/1136/8498/products/kle-1007-winter-collection-2020-vol-1-fasunslad-558997_480x480.jpg?v=1603085380',
        },
        {
          id: 2,
          name: 'Woolen Kurti Salwar',
          price: 'PKR 6,499',
          image: 'https://www.anantexports.in/cdn/shop/files/skt-suits-woolen-queen-86001-86008-series-latest-festivewear-designer-salwar-kameez-wholesaler-surat-gujarat-4-2023-11-09-16_51_35.jpg?v=1702228495',
        },
        {
          id: 3,
          name: 'Kashmiri Shawl',
          price: 'PKR 9,999',
          image: 'https://fabareeze.com/cdn/shop/files/kani-rung-shawl-fabareeze-50548314407229_large.webp?v=1734360230',
        },
        {
          id: 4,
          name: 'Marina Suit',
          price: 'PKR 5,999',
          image: 'https://www.mariab.pk/cdn/shop/files/DWW2554BlueFront_A_720x.jpg?v=1757406284',
        },
      ],
      screen: 'Winter'
    },
    summer: {
      title: 'Summer Collection',
      products: [
        {
          id: 5,
          name: 'Lawn Kurti',
          price: 'PKR 4,999',
          image: 'https://www.desirack.com/cdn/shop/products/image_c8295bcc-7695-4d14-a183-d66637587bf8_1024x1024.jpg?v=1593013127',
        },
        {
          id: 6,
          name: 'Cotton Kurti',
          price: 'PKR 7,499',
          image: 'https://imagescdn.jaypore.com/img/app/product/3/39966043-19594532.jpg?auto=format&w=600',
        },
        {
          id: 7,
          name: 'Chiffon Kurti',
          price: 'PKR 3,999',
          image: 'https://go.sanaullastore.com/cdn/shop/files/atiya-irfan-studio-pret-embroidered-chiffon-kurti-nf-16_3.jpg?v=1758726509&width=1080',
        },
        {
          id: 8,
          name: 'Viscose Kurti',
          price: 'PKR 2,999',
          image: 'https://www.limelight.pk/cdn/shop/files/A1748TP-SML-489_6_-ViscoseKurti-Embroidered_Pret.jpg?v=1753696948&width=1445',
        },
      ],
      screen: 'Summer'
    },
    perfumes: {
      title: 'Perfumes',
      products: [
        {
          id: 9,
          name: 'Aqua Di Gio',
          price: 'PKR 8,999',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5RCTOL7mRfHijIaoU3EGNDOobIJ9IZotew&s',
        },
        {
          id: 10,
          name: 'Bleu De Chanel',
          price: 'PKR 12,499',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLWXlEjBTxv9sontloR9tTS3zXMuzVX3p06A&s',
        },
        {
          id: 11,
          name: 'Chanel No. 5',
          price: 'PKR 11,999',
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300',
        },
        {
          id: 12,
          name: 'Jadore',
          price: 'PKR 10,499',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASwGXlURiVjp5e3lrcdhL9nh5d4JsDC2lnAPbrq6yawBYEqWHNRJiMcQjuiTqU7a_xuA&usqp=CAU',
        },
      ],
      screen: 'Perfumes'
    }
  };

  const ProductSection = ({ title, products, screen }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity 
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate(screen)}
        >
          <Text style={styles.seeMoreText}>See More </Text>
          <Feather name="arrow-right" size={16} color={Colors.white} />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
      >
        {products.map((product) => (
          <View key={product.id} style={styles.horizontalProductCard}>
            <Image 
              source={{ uri: product.image }} 
              style={styles.horizontalProductImage}
            />
            <Text style={styles.horizontalProductName}>{product.name}</Text>
            <Text style={styles.horizontalProductPrice}>{product.price}</Text>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={GlobalStyles.screenContainer}>
      <Text style={GlobalStyles.header}>All Products</Text>
      <Text style={styles.subtitle}>Browse our complete collection</Text>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Winter Section */}
        <ProductSection 
          title={productSections.winter.title}
          products={productSections.winter.products}
          screen={productSections.winter.screen}
        />
        
        {/* Summer Section */}
        <ProductSection 
          title={productSections.summer.title}
          products={productSections.summer.products}
          screen={productSections.summer.screen}
        />
        
        {/* Perfumes Section */}
        <ProductSection 
          title={productSections.perfumes.title}
          products={productSections.perfumes.products}
          screen={productSections.perfumes.screen}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  seeMoreText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  horizontalScroll: {
    paddingLeft: 5,
  },
  horizontalProductCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  horizontalProductImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  horizontalProductName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  horizontalProductPrice: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: 8,
  },
  smallButton: {
    backgroundColor: Colors.secondary,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  smallButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen;