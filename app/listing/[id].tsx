import { Link, router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ScrollView, FlatList, Button } from 'react-native';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { createWish, deleteWish, fetchData } from '@/constants/api';
import Itinerary from '@/components/Itinerary';
import MapScreen from '@/components/Itinerary';
import { useAuth, useUser } from '@clerk/clerk-expo';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;
const DetailsPage = () => {
  

  const [showMap,setShowMap] = useState(false);
  const renderItem = ({ item }:any) => (
    <Image source={{ uri: item }} style={styles.image} />
  );

  const { id } = useLocalSearchParams();
  const [listingsData , setData] = useState([]);
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const [exist,setExist]=useState(false)

  const wish =  () => {
    if (isSignedIn) {
      const per = `${id}${user?.id}`;
        if(exist){
        deleteWish(per);
        setExist(false)
        }
        else{
          // If the delete operation fails with a 404 error, it means the wish doesn't exist
          console.log(`Wish with ID ${per} does not exist. Creating a new one.`);
  
          const newWish = {
            id: per,
            logementId: id,
            userId: user?.id,
          };
  
          try {
            const data =  createWish(newWish);
            console.log(data);
            setExist(true)

          } catch (createError) {
            console.error(createError);
          }
        }
    } else {
      router.replace('/login');
    }
  };
  
  
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

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing?.name,
        url: listing?.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,

      headerBackground: () => (
        <View style={[styles.header]}></View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
           <Link href={`/naviging/${id}`} asChild>
              <TouchableOpacity style={styles.roundButton}>
                <FontAwesome name="location-arrow" size={22} color={'#000'} />
              </TouchableOpacity>
           </Link>
          <TouchableOpacity style={styles.roundButton} onPress={shareListing}>
            <Ionicons name="share-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton} onPress={wish}>
            <Ionicons name="heart-outline" size={22} color={'#000'} />
          </TouchableOpacity>
          
        </View>
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
   <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}>
      <FlatList
        data={listing?.xl_picture_url}
        renderItem={renderItem}
        keyExtractor={(item:any, index:any) => index.toString()}
        horizontal={true} // Set to true if you want a horizontal list
        />
         
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{listing?.name}</Text>
          <Text style={styles.location}>
            {listing?.type} in {listing?.smart_location}
          </Text>
          <View style={styles.divider} />

          <View style={styles.hostView}>
            <Image source={{ uri: listing?.host_picture_url }} style={styles.host} />

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16 }}>Hosted by {listing?.host_name}</Text>
              <Text>Host since {listing?.host_since}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{listing?.description}</Text>
          <Text>Rules</Text>
          <Text style={styles.description}>{listing?.house_rules}</Text>
        </View>
     
      </ScrollView>

      <View style={defaultStyles.footer} >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
            <Text style={styles.footerPrice}>€{listing?.price}</Text>
            <Text style={{color:Colors.primary}}> / per night</Text>
          </TouchableOpacity>
 
          <TouchableOpacity onPress={()=> router.push(`/reserving/${id}`)} style={[defaultStyles.btn,  { paddingRight: 20,backgroundColor: Colors.green, paddingLeft: 20 },]}>
            <Text style={defaultStyles.btnText}>Reserve</Text>
          </TouchableOpacity>
        </View>
    </View>
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