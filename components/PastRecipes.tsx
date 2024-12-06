import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Pressable, StyleSheet, Text, View } from 'react-native'


const PastRecipes = () => {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Your Past Recipes</Text>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // height: '100%',
    flexDirection: "column",
    justifyContent: 'space-between',
    backgroundColor: "white"
  },
  title: {
    textAlign: 'center',
    color: '#467140',
    fontSize: 40,
    padding: 15, 
    // borderBottomWidth: 2,
    // borderBottomColor: "#8B5E3C",
  },

});

export default PastRecipes;