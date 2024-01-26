import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      
      {/* offers list */}
  


      {/* add offer */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=> router.replace('/hoster/add')}>
          <Entypo name="plus" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, 
    right: 20, 
  },
  button: {
    backgroundColor: Colors.yellow, 
    padding: 10, 
    borderRadius: 25, 
  },
});

export default App;