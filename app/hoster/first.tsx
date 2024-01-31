import { MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import React,{useState} from 'react';
import Colors from '@/constants/Colors';
import { usePro } from '@/contex/context';


const first = () => {
const { Type,setType}=usePro()
const handleClick = (item:string) => {
  setActiveIndex(item);
  setType(item);
  console.log(item);
};

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
  
  const [activeIndex, setActiveIndex] = useState('');
  

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your logment </Text>
       {categories.map((item, index) => (
  <View style={styles.row} key={index}>
    <TouchableOpacity
      style={[
        styles.box,
        {
          borderColor: activeIndex === item.name ? Colors.yellow : Colors.grey,
        },
      ]}
      onPress={() => handleClick(item.name)}
      >
      <MaterialIcons
        name={item.icon as any}
        size={60}
        color={activeIndex == item.name ? Colors.yellow : Colors.grey}
      />
      <Text style={{ color: activeIndex === item.name ? Colors.yellow : Colors.grey }}>{item.name}</Text>
    </TouchableOpacity>
      <TouchableOpacity
       style={[
            styles.box,
            {
              borderColor: activeIndex === item.name2 ? Colors.yellow : Colors.grey,
            },
          ]}
          onPress={() => handleClick(item.name2)}
       >
        <MaterialIcons
          name={item.icon2 as any}
          size={60}
          color={activeIndex == item.name2 ? Colors.yellow : Colors.grey}
        />
         <Text style={{ color: activeIndex === item.name2 ? Colors.yellow : Colors.grey }}>{item.name2}</Text>
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
