import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

/* import { RootStackParamList } from '@/components/navigation/types'; */

type RootStackParamList = {
    Profile: undefined;
    CreateUser: undefined;
  };

type CreateUserNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateUser'>;

interface CreateUserProps {
  navigation: CreateUserNavigationProp;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  dietaryPreferences: string[];
  allergies: string[];
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const CreateUser: React.FC<CreateUserProps> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    skillLevel: 'Beginner',
    dietaryPreferences: [],
    allergies: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    let tempErrors: FormErrors = {};
    if (!formData.username) tempErrors.username = 'Username is required';
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (): Promise<void> => {
    if (validateForm()) {
      try {
        // Replace with your MongoDB API endpoint
        const response = await fetch('YOUR_API_ENDPOINT/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            skillLevel: formData.skillLevel,
            dietaryPreferences: formData.dietaryPreferences,
            allergies: formData.allergies,
          }),
        });

        if (response.ok) {
          Alert.alert('Success', 'Account created successfully!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Profile'),
            },
          ]);
        } else {
          const errorData = await response.json();
          Alert.alert('Error', errorData.message || 'Failed to create account');
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text: string) =>
                setFormData(prev => ({ ...prev, username: text }))
              }
              placeholder="Enter username"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text: string) =>
                setFormData(prev => ({ ...prev, email: text }))
              }
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={formData.password}
              onChangeText={(text: string) =>
                setFormData(prev => ({ ...prev, password: text }))
              }
              placeholder="Enter password"
              secureTextEntry
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={formData.confirmPassword}
              onChangeText={(text: string) =>
                setFormData(prev => ({ ...prev, confirmPassword: text }))
              }
              placeholder="Confirm password"
              secureTextEntry
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.secondaryButtonText}>Back to Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B6A43',
    marginVertical: 16,
  },
  form: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4B6A43',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    color: '#4B6A43',
    fontSize: 16,
  },
});

export default CreateUser;