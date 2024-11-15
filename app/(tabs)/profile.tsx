import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from "@react-native-picker/picker";

const Profile = () => {
  const [data, setData] = useState(null);

  /*
  Load in data



  /* onClickFunctions
  const handleSkillLevelChange = (newSkillLevel) => {
    setData((prevData) => ({
      ...prevData, 
      skillLevel: newSkillLevel, 
    }));
  };  

  const addNewDietaryPref = (newDietaryPref) => {
    setData((prevData) => ({
      ...prevData,
      dietaryPref: [...prevData.dietaryPref, newDietaryPref], 
    }));
  };

  */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/default.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Spoony</Text>
      </View>

      <Text style={styles.label}>Skill Level</Text>

      <Text style={styles.label}>Dietary Preferences</Text>
      <View style={styles.tagContainer}>
        <TouchableOpacity style={styles.tag}>
          <Text>Gluten-free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tag}>
          <Text>Keto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addTag}>
          <Text>+ Add More</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Allergies</Text>
      <View style={styles.tagContainer}>
        <TouchableOpacity style={styles.tag}>
          <Text>Peanuts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addTag}>
          <Text>+ Add More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

      <Text style={styles.subTitle}>Past Recipes</Text>
      <View style={styles.recipeCard}>
        <Image
          source={require("../../assets/images/pasta-salad.png")}
          style={styles.recipeImage}
        />
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTitle}>Pasta Salad</Text>
          <View style={styles.recipeTags}>
            <Text style={styles.recipeTag}>American</Text>
            <Text style={styles.recipeTag}>Vegetarian</Text>
          </View>
          <Text style={styles.recipeDate}>Last made: 11-11-2024</Text>
          <Text style={styles.recipeRating}>Rating: ★★★☆☆</Text>
        </View>
      </View>

      <View style={styles.recipeCard}>
        <Image
          source={require("../../assets/images/pork-adobo.png")}
          style={styles.recipeImage}
        />
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTitle}>Pork Adobo</Text>
          <Text style={styles.recipeTag}>Filipino</Text>
          <Text style={styles.recipeDate}>Last made: 11-5-2024</Text>
          <Text style={styles.recipeRating}>Rating: ★★★★★</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View More Past Recipes</Text>
      </TouchableOpacity>

      <View style={styles.navBar}>
        <TouchableOpacity>
          <Text style={styles.navText}>Pantry</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}>Generate</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  logo: { width: 50, height: 50, borderRadius: 25, marginRight:16},
  title: { fontSize: 24, fontWeight: "bold", marginLeft: 8, color: "#4B6A43" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 16 },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 8,
  },
  tagContainer: { flexDirection: "row", flexWrap: "wrap", marginTop: 8 },
  tag: {
    backgroundColor: "#e5c3aa",
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 8,
  },
  addTag: {
    backgroundColor: "#d4b8a1",
    padding: 8,
    borderRadius: 16,
    marginTop: 8,
  },
  separator: { height: 1, backgroundColor: "#ddd", marginVertical: 16 },
  subTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  recipeCard: {
    flexDirection: "row",
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: { width: 60, height: 60, borderRadius: 8 },
  recipeDetails: { marginLeft: 8, flex: 1 },
  recipeTitle: { fontSize: 16, fontWeight: "bold" },
  recipeTags: { flexDirection: "row", marginTop: 4 },
  recipeTag: {
    backgroundColor: "#e5c3aa",
    borderRadius: 8,
    padding: 4,
    marginRight: 4,
  },
  recipeDate: { fontSize: 12, color: "#555", marginTop: 4 },
  recipeRating: { fontSize: 14, marginTop: 4 },
  button: {
    backgroundColor: "#4B6A43",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#c3a687",
    paddingVertical: 12,
  },
  navText: { color: "#fff", fontSize: 16 },
});

export default Profile