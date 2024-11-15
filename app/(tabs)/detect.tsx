import { View, StyleSheet } from 'react-native'
import React from 'react'
import FoodDetector from '@/components/ObjectDetector'

const DetectScreen = () => {
  return (
    <View style={styles.container}>
      <FoodDetector />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default DetectScreen