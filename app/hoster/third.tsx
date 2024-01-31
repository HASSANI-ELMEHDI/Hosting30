import { Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from 'react'
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import * as Location from 'expo-location';
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";



const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



const third = () => {
  const [searchText,setSearchText]=useState("")
  const [location, setLocation] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const locationn = await Location.getCurrentPositionAsync({});
      setLocation(locationn);
    })();
  }, [location]);
const searchPlaces=async ()=>{
  if(!searchText.trim().length) return;
   
const googleApisUrl="https://maps.googleapis.com/maps/api/place/textsearch/json"
const input= searchText.trim()
const theLocation=`${location.coords.latitude},${location.coords.longitude}&radius=2000`
const url=`${googleApisUrl}?query=${input}&location=${theLocation}&key=AIzaSyB0voBsIEUZUKg3pLcyaQ99bXry3A-HhSs`
try{
  const res=await fetch(url)
  const json=await res.json()
  console.log(json)
  if(json && json.results){

    const coords: LatLng[]=[]
    for(const item of json.results){
      coords.push({
        latitude:item.geometry.location.lat,
        longitude:item.geometry.location.lng
      })
    }
  }
}catch(e){
 console.log(e)
}

}


    return (
      <View style={styles.container}>
        {location?(
       <View style={styles.container}>
        <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={ {latitude:location.coords.latitude,longitude:location.coords.longitude,latitudeDelta:LATITUDE_DELTA,longitudeDelta:LONGITUDE_DELTA}}> 
          <Marker  coordinate={{latitude:location.coords.latitude,longitude:location.coords.longitude}} >
          <View style={styles.markerContainer}>
      <View style={styles.markerCircle}>
        <View style={styles.markerCore} />
      </View>
        </View>
        </Marker>    
        </MapView>
        <View style={styles.searchBox}>
          <Text style={{fontSize:18}}>Search Place</Text>
            <TextInput
            style={styles.searchBoxField}
            onChangeText={setSearchText}
            autoCapitalize="sentences"/>
              <TouchableOpacity style={styles.buttonContainer} onPress={searchPlaces}>
                <Text style={styles.buttonLabel}>
                  Search
                </Text>
              </TouchableOpacity>
         
        </View>
        </View> 
            ):(<View>
            <Text>Loading...</Text>
              </View>)}
        </View>
    );
  };

  const styles=StyleSheet.create({
 container:{
  flex:1
 },
 map:{
  width:'100%',
  height:'100%'
 },
 markerContainer: {
  width: 40,
  height: 40,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
},
markerCircle: {
  width: 24,
  height: 24,
  borderRadius: 12,
  backgroundColor: 'blue',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 10,
  borderColor: 'rgba(39, 71, 245, 0.1)',
},
markerCore: {
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: 'blue',
},
searchBox:{
 position:"absolute",
 width:'90%',
 borderRadius:8,
 borderWidth:1,
 borderColor:'#aaa',
 backgroundColor:"white",
 padding:8,
 alignSelf:"center",
 marginTop: 20
},
searchBoxField:{
   borderColor:"#777",
   borderWidth:1,
   borderRadius:4,
   paddingHorizontal:8,
   paddingVertical:4,
   fontSize:18,
   marginBottom:8,
},
buttonContainer:{
  alignItems:"center",
  justifyContent:"center",
  padding:8,
  backgroundColor:Colors.primary,
  borderRadius:8,

},
buttonLabel:{
  fontSize:18,
  color:"white"

}



})
  
  export default third;