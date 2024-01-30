import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBFpJ9uLpcep5bQwkBruNLn4EiqBQvHeYI'; // Remplacez par votre clé d'API Google Maps

interface Props {
  latitude: number;
  longitude: number;
}

const Itinerary = ({ latitude, longitude }: Props) => {
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [coordinates, setCoordinates] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(latitude,longitude)
      setCoordinates([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          latitude: latitude,
          longitude: longitude,
        },
      ]);
    })();
  }, [location]);

  const mapView = useRef<MapView>(null);

  const onMapPress = (e: any) => {
    // Faites quelque chose lorsque l'utilisateur appuie sur la carte
  };

  const onDirectionsReady = (result: any) => {
    mapView.current?.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: width / 20,
        bottom: height / 20,
        left: width / 20,
        top: height / 20,
      },
    });
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          ref={mapView}
          onPress={onMapPress}
        >
          <Marker  coordinate={coordinates[0]} >
          <View style={styles.markerContainer}>
      <View style={styles.markerCircle}>
        <View style={styles.markerCore} />
      </View>
    </View>
          </Marker>
          <Marker  coordinate={coordinates[1]} >
            <View>
            <Ionicons name="home" size={28} color="red" />
            </View>
          </Marker>
            
    
        
          {coordinates.length === 2 && (
            <MapViewDirections
              origin={coordinates[0]}
              destination={coordinates[1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="blue"
              onReady={onDirectionsReady}
              onError={(errorMessage) => {
                console.log('GOT AN ERROR:', errorMessage);
              }}
            />
          )}
        </MapView>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderColor: 'rgba(39, 71, 245, 0.45)',
  },
  markerCore: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
});

export default Itinerary;