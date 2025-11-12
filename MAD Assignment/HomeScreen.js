import React, { useState, useContext, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image,
  ScrollView 
} from 'react-native';
import { Feather } from '@expo/vector-icons'; // Import Feather icons
import { CounterContext } from '../context/CounterContext';
import { globalStyles } from '../styles/global';

export default function HomeScreen({ navigation, route }) {
  const { count, setCount } = useContext(CounterContext);
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]); // Track saved posts
  const [loading, setLoading] = useState(true);
  const username = route.params?.username || 'Guest';

  // Simulating API call with Promise for both posts and stories
  useEffect(() => {
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockStories = [
            { id: '1', user: 'your_story', username: username, isYourStory: true },
            { id: '2', user: 'Nimra936', username: 'Nimra936' },
            { id: '3', user: 'Ayesha_5436', username: 'Ayesha_5436' },
            { id: '4', user: 'Aimen.46', username: 'Aimen.46' },
            { id: '5', user: 'Areeza_Awan', username: 'Areeza_Awan' },
            { id: '6', user: 'its_Rimsha', username: 'its_Rimsha' },
          ];

          const mockPosts = [
            { 
              id: '1', 
              user: 'NimraTariq936', 
              username: 'NimraTariq936',
              content: 'Beautiful sunset at the beach! 🌅✨ #travel #sunset',
              likes: 124,
              comments: 23,
              time: '2 hours ago',
              image: 'https://images.stockcake.com/public/b/f/3/bf379a3c-1992-479f-8910-f737efa570b4_large/sunset-beach-stroll-stockcake.jpg'
            },
            { 
              id: '2', 
              user: 'Ayesha_5436', 
              username: 'Ayesha_5436',
              content: 'Morning coffee hits different ☕❤️ #coffee #morning',
              likes: 89,
              comments: 12,
              time: '4 hours ago',
              image: 'https://t4.ftcdn.net/jpg/01/88/62/47/360_F_188624757_a0UW7bG5WAryClVqOjiDOPz9qEAxZ5uz.jpg'
            },
            { 
              id: '3', 
              user: 'Ali_Art_World_246', 
              username: 'Ali_Art_World_246',
              content: 'Just created a stunning digital art piece! 🎨✨ #Art #Creativity',
              likes: 156,
              comments: 45,
              time: '6 hours ago',
              image: 'https://inspirationtuts.com/wp-content/uploads/2022/03/26-How-to-Make-Money-from-Digital-Art-1.png'
            },
            { 
              id: '4', 
              user: 'simaab_malik23', 
              username: 'simaab_malik23',
              content: 'Elegance is a state of mind',
              likes: 203,
              comments: 67,
              time: '1 day ago',
              image: 'https://i.pinimg.com/736x/cd/26/37/cd2637561eee54d255916ec9002a8fa7.jpg'
            },
          ];
          
          resolve({ stories: mockStories, posts: mockPosts });
        }, 2000);
      });
    };

    // Using Promise with .then() 
    fetchData()
      .then(({ stories, posts }) => {
        setStories(stories);
        setPosts(posts);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching data:', error);
        setLoading(false);
      });
  }, [username]);

  // Toggle save post (demonstrating state update with previous state)
  const toggleSavePost = (postId) => {
    setSavedPosts(prev => {
      if (prev.includes(postId)) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  // Check if post is saved
  const isPostSaved = (postId) => {
    return savedPosts.includes(postId);
  };

  // Render individual story item
  const renderStory = ({ item }) => (
    <TouchableOpacity 
      style={globalStyles.storyItem}
      onPress={() => {
        handleStoryPress(item);
      }}
    >
      <View style={globalStyles.storyCircle}>
        <Image 
          source={{ uri: `https://picsum.photos/60/60?random=${item.id}` }}
          style={globalStyles.storyImage}
        />
        {item.isYourStory && (
          <View style={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            backgroundColor: '#405DE6',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: 'white'
          }}>
            <Feather name="plus" size={12} color="white" />
          </View>
        )}
      </View>
      <Text style={globalStyles.storyText}>
        {item.isYourStory ? 'Your Story' : item.user}
      </Text>
    </TouchableOpacity>
  );

  // Callback function for story press
  const handleStoryPress = (story) => {
    if (story.isYourStory) {
      console.log('Add to your story');
    } else {
      console.log(`View ${story.user}'s story`);
    }
  };

  // Render individual post item
  const renderPost = ({ item }) => (
    <View style={globalStyles.postContainer}>
      {/* Post Header with 3 dots icon */}
      <View style={globalStyles.postHeader}>
        <View style={globalStyles.postUserInfo}>
          <Image 
            source={{ uri: `https://picsum.photos/32/32?random=${item.id}` }}
            style={globalStyles.postAvatar}
          />
          <Text style={globalStyles.postUsername}>{item.user}</Text>
        </View>
        <TouchableOpacity onPress={() => console.log('More options for', item.user)}>
          <Feather name="more-horizontal" size={24} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image 
        source={{ uri: item.image }}
        style={globalStyles.postImage}
      />

      {/* Post Actions - Like, Comment, Share, Save */}
      <View style={globalStyles.postActions}>
        <View style={globalStyles.leftActions}>
          <TouchableOpacity 
            style={globalStyles.actionButton}
            onPress={() => setCount(count + 1)}
          >
            <Feather name="heart" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={globalStyles.actionButton}
            onPress={() => navigation.navigate('Profile', { 
              post: item,
              username: username,
              likeCount: count
            })}
          >
            <Feather name="message-circle" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.actionButton}>
            <Feather name="send" size={24} color="#262626" />
          </TouchableOpacity>
        </View>
        
        {/* Save Post Icon */}
        <TouchableOpacity onPress={() => toggleSavePost(item.id)}>
          <Feather 
            name={isPostSaved(item.id) ? "bookmark" : "bookmark"} 
            size={24} 
            color={isPostSaved(item.id) ? "#262626" : "#262626"} 
            fill={isPostSaved(item.id) ? "#262626" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* Post Likes */}
      <Text style={globalStyles.postLikes}>{item.likes + count} likes</Text>

      {/* Post Caption */}
      <Text style={globalStyles.postCaption}>
        <Text style={{ fontWeight: 'bold' }}>{item.user} </Text>
        {item.content}
      </Text>

      {/* View Comments */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Profile', { 
          post: item,
          username: username,
          likeCount: count
        })}
      >
        <Text style={globalStyles.postComments}>
          View all {item.comments} comments
        </Text>
      </TouchableOpacity>

      {/* Post Time */}
      <Text style={globalStyles.postTime}>{item.time}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#E1306C" />
        <Text style={{ marginTop: 10 }}>Loading your feed...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {/* Instagram-like Header with Beautiful App Name */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dbdbdb'
      }}>
        <Text style={globalStyles.appTitleBeautiful}>
          Sociafyy
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Feather name="plus-square" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="send" size={24} color="#262626" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories Section - Horizontal ScrollView */}
      <View style={globalStyles.storiesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 5 }}
        >
          {stories.map(story => (
            <TouchableOpacity 
              key={story.id}
              style={globalStyles.storyItem}
              onPress={() => handleStoryPress(story)}
            >
              <View style={globalStyles.storyCircle}>
                <Image 
                  source={{ uri: `https://picsum.photos/60/60?random=${story.id}` }}
                  style={globalStyles.storyImage}
                />
                {story.isYourStory && (
                  <View style={{
                    position: 'absolute',
                    bottom: -2,
                    right: -2,
                    backgroundColor: '#405DE6',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: 'white'
                  }}>
                    <Feather name="plus" size={12} color="white" />
                  </View>
                )}
              </View>
              <Text style={globalStyles.storyText}>
                {story.isYourStory ? 'Your Story' : story.user}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts Section - Vertical FlatList */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={{ 
            padding: 15, 
            textAlign: 'center', 
            color: '#666',
            borderBottomWidth: 1,
            borderBottomColor: '#dbdbdb',
            backgroundColor: '#fafafa'
          }}>
            Welcome, @{username}! • Global Likes: {count} ❤️
          </Text>
        }
      />
    </View>
  );
}