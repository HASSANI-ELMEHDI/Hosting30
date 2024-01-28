import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';


const first = () => {

  const categories = [
    {
      name: 'Rooms',
      icon: 'single-bed',
      name2: 'Shared rooms',
      icon2: 'home-filled',
    },
    {
      name: 'Apartments',
      icon: 'location-city',
      name2: 'Villas',
      icon2: 'house-siding',
    },
    {
      name: 'Hotels',
      icon: 'apartment',
      name2: 'Houses',
      icon2: 'home-work',
    },
  ];
  

  const handleClick = (item:String) => {
    // Handle click event for the elements
    console.log(`Clicked on ${item}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your logment </Text>
       {categories.map((item, index) => (
  <View style={styles.row} key={index}>
    <TouchableOpacity
      style={styles.box}
      onPress={() => handleClick(`Element`)}
    >
      <MaterialIcons
        name={item.icon as any}
        size={60}
      />
      <Text>{item.name}</Text>
    </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleClick(`Element`)}
      >
        <MaterialIcons
          name={item.icon2 as any}
          size={60}
        />
         <Text>{item.name2}</Text>
      </TouchableOpacity>
  </View>
))}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:20
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  box: {
    flex: 1,
    aspectRatio: 1, // This maintains a square aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    borderWidth: 2, 
    borderColor: 'grey'
  },
  titleText: {
        color: "#000",
        fontSize: 20,
        fontFamily: "mon-b",
    marginBottom:20
    },
});

export default first;
