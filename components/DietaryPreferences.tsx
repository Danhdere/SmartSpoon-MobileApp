import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Define props type
interface DietaryPreferencesProps {
  preferences: string[];
  onAddPreference: () => void;
}

const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({ preferences, onAddPreference }) => {
  return (
    <View>
      <Text style={styles.label}>Dietary Preferences</Text>
      <View style={styles.tagContainer}>
        {preferences.map((pref, index) => (
          <TouchableOpacity key={index} style={styles.tag}>
            <Text>{pref}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.addTag} onPress={onAddPreference}>
          <Text>+ Add More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 16 },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  tag: {
    backgroundColor: '#e5c3aa',
    padding: 8,
    borderRadius: 16,
    marginRight: 8,
    marginTop: 8,
  },
  addTag: {
    backgroundColor: '#d4b8a1',
    padding: 8,
    borderRadius: 16,
    marginTop: 8,
  },
});

export default DietaryPreferences;
