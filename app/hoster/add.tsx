import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import First from './first';  
import Second from './second';
import Third from './third';
import Fourth from './fourth';
import {ContProvider} from '@/contex/context'

const Page = () => {
  const [page, setPage] = useState(1);
  

  return (
    <View style={{ flex: 1 }}>
      <ContProvider>
      {page === 1 ? <First /> : page === 2 ? <Second /> : page === 3 ? <Third /> : <Fourth />}
      <View style={styles.buttons}>
      {page == 1 && (
        <TouchableOpacity
        style={{ ...styles.button, backgroundColor: 'green', marginLeft: 'auto'  }}
          onPress={() => {
            let pg = page;
            setPage(pg + 1);
          }}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      )} 
        
      {page > 1 && (
        <TouchableOpacity
        style={{ ...styles.button, backgroundColor: 'red' }}
          onPress={() => {
            let pg = page;
            setPage(pg - 1);
          }}
        >
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
      )}
      {page == 4 && (
        <TouchableOpacity
        style={{ ...styles.button, backgroundColor: 'green', marginLeft: 'auto'  }}
          onPress={() => {
            let pg = page;
            setPage(pg - 1);
          }}
        >
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>
      )}

      {page < 4 && page>1 && (
        <TouchableOpacity
        style={{ ...styles.button, backgroundColor: 'green' }}
          onPress={() => {
            let pg = page;
            setPage(pg + 1);
          }}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
    </ContProvider>
   </View>
  );
};
const styles=StyleSheet.create({
buttons:{
  flexDirection: 'row', 
  justifyContent: 'space-between', 
  alignItems: 'flex-end', 
  marginBottom: 16 },

 button:{
    padding: 10, height:40, width:80,  borderRadius: 8,margin:20 },
    text:{ color: 'white' ,fontSize:15, textAlign:'center', fontFamily: "mon-b",}
})

export default Page;