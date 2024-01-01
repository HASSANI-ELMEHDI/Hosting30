
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import MapView,{ MapMarker, PROVIDER_GOOGLE } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';


interface Props{
    listings:any[]
    category:string;

}
const ListingsMap = ({listings,category}:Props) => {
    const router=useRouter();
    const onMarker=(item:any)=>{
        router.push(`/listing/${item._id}`)
    }
  return (
    <View style={styles.container}>
    <MapView style={StyleSheet.absoluteFill} 
    provider={PROVIDER_GOOGLE}
    showsUserLocation showsMyLocationButton>
        {listings.filter(item => item.type === category).map((item:any)=>(
          
            <MapMarker 
            onPress={()=>onMarker(item)}
            key={item.id}
            coordinate={{latitude:item.latitude,longitude: item.longitude}}>
                <LinearGradient colors={[ 'green','yellow','red']} style={styles.marker} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <Text style={styles.markerText}>€ {item.price}</Text>
                </LinearGradient>
              </MapMarker>
        ))}
        </MapView>
  </View>
  );
};
const styles = StyleSheet.create({
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
      },
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    marker: {
        padding:4,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 100,
      },
  });

export default ListingsMap;