import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

const SocialPost = () => {
    return (
      <View style={styles.container}>
        {/* Profile Image */}
        <Image
          source={{
            uri: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokedex/d/d1/Lisa_Quagsire_M3.png',
          }}
          style={styles.profileImage}
        />
  
        {/* Content Block */}
        <View style={styles.contentBlock}>
          {/* Title */}
          <Text style={styles.title}>
            <Text style={styles.boldText}>Sean</Text> made{' '}
            <Text style={styles.boldText}>Steak</Text>
          </Text>
  
          {/* Tag Button */}
          <TouchableOpacity style={styles.tagButton}>
            <Text style={styles.tagText}>Japanese</Text>
          </TouchableOpacity>
  
          {/* Last Made Date */}
          <Text style={styles.lastMadeText}>Last made: 11-11-2024</Text>
  
          {/* Icons Row */}
          <View style={styles.iconsRow}>
            {/* Left-aligned Icons */}
            <View style={styles.leftIcons}>
              <FontAwesome name="heart-o" size={14} style={styles.icon} />
              <FontAwesome name="comment-o" size={14} style={styles.icon} />
              <FontAwesome name="share" size={14} style={styles.icon} />
            </View>
  
            {/* Right-aligned Bookmark Icon */}
            <FontAwesome name="bookmark-o" size={14} style={styles.bookmarkIcon} />
          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 10,
      margin: 10,
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15, // Add spacing between the profile image and content block
    },
    contentBlock: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      marginBottom: 5,
    },
    boldText: {
      fontWeight: 'bold',
    },
    tagButton: {
      borderWidth: 1,
      borderColor: '#007BFF',
      borderRadius: 15,
      paddingVertical: 5,
      paddingHorizontal: 10,
      alignSelf: 'flex-start',
      marginBottom: 5,
    },
    tagText: {
      color: '#007BFF',
      fontSize: 8,
    },
    lastMadeText: {
      fontSize: 12,
      color: '#555',
      marginBottom: 10,
    },
    iconsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10, // Add space above the icons row
    },
    leftIcons: {
      flexDirection: 'row',
    },
    icon: {
      marginRight: 15,
      color: '#555',
    },
    bookmarkIcon: {
      color: '#555',
    },
  });

export default SocialPost