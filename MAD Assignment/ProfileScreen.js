import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CounterContext } from '../context/CounterContext';
import { globalStyles } from '../styles/global';

export default function ProfileScreen({ route }) {
  const { count, setCount } = useContext(CounterContext);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const post = route.params?.post;
  const username = route.params?.username || 'Guest';

  // useEffect without dependency array - runs on every render
  useEffect(() => {
    console.log('ProfileScreen rendered or re-rendered');
  });

  // useEffect with dependency - runs when post changes
  useEffect(() => {
    if (post) {
      console.log('Post data received:', post.user);
    }
  }, [post]);

  const addComment = () => {
    if (comment.trim()) {
      setComments(prev => [...prev, {
        id: Date.now().toString(),
        user: username,
        text: comment
      }]);
      setComment('');
    }
  };

  const toggleSave = () => {
    setIsSaved(prev => !prev);
  };

  if (!post) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Feather name="alert-circle" size={50} color="#dbdbdb" />
        <Text style={{ marginTop: 10, color: '#666' }}>No post selected</Text>
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container}>
      {/* Beautiful Big Title with Left Spacing */}
      <View style={{ 
        paddingHorizontal: 15, 
        paddingVertical: 10,
        marginBottom: 10
      }}>
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#E1306C',
          fontStyle: 'italic',
          letterSpacing: -0.5,
          textShadowColor: 'rgba(0, 0, 0, 0.1)',
          textShadowOffset: { width: 1, height: 1 },
          textShadowRadius: 3,
        }}>
          Post Details
        </Text>
      </View>
      
      {/* Post Header with 3 dots */}
      <View style={globalStyles.postHeader}>
        <View style={globalStyles.postUserInfo}>
          <Image 
            source={{ uri: `https://picsum.photos/32/32?random=${post.id}` }}
            style={globalStyles.postAvatar}
          />
          <Text style={globalStyles.postUsername}>{post.user}</Text>
        </View>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={24} color="#262626" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image 
        source={{ uri: post.image }}
        style={globalStyles.postImage}
      />

      {/* Post Actions */}
      <View style={globalStyles.postActions}>
        <View style={globalStyles.leftActions}>
          <TouchableOpacity 
            style={globalStyles.actionButton}
            onPress={() => setCount(count + 1)}
          >
            <Feather name="heart" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.actionButton}>
            <Feather name="message-circle" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.actionButton}>
            <Feather name="send" size={24} color="#262626" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={toggleSave}>
          <Feather 
            name={isSaved ? "bookmark" : "bookmark"} 
            size={24} 
            color={isSaved ? "#262626" : "#262626"} 
            fill={isSaved ? "#262626" : "none"}
          />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={globalStyles.postLikes}>{post.likes + count} likes</Text>
      <Text style={globalStyles.postCaption}>
        <Text style={{ fontWeight: 'bold' }}>{post.user} </Text>
        {post.content}
      </Text>
      <Text style={globalStyles.postTime}>{post.time}</Text>

      {/* Comments Section */}
      <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
        <Text style={{ 
          fontWeight: 'bold', 
          marginBottom: 10, 
          fontSize: 18,
          color: '#262626'
        }}>
          Comments ({comments.length})
        </Text>
        
        {/* Add Comment */}
        <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center' }}>
          <TextInput
            style={[globalStyles.input, { flex: 1, marginRight: 10, marginVertical: 0 }]}
            placeholder="Add a comment..."
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity 
            style={[globalStyles.button, { 
              paddingHorizontal: 20, 
              marginVertical: 0,
              backgroundColor: '#E1306C'
            }]}
            onPress={addComment}
          >
            <Text style={globalStyles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Comments List */}
        {comments.map(item => (
          <View key={item.id} style={{ 
            padding: 10, 
            backgroundColor: '#f8f8f8', 
            marginVertical: 5, 
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>@{item.user}</Text>
              <Text>{item.text}</Text>
            </View>
            <TouchableOpacity>
              <Feather name="heart" size={16} color="#8e8e8e" />
            </TouchableOpacity>
          </View>
        ))}
        {comments.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Feather name="message-circle" size={40} color="#dbdbdb" />
            <Text style={{ 
              color: '#666', 
              textAlign: 'center', 
              marginTop: 10,
              lineHeight: 20
            }}>
              No comments yet.{'\n'}Be the first to comment!
            </Text>
          </View>
        )}
      </View>

      {/* Global Like Counter */}
      <View style={{ 
        backgroundColor: '#f0f0f0', 
        padding: 15, 
        margin: 10, 
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      }}>
        <Feather name="heart" size={20} color="#E1306C" style={{ marginRight: 8 }} />
        <Text style={{ fontWeight: 'bold' }}>Global Engagement: {count} likes</Text>
      </View>
    </ScrollView>
  );
}