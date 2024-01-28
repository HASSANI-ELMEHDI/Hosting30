import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ScrollView, FlatList, Button } from 'react-native';

import {Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

import { fetchData } from '@/constants/api';
import Itinerary from '@/components/Itinerary';
import Spinner from 'react-native-loading-spinner-overlay';


const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;
const DetailsPage = () => {

 

  const { id } = useLocalSearchParams();
  const [listingsData , setData] = useState([]);

  useEffect(() => {
    console.log("Comming with id :", id)
    fetchData()
      .then(data => {
        setData(data);
      });
      console.log("The data:", listingsData)
  }, []);
  const listing = (listingsData as any[]).find((item) => item._id === id);
  const navigation = useNavigation();


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <View style={[styles.header]}></View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={'#000'} />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <View style={styles.container}>
         {listing?.latitude && listing?.longitude ? (
      <Itinerary latitude={listing.latitude} longitude={listing.longitude} />
    ) : (
      <View>
         <Spinner visible={true} />
     </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'mon-sb',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: 'mon-sb',
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: 'mon',
  },
  ratings: {
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    color:Colors.primary,
    fontSize: 18,
    fontFamily: 'mon-sb',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  header: {
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },

  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: 'mon',
  },
});

export default DetailsPage;