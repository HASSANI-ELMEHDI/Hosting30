import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { fetchReservations } from '@/constants/api';
interface CardViewProps {
  imageSource: string;
  title: string;
  endDate: string;
  startDate: string;
  status: string;
  smart_location: string;
  onPress: () => void;
}

const CardView: React.FC<CardViewProps> = ({
  imageSource,
  title,
  endDate,
  startDate,
  status,
  smart_location,
  onPress,
}) => {

  return (
    <Link href={"/(tabs)/"} asChild style={{ marginTop: 3 }}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image source={{ uri: imageSource }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.emptyTitle}>{title}</Text>
          <Text style={styles.emptyText}>{smart_location}</Text>
          <View style={styles.containerBtn}>
            <View style={styles.emptyBtnContainer}>
              <TouchableOpacity style={styles.emptyBtn}>
                <Text style={styles.emptyBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.additionalText}>{endDate}-{startDate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const App = () => {
const [Reservations,setResservations] =useState([]);
  useEffect(() => {
    fetchReservations()
      .then(data => {
        setResservations(data);
      });
  }, []);
  const handleCardPress = () => {
    console.log('Card pressed!');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
     
      {Reservations.map( (item,index) =>
      <CardView
        key={index}
        imageSource='https://a0.muscache.com/im/pictures/bced1392-9538-41df-92d9-f058a7188b0f.jpg?aki_policy=x_large'
        title='Room with big terrace & private bath'
        endDate="1 Jan"
        startDate="3 Jan"
        status="Comming"
        smart_location='Berlin, Germany'
        onPress={handleCardPress}
      />

      )}
      
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  emptyTitle: {
    color: "#000",
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  emptyText: {
    marginTop: 5,
    color: Colors.grey,
    fontSize: 16,
    fontFamily: "mon",
    lineHeight: 19,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    padding: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: '35%',
    height: '100%',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginRight: 3,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  emptyBtn: {
    width: 100,
    padding: 7,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
  },
  emptyBtnText: {
    color: Colors.primary,
    fontSize: 14,
    fontFamily: "mon-sb",
  },
  containerBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBtnContainer: {
    alignSelf: 'flex-end',
  },
  additionalText: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    color: 'gray',
    fontSize: 12,
    fontFamily: 'mon',
  },
});

export default App;