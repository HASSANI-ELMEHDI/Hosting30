import Colors from '@/constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { getLogmentsByHoster,deleteLogment } from '@/constants/api';
import { useUser } from '@clerk/clerk-expo';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
interface CardViewProps {
  id : string;
  logmentId : string;
  imageSource: string;
  title: string;
  endDate: string;
  startDate: string;
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
  smart_location,
  onPress,
}) => {

  return (
      <View style={styles.card} >
         <Image source={{ uri: imageSource }} style={styles.cardImage}  />
        <View style={styles.cardContent}>
          <Text style={styles.emptyTitle}>{title}</Text>
          <Text style={styles.emptyText}>{smart_location}</Text>
          <View style={styles.containerBtn}>
            <View style={styles.emptyBtnContainer}>
              <TouchableOpacity style={styles.emptyBtn} onPress={onPress}>
                <Text style={styles.emptyBtnText}>Delete</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.additionalText}>{moment(startDate).format('D MMM')} - {moment(endDate).format('D MMM')}</Text>

          </View>
        </View>
      </View>
    
     
  );
};
const App = () => {

  const [hosterLogments,setHosterLogments] = useState([]);
  const { user } = useUser();
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress+"");
  useEffect(()=> {
    getLogmentsByHoster(email)
    .then(data => {
      setHosterLogments(data);
    });
  },[])
  const noUserReservations = hosterLogments.length === 0;

  const deleteOffer= (id : string) => {
    deleteLogment(id)
    console.log("dellllete : "+ id)
    getLogmentsByHoster(email)
    .then(data => {
      setHosterLogments(data);
    });
  };

  return (
    <View style={styles.container}>
      
      <ScrollView>
    <View style={styles.container1}>
    {noUserReservations ? (
        <View style={styles.empty}>
				<Text style={styles.emptyTitle}>No accommodations booked...yet!</Text>

				<Text style={[styles.emptyText,{marginTop : 30, marginBottom : 40}]}>
           Your dream accommodation for the World Cup:
           <Text style={{fontWeight :'bold'}}> Welcome the World to Your Home!</Text>
				</Text>
				<Link href={"/hoster/add"} asChild>
					<TouchableOpacity style={styles.emptyBtn1}>
						<Text style={styles.emptyBtnText1}>New offer</Text>
					</TouchableOpacity>
				</Link>
			</View>
      ) : (
        hosterLogments.map((item, index) => {
          return (
            <CardView
              key={index}
              id={item._id}
              logmentId ={item.id }
              imageSource={item.medium_url[0]}
              title={item.name}
              endDate={item.End}
              startDate={item.Start}
              smart_location={item.smart_location}
              onPress={() => deleteOffer(item._id)}
            />
          );
        })
      )}
    </View>
    </ScrollView>

      {/* add offer */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=> router.replace('/hoster/add')}>
          <Entypo name="plus" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, 
    right: 20, 
  },
  button: {
    backgroundColor: Colors.yellow, 
    padding: 10, 
    borderRadius: 25, 
  },
  container1: {
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