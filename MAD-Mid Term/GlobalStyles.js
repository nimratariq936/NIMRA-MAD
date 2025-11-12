import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Colors = {
  primary: '#e10047ff',
  secondary: '#e10047ff',
  background: '#ffecf3ff',
  text: '#000000',
  white: '#FFFFFF',
  gray: '#BDC3C7',
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.primary,
    marginVertical: 15,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
});