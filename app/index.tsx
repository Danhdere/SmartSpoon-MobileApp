import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'

export default function App() {

  if (true) {
    return <Redirect href='/pantry' />
  }

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <Link href='/profile' style={{ color: 'blue' }}>Go to Profile</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
})