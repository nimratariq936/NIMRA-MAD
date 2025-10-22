import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Colors, GlobalStyles } from '../styles/GlobalStyles';

const PerfumesScreen = () => {
  const [activeCategory, setActiveCategory] = useState('Men');

  const perfumes = {
    Men: [
      {
        id: 1,
        name: 'Aqua Di Gio',
        price: 'PKR 8,999',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh5RCTOL7mRfHijIaoU3EGNDOobIJ9IZotew&s',
      },
      {
        id: 2,
        name: 'Bleu De Chanel',
        price: 'PKR 12,499',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLWXlEjBTxv9sontloR9tTS3zXMuzVX3p06A&s',
      },
      {
        id: 3,
        name: 'Sauvage',
        price: 'PKR 9,999',
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300',
      },
    ],
    Women: [
      {
        id: 4,
        name: 'Chanel No. 5',
        price: 'PKR 11,999',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300',
      },
      {
        id: 5,
        name: 'Jadore',
        price: 'PKR 10,499',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTASwGXlURiVjp5e3lrcdhL9nh5d4JsDC2lnAPbrq6yawBYEqWHNRJiMcQjuiTqU7a_xuA&usqp=CAU',
      },
      {
        id: 6,
        name: 'Flower Bomb',
        price: 'PKR 13,999',
        image: 'https://jcpenney.scene7.com/is/image/JCPenney/DP0521202507163117M?resmode=sharp2&op_sharpen=1&wid=350&hei=350',
      },
    ],
  };

  return (
    <View style={GlobalStyles.screenContainer}>
      <Text style={GlobalStyles.header}>Perfumes Collection</Text>
      
      {/* Gender Selection */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderCard,
            activeCategory === 'Men' && styles.activeGenderCard,
          ]}
          onPress={() => setActiveCategory('Men')}
        >
          <Image 
            source={{ uri: 'https://imgcdn.stablediffusionweb.com/2024/4/11/0a72b6eb-c62f-46c6-994c-f9f28e8933d3.jpg' }}
            style={styles.genderImage}
          />
          <Text style={[
            styles.genderText,
            activeCategory === 'Men' && styles.activeGenderText
          ]}>For Him</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.genderCard,
            activeCategory === 'Women' && styles.activeGenderCard,
          ]}
          onPress={() => setActiveCategory('Women')}
        >
          <Image 
            source={{ uri: 'https://www.shutterstock.com/image-photo/photo-nice-long-hairdo-optimistic-600nw-1937697301.jpg' }}
            style={styles.genderImage}
          />
          <Text style={[
            styles.genderText,
            activeCategory === 'Women' && styles.activeGenderText
          ]}>For Her</Text>
        </TouchableOpacity>
      </View>

      {/* Perfumes List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={GlobalStyles.subHeader}>{activeCategory}'s Perfumes</Text>
        <View style={styles.perfumesList}>
          {perfumes[activeCategory].map((perfume) => (
            <View key={perfume.id} style={[GlobalStyles.card, styles.perfumeCard]}>
              <Image 
                source={{ uri: perfume.image }} 
                style={styles.perfumeImage}
              />
              <View style={styles.perfumeInfo}>
                <Text style={GlobalStyles.productName}>{perfume.name}</Text>
                <Text style={GlobalStyles.productPrice}>{perfume.price}</Text>
                <TouchableOpacity style={[GlobalStyles.button, styles.smallButton]}>
                  <Text style={GlobalStyles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = {
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  genderCard: {
    width: '48%',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeGenderCard: {
    borderColor: Colors.primary,
  },
  genderImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  activeGenderText: {
    color: Colors.primary,
  },
  perfumesList: {
    marginBottom: 20,
  },
  perfumeCard: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
  },
  perfumeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  perfumeInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
};

export default PerfumesScreen;