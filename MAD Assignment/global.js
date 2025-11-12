import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
  },
  // Beautiful Instagram-like font for app name
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'System', // This will use the system font which is nice
    color: '#E1306C',
    textAlign: 'center',
  },
  appTitleBeautiful: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#E1306C',
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    backgroundColor: '#405DE6',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  
  // STORIES STYLES
  storiesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#E1306C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  storyText: {
    fontSize: 12,
    color: '#262626',
  },
  
  // POST STYLES
  postContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  postUsername: {
    fontWeight: 'bold',
    color: '#262626',
  },
  postImage: {
    width: width,
    height: width, // Square images like Instagram
    backgroundColor: '#f0f0f0',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  postLikes: {
    fontWeight: 'bold',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  postCaption: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  postComments: {
    paddingHorizontal: 10,
    color: '#8e8e8e',
    marginBottom: 10,
  },
  postTime: {
    paddingHorizontal: 10,
    color: '#8e8e8e',
    fontSize: 12,
    marginBottom: 10,
  },
});