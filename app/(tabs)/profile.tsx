import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createStackNavigator(); // navigates between screens


const Profile = ({navigation }: any) => {
  // State for data
  const [data, setData] = useState({
    skillLevel: "Beginner",
    dietaryPref: ["Gluten-free", "Keto"],
    allergies: ["Peanuts"],
  });

  // State for modal control
  const [isModalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [addTarget, setAddTarget] = useState<"dietaryPref" | "allergies">("dietaryPref");

  // Add new dietary preference or allergy
  const handleAddItem = () => {
    setData((prevData) => ({
      ...prevData,
      [addTarget]: [...prevData[addTarget], newItem],
    }));
    setModalVisible(false);
    setNewItem("");
  };

  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/default.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Spoony</Text>
      </View>

      {/* Skill Level */}
      <Text style={styles.label}>Skill Level</Text>
      <Picker
        selectedValue={data.skillLevel}
        onValueChange={(itemValue) =>
          setData((prevData) => ({ ...prevData, skillLevel: itemValue }))
        }
        style={styles.picker}
      >
        <Picker.Item label="Beginner" value="Beginner" />
        <Picker.Item label="Intermediate" value="Intermediate" />
        <Picker.Item label="Advanced" value="Advanced" />
      </Picker>

      {/* Dietary Preferences */}
      <Text style={styles.label}>Dietary Preferences</Text>
      <View style={styles.tagContainer}>
        {data.dietaryPref.map((pref, index) => (
          <TouchableOpacity key={index} style={styles.tag}>
            <Text>{pref}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addTag}
          onPress={() => {
            setAddTarget("dietaryPref");
            setModalVisible(true);
          }}
        >
          <Text>+ Add More</Text>
        </TouchableOpacity>
      </View>

      {/* Allergies */}
      <Text style={styles.label}>Allergies</Text>
      <View style={styles.tagContainer}>
        {data.allergies.map((allergy, index) => (
          <TouchableOpacity key={index} style={styles.tag}>
            <Text>{allergy}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.addTag}
          onPress={() => {
            setAddTarget("allergies");
            setModalVisible(true);
          }}
        >
          <Text>+ Add More</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Past Recipes */}
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

      {/* View More Button */}
      <TouchableOpacity 
        style={styles.button}
        // onPress={() => navigation.navigate('PastRecipes')}  
      >
        <Text style={styles.buttonText}>View More Past Recipes</Text>
      </TouchableOpacity>


     { /* Navigation Bar */}
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

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={`Enter new ${addTarget === "dietaryPref" ? "dietary preference" : "allergy"}`}
            value={newItem}
            onChangeText={setNewItem}
          />
          <Button title="Add" onPress={handleAddItem} />
        </View>
      </Modal>
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
  logo: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  textInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    width: "80%",
    marginBottom: 10,
  },
});

export default Profile;
