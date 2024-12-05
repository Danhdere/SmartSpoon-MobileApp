import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Define the type for SocialPost props
type SocialPostProps = {
  name: string;
  food: string;
  image: string;
  date: string;
};


const SocialPost: React.FC<SocialPostProps> = ({ name, food, image, date }) => {
  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={{ uri: image }}
        style={styles.profileImage}
      />

      {/* Content Block */}
      <View style={styles.contentBlock}>
        {/* Title */}
        <Text style={styles.title}>
          <Text style={styles.boldText}>{name}</Text> made{' '}
          <Text style={styles.boldText}>{food}</Text>
        </Text>

        {/* Last Made Date */}
        <Text style={styles.lastMadeText}>Last made: {date}</Text>

        {/* Icons Row */}
        <View style={styles.iconsRow}>
          <View style={styles.leftIcons}>
            <FontAwesome name="heart-o" size={14} style={styles.icon} />
            <FontAwesome name="comment-o" size={14} style={styles.icon} />
            <FontAwesome name="share" size={14} style={styles.icon} />
          </View>
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
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
  lastMadeText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default SocialPost;