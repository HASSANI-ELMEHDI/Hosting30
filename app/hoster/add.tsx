import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import First from './first';  
import Second from './second';
import Third from './third';
import Fourth from './fourth';
import { useUser } from '@clerk/clerk-expo';
import { usePro } from '@/contex/context';
import { createLogement } from '@/constants/api';
import { router } from 'expo-router';

function generateRandomId() {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000);
  const id = `${timestamp}-${randomNumber}`;
  return id;
}
const Page = () => {
  const [done,setDone]=useState(false)
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [page, setPage] = useState(1);
  const { Type,setType,
    Start,setStart,
    End,setEnd,
    Numberppl,setNumberppl,
    Description,setDescription,
    Rules,setRules,
    Access,setAccess,
    Price,setPrice,
    Coordina,setCoordina,
    myImages,setMyImages,
  }=usePro()
    const convertDateFormat = (originalDate) => {
      const parts = originalDate.split('/');
      const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      return formattedDate;
    };
const saveLogement=()=>{
  setTimeout(() => {
    
    const newLogement={
      "type": Type,
      "id": generateRandomId(),
      "listing_url": myImages[0],
      "name": Access,
      "description": Description,
      "house_rules": Rules,
      "medium_url": myImages,
      "xl_picture_url": myImages,
      "host_id": email,
      "host_name": firstName+" "+lastName,
      "host_since": convertDateFormat(user?.createdAt!.toLocaleDateString()),
      "host_picture_url": user?.imageUrl,
      "smart_location": "Bouznika",
      "latitude": Coordina?.latitude,
      "longitude": Coordina?.longitude,
      "accommodates": Numberppl,
      "price": Price,
      "geolocation": {
        "lon": Coordina?.latitude,
        "lat": Coordina?.longitude
      },
      "Start":Start,
      "End":End
     }
     createLogement(newLogement).then(data => {
		  console.log(data); 
		  router.replace('/hoster/');
		})
		.catch(error => {
		  console.error(error);
		});
    setType("")
  setStart(new Date())
  setEnd(new Date())
  setNumberppl(1)
  setDescription("")
  setRules("")
  setAccess("")
  setPrice(0)
  setCoordina(null)
  setMyImages([])
  

  }, 3000);
  
}



  return (
    <View style={{ flex: 1 }}>
 
      {page === 1 ? <First /> : page === 2 ? <Second /> : page === 3 ? <Third /> : <Fourth/>}
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
          onPress={saveLogement}
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