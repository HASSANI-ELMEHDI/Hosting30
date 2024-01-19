import Colors from '@/constants/Colors';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { fetchLogmentById, fetchReservations,deleteReservation } from '@/constants/api';
import { useAuth, useUser } from '@clerk/clerk-expo';
import moment from 'moment';
interface CardViewProps {
  id : string;
  logmentId : string;
  imageSource: string;
  title: string;
  endDate: string;
  startDate: string;
  status: string;
  smart_location: string;
  onPress: () => void;
}

const CardView: React.FC<CardViewProps> = ({
  id,
  logmentId ,
  imageSource,
  title,
  endDate,
  startDate,
  status,
  smart_location,
  onPress,
}) => {

  return (
    <Link href={`/listing/${logmentId}`} asChild>
      <TouchableOpacity style={styles.card} >
         <Image source={{ uri: imageSource }} style={styles.cardImage}  />
        <View style={styles.cardContent}>
          <Text style={styles.emptyTitle}>{title}</Text>
          <Text style={styles.emptyText}>{smart_location}</Text>
          <View style={styles.containerBtn}>
            <View style={styles.emptyBtnContainer}>
              <TouchableOpacity style={styles.emptyBtn} onPress={onPress}>
                <Text style={styles.emptyBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.additionalText}>{moment(startDate).format('D MMM')} - {moment(endDate).format('D MMM')}</Text>

             {/*<Text style={styles.additionalText}>01 Jan-10 Jan</Text>*/}
          </View>
        </View>
      </TouchableOpacity>
      </Link>
     
  );
};

const App = () => {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  if(isSignedIn){
const [Reservations,setResservations] =useState<any[]>([]);
  useEffect(() => {
    fetchReservations()
      .then(data => {
        setResservations(data);
      });
  }, [Reservations]);
  const cancelReservation = (id : string) => {
    
    deleteReservation(id)
    console.log("dellllete : "+ id)
    fetchReservations()
    .then(data => {
      setResservations(data);
    })
    .catch(error => {
     
    });
  };


  const userReservations = Reservations.filter(item => item.idLodger === email);
  const noUserReservations = userReservations.length === 0;

  return (
    <ScrollView>
    <View style={styles.container}>
    {noUserReservations ? (
        <View style={styles.empty}>
				<Text style={styles.emptyTitle}>No accommodations booked...yet!</Text>

				<Text style={[styles.emptyText,{marginTop : 30, marginBottom : 40}]}>
           Your dream accommodation for the World Cup:
           <Text style={{fontWeight :'bold'}}> Welcome the World to Your Home!</Text>
				</Text>

				<Link href={"/(tabs)/"} asChild>
					<TouchableOpacity style={styles.emptyBtn1}>
						<Text style={styles.emptyBtnText1}>Start searching</Text>
					</TouchableOpacity>
				</Link>
			</View>
      ) : (
        userReservations.map((item, index) => {
          return (
            <CardView
              key={index}
              id={item._id}
              logmentId ={item.logmentId }
              imageSource={item.imgUrl}
              title={item.title}
              endDate={item.endDate}
              startDate={item.startDate}
              status={item.status}
              smart_location={item.smartAdress}
              onPress={() => cancelReservation(item._id)}
            />
          );
        })
      )}
    </View>
    </ScrollView>
  );
}else router.replace('/login');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
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
  empty: {
		marginTop: 25,
		marginHorizontal: 30,
		paddingBottom: 30,
		
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
  emptyBtn1: {
    padding: 7,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
  },
  emptyBtnText1: {
    color: Colors.grey,
    fontSize: 14,
    fontFamily: "mon-sb",
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