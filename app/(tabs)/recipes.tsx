import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Recipes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Recipes</Text>
    </SafeAreaView>
  )
}

export default Recipes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
})