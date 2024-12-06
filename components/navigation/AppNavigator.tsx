import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@/app/(tabs)/profile';
import CreateUser from '@/components/screens/CreateUser';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
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
  );
};

export default AppNavigator;