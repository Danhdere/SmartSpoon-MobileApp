import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './app/(tabs)/profile';
import CreateUser from './components/screens/CreateUser';

// Define the RootStackParamList here in app.tsx since it's the root
export type RootStackParamList = {
  Profile: undefined;
  CreateUser: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen 
          name="Profile" 
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CreateUser" 
          component={CreateUser}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}