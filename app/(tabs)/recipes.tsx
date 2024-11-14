import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Recipes = () => {
  const [cuisine, setCuisine] = useState('');
  const [time, setTime] = useState('');
  const [numberOfRecipes, setNumberOfRecipes] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    // Input validation
    if (!cuisine || !time || !numberOfRecipes) {
      Alert.alert("Missing Fields", "Please fill out all fields before generating recipes.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.86.38:5000/generate_recipe', {
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
      <ScrollView>
        <Text style={styles.title}>Generate Recipe</Text>

        <View style={styles.inputContainer}>
          <Text>Cuisine Preference:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Italian, Mexican"
            value={cuisine}
            onChangeText={setCuisine}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Time Preference (in minutes):</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 30"
            keyboardType="numeric"
            value={time}
            onChangeText={setTime}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Number of Recipes:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 3"
            keyboardType="numeric"
            value={numberOfRecipes}
            onChangeText={setNumberOfRecipes}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title={isLoading ? "Generating..." : "Generate"} 
            onPress={handleGenerate}
            disabled={isLoading}
          />
        </View>

        {generatedRecipe ? (
          <View style={styles.recipeContainer}>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 24,
  },
  inputContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  recipeContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 16,
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Recipes;