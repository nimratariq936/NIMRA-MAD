import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, GlobalStyles } from '../styles/GlobalStyles';

const SaleScreen = () => {
  const saleProducts = [
    {
      id: 1,
      name: 'Kashmiri Shawl',
      originalPrice: 'PKR 9,999',
      salePrice: 'PKR 6,999',
      discount: '38% OFF',
      image: 'https://fabareeze.com/cdn/shop/files/kani-rung-shawl-fabareeze-50548314407229_large.webp?v=1734360230',
    },
    {
      id: 2,
      name: 'Linen Shalwar Kameez',
      originalPrice: 'PKR 8,499',
      salePrice: 'PKR 5,999',
      discount: '44% OFF',
      image: 'https://images.pexels.com/photos/18977034/pexels-photo-18977034/free-photo-of-western-dresses-shoot-by-dhanno.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      id: 3,
      name: 'Bleu De Chanel',
      originalPrice: 'PKR 9,999',
      salePrice: 'PKR 6,499',
      discount: '43% OFF',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLWXlEjBTxv9sontloR9tTS3zXMuzVX3p06A&s',
    },
    {
      id: 4,
      name: 'Silk Cotton',
      originalPrice: 'PKR 9,999',
      salePrice: 'PKR 4,999',
      discount: '50% OFF',
      image: 'https://www.thecotlin.com/cdn/shop/files/8ee7ba60-a826-4b72-8c72-b3d0af33e419.jpg?v=1721811594',
    },
    {
      id: 5,
      name: 'Woolen Sweater',
      originalPrice: 'PKR 8,999',
      salePrice: 'PKR 6,999',
      discount: '50% OFF',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTW8zKJjUAb1OevI_a8HxBZen6N-w7KL5kCw&s',
    },
    {
      id: 6,
      name: 'Organza Fabric',
      originalPrice: 'PKR 7,999',
      salePrice: 'PKR 5,999',
      discount: '37% OFF',
      image: 'https://www.fabpersona.com/cdn/shop/files/WhatsAppImage2024-03-10at1.21.33AM.jpg?v=1710433562&width=1080',
    },
  ];

  return (
    <View style={GlobalStyles.screenContainer}>
      <View style={styles.saleHeader}>
        <Text style={styles.saleTitle}>SALE</Text>
        <Text style={styles.saleSubtitle}>Limited Time Offers! 🔥</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.saleGrid}>
          {saleProducts.map((product) => (
            <View key={product.id} style={[GlobalStyles.card, styles.saleCard]}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{product.discount}</Text>
              </View>
              <Image 
                source={{ uri: product.image }} 
                style={GlobalStyles.productImage}
              />
              <Text style={GlobalStyles.productName}>{product.name}</Text>
              
              {/* Price Section */}
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                <Text style={styles.salePrice}>{product.salePrice}</Text>
              </View>
              
              <TouchableOpacity style={[GlobalStyles.button, styles.saleButton]}>
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
  saleHeader: {
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  saleTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 5,
  },
  saleSubtitle: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: '600',
  },
  saleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  saleCard: {
    width: '48%',
    marginBottom: 16,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.gray,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  salePrice: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: 'bold',
  },
  saleButton: {
    backgroundColor: Colors.secondary,
    marginTop: 8,
  },
};

export default SaleScreen;