// GlobalStyles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  black: '#000000',
  primary: '#267A8E', // Deep Teal (from Splash Text)
  secondary: '#CD950C', // Gold (from Splash Icon)
  background: '#f7f4eaff', // Light Blue (from Splash Background)
  white: '#FFFFFF',
  gray: '#666666',
  darkGray: '#333333',
  lightGray: '#f0f0f0',
  error: '#f44336',
  success: '#4caf50',
  warning: '#ff9800',
  info: '#2196f3',
  // Derived lighter shades for specific UI elements
  primaryLight: '#4c6f9dff',
  secondaryLight: '#FADF8D',
  backgroundLight: '#f7feffff',
};

export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
};

export const GlobalStyles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 20, // Add space at the top
    paddingHorizontal: 0,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  // Text Styles
  Welcomeheader: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Playfair Display' : 'serif',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
    fontWeight: 'semi-bold',
    color: colors.black,
    lineHeight: 20,
  },
  textBold: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    lineHeight: 24,
  },
  textSmall: {
    fontSize: 14,
    color: colors.black,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'semi-bold',
    color: colors.black,
    marginBottom: 5,
  },
  caption: {
    fontSize: 12,
    color: colors.black,
    marginTop: 5,
  },

  // Card Styles

  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 15,
    marginBottom: 80,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardFlat: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },

  // Button Styles
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  secondaryButtonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 10,
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  textButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },

  // Input Styles
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 4,
    color: colors.black,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.white,
  },
  inputError: {
    borderColor: '#FF6B6B',
    borderWidth: 1,
    backgroundColor: colors.white,
  },

  // Quote Styles
  quoteContainer: {
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  quoteText: {
    fontSize: 10,
    fontStyle: 'italic',
    color: colors.black,
    textAlign: 'center',
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10,
  },

  // List Styles
  listItem: {
    backgroundColor: colors.white,
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  listItemFlat: {
    backgroundColor: colors.background,
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },

  // University Text Styles
  universityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  campusText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Utility Styles
  divider: {
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: 20,
  },
  spacer: {
    height: 20,
  },
  spacerSm: {
    height: 10,
  },
  spacerMd: {
    height: 15,
  },
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'flex',
  },

  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 15,
  },

  // Row Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  // Badge Styles
  badge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  badgeSecondary: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  badgeSecondaryText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: '600',
  },
});

// Export everything
export default GlobalStyles;