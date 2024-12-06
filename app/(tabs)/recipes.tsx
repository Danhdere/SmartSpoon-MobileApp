import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Recipes = () => {
  const [cuisine, setCuisine] = useState('');
  const [time, setTime] = useState('');
  const [numberOfRecipes, setNumberOfRecipes] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!cuisine || !time || !numberOfRecipes) {
      Alert.alert("Missing Fields", "Please fill out all fields before generating recipes.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/generate_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cuisine,
          time: parseInt(time),
          num_recipes: parseInt(numberOfRecipes),
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        Alert.alert("Error", data.error);
      } else {
        setGeneratedRecipe(data.recipes);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to generate recipe. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Recipes!</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cuisine Preference:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Italian, Mexican"
              value={cuisine}
              onChangeText={setCuisine}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time Preference (minutes):</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 30"
              keyboardType="numeric"
              value={time}
              onChangeText={setTime}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Recipes:</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 3"
              keyboardType="numeric"
              value={numberOfRecipes}
              onChangeText={setNumberOfRecipes}
              placeholderTextColor="#999"
            />
          </View>

          <Pressable 
            style={[styles.generateButton, isLoading && styles.generateButtonDisabled]} 
            onPress={handleGenerate}
            disabled={isLoading}
          >
            <Text style={styles.generateButtonText}>
              {isLoading ? "Generating..." : "Generate Recipes"}
            </Text>
          </Pressable>
        </View>

        {generatedRecipe ? (
          <View style={styles.recipeContainer}>
            <View style={styles.recipeLabelContainer}>
              <Text style={styles.recipeLabelText}>Generated Recipes</Text>
            </View>
            <Text style={styles.recipeText}>{generatedRecipe}</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    textAlign: 'center',
    color: '#467140',
    fontSize: 40,
    padding: 15,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    fontSize: 16,
  },
  generateButton: {
    backgroundColor: '#467140',
    padding: 15,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  generateButtonDisabled: {
    backgroundColor: '#85ab81',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeContainer: {
    width: '80%',
    marginTop: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  recipeLabelContainer: {
    backgroundColor: '#EDC9AF',
    padding: 10,
    width: '100%',
  },
  recipeLabelText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 24,
    padding: 15,
  },
});

export default Recipes;