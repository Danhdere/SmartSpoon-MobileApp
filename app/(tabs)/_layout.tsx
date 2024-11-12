import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="pantry"
        options={{
          title: "Pantry",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout