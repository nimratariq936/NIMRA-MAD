import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, GlobalStyles } from '../styles/GlobalStyles';

const SummerScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Pret');

  const summerProducts = {
    Pret: [
      {
          id: 1,
          name: 'Lawn Kurti',
          price: 'PKR 4,999',
          image: 'https://www.desirack.com/cdn/shop/products/image_c8295bcc-7695-4d14-a183-d66637587bf8_1024x1024.jpg?v=1593013127',
        },
        {
          id: 2,
          name: 'Cotton Kurti',
          price: 'PKR 7,499',
          image: 'https://imagescdn.jaypore.com/img/app/product/3/39966043-19594532.jpg?auto=format&w=600',
        },
        {
          id: 3,
          name: 'Chiffon Kurti',
          price: 'PKR 3,999',
          image: 'https://go.sanaullastore.com/cdn/shop/files/atiya-irfan-studio-pret-embroidered-chiffon-kurti-nf-16_3.jpg?v=1758726509&width=1080',
        },
        {
          id: 4,
          name: 'Viscose Kurti',
          price: 'PKR 2,999',
          image: 'https://www.limelight.pk/cdn/shop/files/A1748TP-SML-489_6_-ViscoseKurti-Embroidered_Pret.jpg?v=1753696948&width=1445',
        },
      {
      id: 5,
      name: 'Linen LightSummer',
      price: 'PKR 3,499',
      image: 'https://assets0.mirraw.com/images/11650994/image_zoom.jpeg?1709137725',
      },
      {
      id: 6,
      name: 'Angrakha Style',
      price: 'PKR 6,999',
      image: 'https://www.cotrasworld.com/cdn/shop/files/K455B_1200x.jpg?v=1735027478',
      },
    ],
    Unstitched: [
      {
        id: 7,
        name: 'Lawn Suit Piece',
        price: 'PKR 6,499',
        image: 'https://assets0.mirraw.com/images/12489979/image_zoom.jpeg?1716815715',
      },
      {
        id: 8,
        name: 'Cotton Fabric',
        price: 'PKR 4,999',
        image: 'https://www.fabvoguestudio.com/cdn/shop/files/FVS202360-ST-60-C.jpg?v=1756993410',
      },
      {
      id: 9,
      name: 'Chiffon Fabric',
      price: 'PKR 5,499',
      image: 'https://khanboutique.pk/cdn/shop/files/IMG_5414.jpg?v=1735987051',
      },
      {
      id: 10,
      name: 'Silk Cotton',
      price: 'PKR 8,999',
      image: 'https://www.thecotlin.com/cdn/shop/files/8ee7ba60-a826-4b72-8c72-b3d0af33e419.jpg?v=1721811594',
      },
      {
      id: 11,
      name: 'Organza Fabric',
      price: 'PKR 7,999',
      image: 'https://www.fabpersona.com/cdn/shop/files/WhatsAppImage2024-03-10at1.21.33AM.jpg?v=1710433562&width=1080',
      },
    ],
  };

  return (
    <View style={GlobalStyles.screenContainer}>
      <Text style={GlobalStyles.header}>Summer Collection</Text>
      
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
          {summerProducts[activeCategory].map((product) => (
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

export default SummerScreen;