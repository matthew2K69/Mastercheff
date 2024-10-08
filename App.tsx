import{StatusBar} from 'expo-status-bar';
import {FlatList,Text,View,TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { SafeAreaView,TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';
import { MenuDetails } from './type';


export default function App() {
  const [menudetails, setMenuDetails] = useState<MenuDetails[]>([]);
  const [dishName, setDishName] = useState<string>('')
  const [description,setDescription]= useState<string>('')
  const [dishType,setDishType]= useState<string>('')
  const [price,setPrice]= useState<string>('')
  const dishTypes = ['Appertiesers','Beverages','Desserts','Main Courses'];

  const handleSubmit = () => {
    if (dishName && description && dishType && price) {
      const newMenuDetails : MenuDetails = {
        dishName,
        description,
        dishType,
        price:parseInt(price),
      };

      setMenuDetails([...menudetails,newMenuDetails]);
      setDishName('')
      setDescription('')
      setDishType('')
      setPrice('')
    }
  };

  const handleRemoveItem = (index:number) => {
    setMenuDetails(menudetails.filter());
  };


   const totalMenuItems = menudetails.length;

   return (
    <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.headingContainer}>
            <Text style={styles.trackerName}>Masterchef</Text>
        </View>
    
    <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Dish Name"
     value={dishName}
     onChangeText={setDishName}
     />
     <TextInput
     style={styles.input}
     placeholder="Price"
     value={price}
     keyboardType="numeric"
     onChangeText={setPrice}
     />

     <Picker
     selectedValue={dishType}
     onValueChange={(itemValue:string)=> setDishType(itemValue)}
     style={styles.input}
     >
        {dishTypes.map((type) =>(
            <Picker.Item label={type} value={type} key={type} />
        ))}
     </Picker>

     <TextInput
     style= {styles.input}
     placeholder="Description"
     value={description}
     onChangeText={setDescription}
     />

     <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Add Item</Text>
     </TouchableOpacity>
     </View>

     <FlatList
     data = {menudetails}
     keyExtractor={( item, index) => index.toString()}
     renderItem={({item,index}) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          {item.dishName} - {item.description} - {item.dishType} - {item.price}
        </Text>
        <TouchableOpacity
        style={styles.removeItemButton}
        onPress={() => handleRemoveItem(index)}
        >
          <Text style={styles.removeItemText}>Remove</Text>
        </TouchableOpacity>
      </View>
      
     )}
     />

     <Text style={styles.totalMenuItems}>Total Menu Items:{totalMenuItems}</Text>
     </SafeAreaView> 
   );


}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#26f7ee'
  },

   trackerName: {
    fontSize :25,
    fontWeight:'bold',
    color:'gold'
  },

  input:{
    borderWidth:1,
    borderColor: 'black',
    padding :15,
    borderRadius:5,
  },

  button:{
    backgroundColor: 'black',
    padding: 17,
    borderRadius:10,
    alignItems:'center',
  },

  buttonText:{
    color:'red',
    fontWeight:'bold',
  },

  itemContainer: {
    padding:10,
    borderWidth:1,
    borderColor:'black',
  },

  itemText:{
    fontSize:25,
    color:'black',
  },
  removeItemButton: {
    backgroundColor:'black',
    padding:5,
    alignItems: 'center',
  },

  removeItemText:{
    color:'violet',
  },
  totalMenuItems:{
    color:'black',
  }
})