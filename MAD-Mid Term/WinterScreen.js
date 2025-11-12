import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, GlobalStyles } from '../styles/GlobalStyles';

const WinterScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Pret');

  const winterProducts = {
    Pret: [
      {
          id: 1,
          name: 'Khaddar Shalwar Kameez',
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
      {
      id: 5,
      name: 'Velvet Kurti',
      price: 'PKR 3,499',
      image: 'https://www.farahtalibaziz.com.pk/images/thumbs/0020303_anemos-shirt-and-dupatta_1000.jpeg',
      },
      {
      id: 6,
      name: 'Linen Shalwar Kameez',
      price: 'PKR 8,499',
      image: 'https://images.pexels.com/photos/18977034/pexels-photo-18977034/free-photo-of-western-dresses-shoot-by-dhanno.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
    ],
    Unstitched: [
      {
        id: 7,
        name: 'Woolen Suit Piece',
        price: 'PKR 8,499',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTDKQKUFFRSe2o8JBNXHX89jtHHqkIK8wI8A&s',
      },
      {
        id: 8,
        name: 'Kurta Set',
        price: 'PKR 5,999',
        image: 'https://cdn.shopify.com/s/files/1/2337/7003/files/ea13b90af1d827cfb9c8791ffd7e3c5b.jpg?v=1717736247&width=300',
      },
      {
      id: 9,
      name: 'Marina Suit',
      price: 'PKR 12,999',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWWtERgf5eiasItRei-s3W-c4STbun0K-P7Q&s',
      },
      {
      id: 10,
      name: 'Embroidered Khaddar',
      price: 'PKR 7,499',
      image: 'https://peachmode.com/cdn/shop/files/1_RAJT-7678-PINK-PEACHMODE_300x.jpg?v=1760180979',
      },
      {
      id: 11,
      name: 'Cotton Karandi',
      price: 'PKR 4,999',
      image: 'https://bayaprints.com/cdn/shop/files/16_d46eb220-5904-472a-9e27-7d2d6e1d6187.jpg?v=1759238323',
      },
    ],
  };

  return (
    <View style={GlobalStyles.screenContainer}>
      <Text style={GlobalStyles.header}>Winter Collection</Text>
      
      {/* Category Toggle */}
      <View style={styles.categoryToggle}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeCategory === 'Pret' && styles.activeToggleButton,
          ]}
          onPress={() => setActiveCategory('Pret')}
        >
          <Text
            style={[
              styles.toggleText,
              activeCategory === 'Pret' && styles.activeToggleText,
            ]}
          >
            Pret
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeCategory === 'Unstitched' && styles.activeToggleButton,
          ]}
          onPress={() => setActiveCategory('Unstitched')}
        >
          <Text
            style={[
              styles.toggleText,
              activeCategory === 'Unstitched' && styles.activeToggleText,
            ]}
          >
            Unstitched
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {winterProducts[activeCategory].map((product) => (
            <View key={product.id} style={[GlobalStyles.card, styles.productCard]}>
              <Image 
                source={{ uri: product.image }} 
                style={GlobalStyles.productImage}
              />
              <Text style={GlobalStyles.productName}>{product.name}</Text>
              <Text style={GlobalStyles.productPrice}>{product.price}</Text>
              <TouchableOpacity style={GlobalStyles.button}>
                <Text style={GlobalStyles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  categoryToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggleButton: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  activeToggleText: {
    color: Colors.white,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
  },
};

export default WinterScreen;