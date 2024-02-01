import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { getLogmentsByHoster } from '@/constants/api';
import { useUser } from '@clerk/clerk-expo';
const App = () => {

  const [hosterLogments,setHosterLogments] = useState([]);
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress+"");
  useEffect(()=> {
    getLogmentsByHoster(email)
    .then(data => {
      setHosterLogments(data);
    });
  },[])
  return (
    <View style={styles.container}>
      


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