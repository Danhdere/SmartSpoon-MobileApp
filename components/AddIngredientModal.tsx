import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type AddIngredientModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddIngredient: (ingredient: {
    name: string;
    quantity: string;
    unit: string;
    category: string;
  }) => void;
};

const categories = [
  { value: 'staples', label: 'Staples' },
  { value: 'produce', label: 'Produce' },
  { value: 'protein', label: 'Protein' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'grains', label: 'Grains' },
  { value: 'dairy', label: 'Dairy' },
];

const units = [
  { value: 'bag', label: 'bag' },
  { value: 'oz', label: 'oz' },
  { value: 'cups', label: 'cups' },
  { value: 'serving', label: 'serving' },
];

const AddIngredientModal = ({ visible, onClose, onAddIngredient }: AddIngredientModalProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('bag');
  const [category, setCategory] = useState('staples');

  const handleSubmit = () => {
    if (!name || !quantity) return;
    
    onAddIngredient({
      name,
      quantity,
      unit,
      category
    });
    
    // Reset form
    setName('');
    setQuantity('');
    setUnit('bag');
    setCategory('staples');
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Add New Ingredient</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Ingredient Name"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Unit:</Text>
          <Picker
            selectedValue={unit}
            onValueChange={(itemValue) => setUnit(itemValue)}
            style={styles.picker}
          >
            {units.map((unit) => (
              <Picker.Item 
                key={unit.value} 
                label={unit.label} 
                value={unit.value} 
              />
            ))}
          </Picker>

          <Text style={styles.label}>Category:</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map((cat) => (
              <Picker.Item 
                key={cat.value} 
                label={cat.label} 
                value={cat.value} 
              />
            ))}
          </Picker>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.addButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd'
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  addButton: {
    backgroundColor: '#467140',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default AddIngredientModal;