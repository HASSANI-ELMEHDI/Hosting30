import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Share, ScrollView, FlatList, Button } from 'react-native';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { fetchData, createReservation } from '@/constants/api';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import * as Haptics from "expo-haptics";
import CalendarPicker from 'react-native-calendar-picker';
import { useAuth, useUser } from '@clerk/clerk-expo';
const { width } = Dimensions.get('window');
const IMG_HEIGHT = 300;
const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);
const DetailsPage = () => {


  
  const [openCard, setOpenCard] = useState(0);
   const [nbrNights, setNbrNights] = useState(1);
  const { id } = useLocalSearchParams();
  const [listingsData , setData] = useState([]);
  const [Nbrtenants, setNbrtenants] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
    const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const onDateChange = (date : any , type : any) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
	
  }
  useEffect(() => {
	if( selectedStartDate && selectedEndDate) 
	{
		// ToDo : calculate nbr of days bw start & end date
		const nbr = parseInt(endDate.split(" ")[2]) - parseInt(startDate.split(" ")[2])
		setNbrNights(nbr +1) 
	}
    
  }, [selectedStartDate ,selectedEndDate]);


  const minDate = new Date(); // Todo : min from database
  const maxDate = new Date(2024, 0,25 ); // Todo : max from database

  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
      });
  }, []);
  const listing = (listingsData as any[]).find((item) => item._id === id);
  const navigation = useNavigation();
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
const reserver = () =>
{ 
	  if(isSignedIn)
	  {
		if(!selectedEndDate) setSelectedEndDate(selectedStartDate);
		const newReservation = {
			logmentId: id, 
			title: listing?.name,
          imgUrl : listing?.xl_picture_url[0],
            smartAdress : listing?.smart_location,
			startDate: selectedStartDate, 
			endDate: selectedEndDate, 
			status: 'comming', 
			nbrTenants: Nbrtenants, 
			price: nbrNights * listing?.price, 
			idLodger : email,
		  };
		createReservation(newReservation)
		.then(data => {
		  console.log(data); 
		  router.replace('/(tabs)/reservations');
		})
		.catch(error => {
		  console.error(error);
		});

	  }else router.replace('/login');
}

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Confirm reservation',
      headerTransparent: false,

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
    <View style={styles.container} >
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}
			>
         	{/* When */}
				<View style={[stylesBody.card]}>
					{openCard != 1 ? (
						<AnimatedTouchableOpacity
							style={stylesBody.cardPreview}
							onPress={() => setOpenCard(1)}
							entering={FadeIn.duration(200)}
							exiting={FadeOut.duration(200)}
						>
							<Text style={stylesBody.previewText}>When</Text>
							<Text style={stylesBody.previewDate}>Choose</Text>
						</AnimatedTouchableOpacity>
					) : (
						<>
							<Animated.Text
								style={stylesBody.cardHeader}
								entering={FadeIn.delay(100)}
							>
								When's your trip?
							</Animated.Text>

							<Animated.View
								style={[stylesBody.cardBody]}
								entering={FadeIn.delay(100)}
							>
                             <CalendarPicker
                               previousComponent ={<MaterialIcons name="navigate-before" size={24} color={Colors.primary} />}
                                nextComponent ={<MaterialIcons name="navigate-next" size={24} color={Colors.primary} />}
                                startFromMonday={true}
                                allowRangeSelection={true}
                                minDate={minDate}
                                maxDate={maxDate}
                                selectedDayColor={Colors.yellow}
								 selectedDayTextColor="#FFFFFF" 
								 onDateChange={onDateChange} />
							</Animated.View>
						</>
					)}
				</View>
        	{/* Who */}
				<View style={stylesBody.card}>
						<Text style={stylesBody.cardHeader}>
								Who's coming?
						</Text>
						{/*<Text style={stylesBody.capacityText}>
								The maximum capacity of this accommodation is limited to {listing?.accommodates} occupants.
					</Text>*/}
                       <View style={[stylesBody.cardBody, { paddingHorizontal: 20 }]}>
									<View style={[stylesBody.guestItem]}>
										<View>
											<Text style={{ fontSize: 14, fontFamily: "mon-sb" }}>
                                              Number of people
											</Text>
											<Text
												style={{
													fontSize: 14,
													fontFamily: "mon",
													color: Colors.grey,
												}}
											>
												{Nbrtenants} tenant(s)
											</Text>
										</View>

										<View
											style={{
												flexDirection: "row",
												gap: 10,
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											<TouchableOpacity
												onPress={() => {
													if (Nbrtenants > 0)
														Haptics.impactAsync(
															Haptics.ImpactFeedbackStyle.Light
														);
													setNbrtenants(Nbrtenants > 1 ? Nbrtenants - 1 : 1);
												}}
											>
												<Ionicons
													name="remove-circle-outline"
													size={26}
													color={
														Nbrtenants > 1 ? Colors.grey : "#dedede"
													}
												/>
											</TouchableOpacity>

											<Text
												style={{
													minWidth: 18,
													fontSize: 17,
													fontFamily: "mon",
													textAlign: "center",
												}}
											>
												{Nbrtenants}
											</Text>

											<TouchableOpacity
												onPress={() => {
                                                   setNbrtenants(Nbrtenants < listing?.accommodates ? Nbrtenants + 1 : listing?.accommodates);
													Haptics.impactAsync(
														Haptics.ImpactFeedbackStyle.Light
													);
												}}
											>
												<Ionicons
													name="add-circle-outline"
													size={26}
													color={
														Nbrtenants === listing?.accommodates ? "#dedede" : Colors.grey 
													}
												/>
											</TouchableOpacity>
										</View>
									</View>
							
							</View>
							
		
				</View>


       </ScrollView>

      <View style={defaultStyles.footer} >
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity style={styles.footerText}>
          <View
          style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <Text>
			<Text style={{color:Colors.primary,textDecorationLine :'underline'}}>Total :</Text>
            <Text style={styles.footerPrice}> €{listing?.price * nbrNights}</Text>
            </Text>
			<Text style={{color:Colors.dark}}> {Nbrtenants} Tenant(s)</Text>
        
                     <Text style={{color:Colors.dark,textDecorationLine :'underline'}}>
                      { startDate.split(" ")[1] } { startDate.split(" ")[2]}
					  { ( selectedStartDate && selectedEndDate ) && (<Text>-</Text>  )}
                      { endDate.split(" ")[1] } { endDate.split(" ")[2] }
                    </Text>
            
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity
                  style={[
                         defaultStyles.btn,
                         { paddingRight: 20, paddingLeft: 20 },
						 selectedStartDate ? { backgroundColor: Colors.primary } : { backgroundColor: Colors.grey },
                        ]}
                onPress={reserver}
                disabled={!selectedStartDate}
            >
  <Text style={defaultStyles.btnText}>Confirm</Text>
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



const stylesBody = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
		alignItems: "center",
	},
	card: {
		margin: 10,
		gap: 20,
		backgroundColor: "#fff",
		borderRadius: 14,
		elevation: 4,
		shadowColor: "#000",
		shadowOpacity: 0.3,
		shadowRadius: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
	},
	cardHeader: {
		padding: 20,
		fontSize: 16,
		fontFamily: "mon-b",
	},
	cardBody: {
		alignItems: "center",
	},
	cardPreview: {
		padding: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	searchSection: {
		height: 50,
		marginHorizontal: 20,
		marginBottom: 25,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ababab",
		borderRadius: 8,
	},
	inputField: {
		flex: 1,
		padding: 10,
		backgroundColor: "#fff",
	},
	searchIcon: {
		padding: 10,
	},
	place: {
		width: 120,
		height: 120,
		borderRadius: 10,
	},
	placeSelected: {
		width: 120,
		height: 120,
		borderWidth: 2,
		borderColor: Colors.grey,
		borderRadius: 10,
	},
	guestItem: {
		width: "100%",
		paddingVertical: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	guestItemBorder: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: Colors.grey,
	},
	previewText: {
		color: Colors.grey,
		fontSize: 14,
		fontFamily: "mon-sb",
	},
	previewDate: {
		color: Colors.dark,
		fontSize: 14,
		fontFamily: "mon-sb",
    textDecorationLine : 'underline'
	},
  capacityText  : {
    color: Colors.grey,
		fontSize: 14,
    marginTop : 50,
		fontFamily: "mon",

  }
});

export default DetailsPage;