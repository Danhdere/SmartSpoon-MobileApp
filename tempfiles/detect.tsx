import { View, StyleSheet } from 'react-native';
import React from 'react';
import FoodDetector from '@/components/FoodDetector';
import { Stack } from 'expo-router';

const DetectScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Food Detection',
          headerShown: true,
        }}
      />
      <View style={styles.content}>
        <FoodDetector />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  }
});

export default DetectScreen;