import { FlatList, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons'

const staplesData = [
  {
    id: '0',
    itemTitle: 'Flour',
    quantity: '(1 bag)'
  },
  {
    id: '1',
    itemTitle: 'Sugar',
    quantity: '(1/2 cup)'
  },
  {
    id: '2',
    itemTitle: 'Oil',
    quantity: '(1 bottle)'
  },
  {
    id: '3',
    itemTitle: 'Baking Powder',
    quantity: '(1 bag)'
  },
  {
    id: '4',
    itemTitle: 'Salt',
    quantity: '(1 bag)'
  },
]

const produceData = [
  {
    id: '0',
    itemTitle: 'Broccoli',
    quantity: '(1)'
  },
  {
    id: '1',
    itemTitle: 'Garlic',
    quantity: '(3)'
  },
  {
    id: '2',
    itemTitle: 'Onion',
    quantity: '(3)'
  },
  {
    id: '3',
    itemTitle: 'Cabbage',
    quantity: '(1)'
  },
  {
    id: '4',
    itemTitle: 'Tomato',
    quantity: '(5)'
  },
]

const proteinData = [
  {
    id: '0',
    itemTitle: 'Chicken',
    quantity: '(1 lb)'
  },
  {
    id: '1',
    itemTitle: 'Pork',
    quantity: '(2 lb)'
  },
  {
    id: '2',
    itemTitle: 'Tofu',
    quantity: '(14 oz)'
  },
  {
    id: '3',
    itemTitle: 'Beef',
    quantity: '(3 lb)'
  },
  {
    id: '4',
    itemTitle: 'Salmon',
    quantity: '(21 oz)'
  },
]

const fruitData = [
  {
    id: '0',
    itemTitle: 'Apple',
    quantity: '(3)'
  },
  {
    id: '1',
    itemTitle: 'Banana',
    quantity: '(2)'
  },
  {
    id: '2',
    itemTitle: 'Orange',
    quantity: '(4)'
  },
  {
    id: '3',
    itemTitle: 'Kiwi',
    quantity: '(2)'
  },
  {
    id: '4',
    itemTitle: 'Mango',
    quantity: '(5)'
  },
]

const grainsData = [
  {
    id: '0',
    itemTitle: 'Rice',
    quantity: '(1 oz)'
  },
  {
    id: '1',
    itemTitle: 'Oats',
    quantity: '(2 lb)'
  },
  {
    id: '2',
    itemTitle: 'Quinoa',
    quantity: '(14 oz)'
  },
  {
    id: '3',
    itemTitle: 'Spaghetti',
    quantity: '(3 lb)'
  },
  {
    id: '4',
    itemTitle: 'Tortillas',
    quantity: '(21 oz)'
  },
]

const dairyData = [
  {
    id: '0',
    itemTitle: 'Butter',
    quantity: '(10 oz)'
  },
  {
    id: '1',
    itemTitle: 'Yogurt',
    quantity: '(2 cups)'
  },
  {
    id: '2',
    itemTitle: 'Milk',
    quantity: '(14 oz)'
  },
  {
    id: '3',
    itemTitle: 'Cheese',
    quantity: '(1 cup)'
  },
  {
    id: '4',
    itemTitle: 'Gelato',
    quantity: '(1 cup)'
  },
]

type ItemProps = { itemTitle: string, quantity: string }

const Item = ({itemTitle, quantity}: ItemProps) => (
  <View style={styles.items}>
    <Text style={styles.itemTitle}>{itemTitle}</Text>
    <Text style={styles.itemQuantity}>{quantity}</Text>
  </View>
);

const Pantry = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pantry</Text>
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
      <TouchableOpacity 
        style={styles.button}
      >
        <Text style={styles.buttonText}>Add Ingredients</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    // height: '100%',
    flexDirection: "column",
    justifyContent: 'space-between',
    backgroundColor: "white"
  },
  title: {
    textAlign: 'center',
    color: '#467140',
    fontSize: 40,
    padding: 5, 
    // borderBottomWidth: 2,
    // borderBottomColor: "#8B5E3C",
  },
  listAndTitle: {
    width: '100%',
    // justifyContent: 'center',
    // alignContent: 'center',
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
    // fontWeight: 'bold'
  },
  itemQuantity: {
    // fontSize: 8
  },
  lists: {
    alignContent: 'center',
    width: '80%'
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16 
  },
  button: {
    backgroundColor: "#4B6A43",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: -10,
  },
})

export default Pantry