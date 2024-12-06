import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import SocialPost from '@/components/SocialPost';

const SocialThread = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
    { id: '1', name: 'Sean', food: 'Steak', image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokedex/d/d1/Lisa_Quagsire_M3.png', date: '11-11-2024' },
    { id: '2', name: 'Danh', food: 'Sundubu-jjigae', image: 'https://i.pinimg.com/236x/a8/4a/a3/a84aa310f33862e53c30f55bdf94b013.jpg', date: '10-10-2024' },
    { id: '3', name: 'Kaleen', food: 'Sukiyaki', image: 'https://i.pinimg.com/236x/6a/db/7e/6adb7ec6378d802b8279cc8d6ef3018f.jpg', date: '09-09-2024' },
    { id: '4', name: 'Wilson', food: 'Tiramisu', image: 'https://i.pinimg.com/236x/68/31/12/68311248ba2f6e0ba94ff6da62eac9f6.jpg', date: '09-09-2024' },
  ]);

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) =>
    `${post.name} ${post.food}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Spoony</Text>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search a friend, cuisine, dish, etc."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      {/* Feed Label */}
      <Text style={styles.feedLabel}>YOUR FEED</Text>

      {/* Social Posts */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SocialPost
            name={item.name}
            food={item.food}
            image={item.image}
            date={item.date}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  feedLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
});

export default SocialThread;