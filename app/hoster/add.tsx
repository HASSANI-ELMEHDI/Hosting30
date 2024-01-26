import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, StyleSheet, Text} from 'react-native';





const Page = () => {


  return (
    <View style={styles.container}>
     
        <Text> Add offer </Text>
     </View>


  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    images: {
      width: 200,
      height: 200,
      resizeMode: 'contain',   
    },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  message : {
    marginBottom : 30,
    color: Colors.grey,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});