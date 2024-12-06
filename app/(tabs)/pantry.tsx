import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'

type ItemProps = { itemTitle: string, quantity: string }

const Item = ({itemTitle, quantity}: ItemProps) => (
  <View style={styles.items}>
    <Text style={styles.itemTitle}>{itemTitle}</Text>
    <Text style={styles.itemQuantity}>{quantity}</Text>
  </View>
);

const Pantry = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newIngredient, setNewIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('bag');
  const [category, setCategory] = useState('staples');

  const [staplesData, setStaplesData] = useState([
    { id: '0', itemTitle: 'Flour', quantity: '(1 bag)' },
    { id: '1', itemTitle: 'Sugar', quantity: '(1/2 cup)' },
    { id: '2', itemTitle: 'Oil', quantity: '(1 bottle)' },
    { id: '3', itemTitle: 'Baking Powder', quantity: '(1 bag)' },
    { id: '4', itemTitle: 'Salt', quantity: '(1 bag)' },
  ]);

  const [produceData, setProduceData] = useState([
    { id: '0', itemTitle: 'Broccoli', quantity: '(1)' },
    { id: '1', itemTitle: 'Garlic', quantity: '(3)' },
    { id: '2', itemTitle: 'Onion', quantity: '(3)' },
    { id: '3', itemTitle: 'Cabbage', quantity: '(1)' },
    { id: '4', itemTitle: 'Tomato', quantity: '(5)' },
  ]);

  const [proteinData, setProteinData] = useState([
    { id: '0', itemTitle: 'Chicken', quantity: '(1 lb)' },
    { id: '1', itemTitle: 'Pork', quantity: '(2 lb)' },
    { id: '2', itemTitle: 'Tofu', quantity: '(14 oz)' },
    { id: '3', itemTitle: 'Beef', quantity: '(3 lb)' },
    { id: '4', itemTitle: 'Salmon', quantity: '(21 oz)' },
  ]);

  const [fruitData, setFruitData] = useState([
    { id: '0', itemTitle: 'Apple', quantity: '(3)' },
    { id: '1', itemTitle: 'Banana', quantity: '(2)' },
    { id: '2', itemTitle: 'Orange', quantity: '(4)' },
    { id: '3', itemTitle: 'Kiwi', quantity: '(2)' },
    { id: '4', itemTitle: 'Mango', quantity: '(5)' },
  ]);

  const [grainsData, setGrainsData] = useState([
    { id: '0', itemTitle: 'Rice', quantity: '(1 oz)' },
    { id: '1', itemTitle: 'Oats', quantity: '(2 lb)' },
    { id: '2', itemTitle: 'Quinoa', quantity: '(14 oz)' },
    { id: '3', itemTitle: 'Spaghetti', quantity: '(3 lb)' },
    { id: '4', itemTitle: 'Tortillas', quantity: '(21 oz)' },
  ]);

  const [dairyData, setDairyData] = useState([
    { id: '0', itemTitle: 'Butter', quantity: '(10 oz)' },
    { id: '1', itemTitle: 'Yogurt', quantity: '(2 cups)' },
    { id: '2', itemTitle: 'Milk', quantity: '(14 oz)' },
    { id: '3', itemTitle: 'Cheese', quantity: '(1 cup)' },
    { id: '4', itemTitle: 'Gelato', quantity: '(1 cup)' },
  ]);

  const handleAddIngredient = () => {
    if (!newIngredient || !quantity) return;

    const newItem = {
      id: Date.now().toString(),
      itemTitle: newIngredient,
      quantity: `(${quantity} ${unit})`
    };

    switch(category) {
      case 'staples':
        setStaplesData(prev => [...prev, newItem]);
        break;
      case 'produce':
        setProduceData(prev => [...prev, newItem]);
        break;
      case 'protein':
        setProteinData(prev => [...prev, newItem]);
        break;
      case 'fruit':
        setFruitData(prev => [...prev, newItem]);
        break;
      case 'grains':
        setGrainsData(prev => [...prev, newItem]);
        break;
      case 'dairy':
        setDairyData(prev => [...prev, newItem]);
        break;
    }

    setNewIngredient('');
    setQuantity('');
    setUnit('bag');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pantry</Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New Ingredient</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={newIngredient}
              onChangeText={setNewIngredient}
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
              <Picker.Item label="bag" value="bag" />
              <Picker.Item label="oz" value="oz" />
              <Picker.Item label="lb" value = "lb" />
              <Picker.Item label="cups" value="cups" />
              <Picker.Item label="serving" value="serving" />
            </Picker>

            <Text style={styles.label}>Category:</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Staples" value="staples" />
              <Picker.Item label="Produce" value="produce" />
              <Picker.Item label="Protein" value="protein" />
              <Picker.Item label="Fruit" value="fruit" />
              <Picker.Item label="Grains" value="grains" />
              <Picker.Item label="Dairy" value="dairy" />
            </Picker>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={handleAddIngredient}
              >
                <Text style={styles.textStyle}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{width: '100%'}}>
        <View style={styles.listAndTitle}>
          <FlatList
            style={styles.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={staplesData}
            renderItem={({item}) => <Item itemTitle={item.itemTitle} quantity={item.quantity} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.labelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>Staples</Text>
          </View>
        </View>

        <View style={styles.listAndTitle}>
          <FlatList
            style={styles.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={produceData}
            renderItem={({item}) => <Item itemTitle={item.itemTitle} quantity={item.quantity} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.labelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>Produce</Text>
          </View>
        </View>

        <View style={styles.listAndTitle}>
          <FlatList
            style={styles.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={proteinData}
            renderItem={({item}) => <Item itemTitle={item.itemTitle} quantity={item.quantity} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.labelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>Protein</Text>
          </View>
        </View>

        <View style={styles.listAndTitle}>
          <FlatList
            style={styles.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={fruitData}
            renderItem={({item}) => <Item itemTitle={item.itemTitle} quantity={item.quantity} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.labelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>Fruit</Text>
          </View>
        </View>

        <View style={styles.listAndTitle}>
          <FlatList
            style={styles.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={grainsData}
            renderItem={({item}) => <Item itemTitle={item.itemTitle} quantity={item.quantity} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.labelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>Grains</Text>
          </View>
        </View>

        <View style={styles.listAndTitle}>
          <FlatList
            style={styles.lists}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dairyData}
            renderItem={({item}) => <Item itemTitle={item.itemTitle} quantity={item.quantity} />}
            keyExtractor={item => item.id}
          />
          <View style={styles.labelContainer}>
            <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: "center"}}>Dairy</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomButtons}>
        <Pressable style={styles.iconButton}>
          <FontAwesome name='camera' size={30}/>
        </Pressable>
        
        <Pressable 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add Ingredient</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: "column",
    justifyContent: 'space-between',
    backgroundColor: "white",
  },
  title: {
    textAlign: 'center',
    color: '#467140',
    fontSize: 40,
    padding: 15,
  },
  listAndTitle: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30
  },
  labelContainer: {
    backgroundColor: "#EDC9AF",
    width: "80%"
  },
  items: {
    margin: 5,
    flexDirection: 'column',
    width: 70,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  itemTitle: {
    fontSize: 15,
    textAlign: 'center'
  },
  itemQuantity: {
    fontSize: 12
  },
  lists: {
    alignContent: 'center',
    width: '80%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
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
    elevation: 5,
    width: '80%',
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
  modalButtons: {
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
  buttonClose: {
    backgroundColor: '#999',
  },
  buttonAdd: {
    backgroundColor: '#467140',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#467140',
    padding: 10,
    borderRadius: 20,
    minWidth: 120,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Pantry;