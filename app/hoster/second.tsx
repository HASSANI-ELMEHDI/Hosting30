import { Text, TouchableOpacity, View } from "react-native";
import React,{useEffect, useState} from 'react'
import Colors from "@/constants/Colors";
import { StyleSheet ,TextInput} from "react-native";
import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import CalendarPicker from 'react-native-calendar-picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ScrollView } from "react-native";
import { usePro } from '@/contex/context';


const second = () => {

  const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);
    const [openCard, setOpenCard] = useState(0);
    const [Nbrtenants, setNbrtenants] = useState(1);
    const [Pricee,setPricee]=useState('')
    const { Start,setStart,
      End,setEnd,
      Numberppl,setNumberppl,
      Description,setDescription,
      Rules,setRules,
      Access,setAccess,
      Price,setPrice,}=usePro();
   
  const onDateChange = (date : any , type : any) => {
    if (type === 'END_DATE') {
      setEnd(date);
    } else {
      setStart(date);
      setEnd(new Date());
    }
	
  }
  function convertStringToFloat(inputString) {
    // Replace comma with dot and parse as float
    return parseFloat(inputString.replace(',', '.'));
  }
 useEffect (()=>{
    setNumberppl(Nbrtenants)
 },[Nbrtenants])
  const handleInputChange = (text) => {
    setDescription(text);
  };
  const handleRulesChange = (text) => {
    setRules(text);
  };
  const handleAccessChange = (text) => {
    setAccess(text);
  };
  const handlePriceChange = (text) => {
    setPricee(text);
    setPrice(convertStringToFloat(Pricee))
    console.log(Start,End,Numberppl,Description,Rules,Access,Price)
  };


  const minDate = new Date();
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={stylesBody.titleText}>Describe your offer</Text>
        {/**When? */}
        <View style={[stylesBody.card]}>
					{openCard != 1 ? (
						<AnimatedTouchableOpacity style={stylesBody.cardPreview} onPress={() => setOpenCard(1)} entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
							<Text style={stylesBody.previewText}>Duration</Text>
							<Text style={stylesBody.previewDate}>Choose</Text>
						</AnimatedTouchableOpacity>
					) : (
						<>
							<Animated.Text style={stylesBody.cardHeader} entering={FadeIn.delay(100)} >
								Duration of logement?
							</Animated.Text>
							<Animated.View style={[stylesBody.cardBody]} entering={FadeIn.delay(100)}>
                <CalendarPicker
                      previousComponent ={<MaterialIcons name="navigate-before" size={24} color={Colors.primary} />}
                      nextComponent ={<MaterialIcons name="navigate-next" size={24} color={Colors.primary} />}
                      startFromMonday={true}
                      allowRangeSelection={true}
                      minDate={minDate}
                      selectedDayColor={Colors.yellow}
                      selectedDayTextColor="#FFFFFF" 
								      onDateChange={onDateChange} />
							</Animated.View>
						</>
					)}
        {/* who?*/}
				</View>
        <View style={stylesBody.card}>
						<Text style={stylesBody.cardHeader}>
								How much people can your logement host?
						</Text>
            <View style={[stylesBody.cardBody, { paddingHorizontal: 20 }]}>
									<View style={[stylesBody.guestItem]}>
										<View>
											<Text style={{ fontSize: 14, fontFamily: "mon-sb" }}>
                         Number of people
											</Text>
											<Text style={{fontSize: 14,fontFamily: "mon",color: Colors.grey,}}>
												{Nbrtenants} tenant(s)
											</Text>
										</View>
										<View style={{flexDirection: "row",gap: 10,	justifyContent: "center",alignItems: "center",}}>
											<TouchableOpacity
												onPress={() => {
													if (Nbrtenants > 0)
														Haptics.impactAsync(
															Haptics.ImpactFeedbackStyle.Light
														);
                            setNbrtenants(Nbrtenants > 1 ? Nbrtenants - 1 : 1);
                  			}}
											>
												<Ionicons name="remove-circle-outline" size={26} 
                        color={	Nbrtenants > 1 ? Colors.grey : "#dedede"}/>
											</TouchableOpacity>
											<Text style={{minWidth: 18,fontSize: 17,fontFamily: "mon",textAlign: "center",}}>
												{Nbrtenants}
											</Text>
											<TouchableOpacity
												onPress={() => {
                          setNbrtenants(Nbrtenants+1);

                          Haptics.impactAsync(
														Haptics.ImpactFeedbackStyle.Light
													);
												}}
											>
												<Ionicons name="add-circle-outline"size={26}/>
											</TouchableOpacity>
										</View>
									</View>
							</View>
				</View>
        <View style={stylesBody.card}>
        <Text style={stylesBody.cardHeader}>
								Description
			  </Text>
          <TextInput style={[stylesBody.cardBody, { margin: 10, marginTop:-20}]}
        placeholder="Type something..."
        onChangeText={handleInputChange}
        value={Description}
        multiline={true}
          />
        </View>
        <View style={stylesBody.card}>
        <Text style={stylesBody.cardHeader}>
								Access
			  </Text>
          <TextInput style={[stylesBody.cardBody, { margin: 10, marginTop:-20}]}
        placeholder="Type something..."
        onChangeText={handleAccessChange}
        value={Access}
        multiline={true}
          />
        </View>
        <View style={stylesBody.card}>
        <Text style={stylesBody.cardHeader}>
								Rules
			  </Text>
          <TextInput style={[stylesBody.cardBody, { margin: 10, marginTop:-20}]}
        placeholder="Type something..."
        onChangeText={handleRulesChange}
        value={Rules}
        multiline={true}
          />
        </View>
        <View style={stylesBody.card}>
        <Text style={stylesBody.cardHeader}>
								Price with Euro $
			  </Text>
        <TextInput style={[stylesBody.cardBody, { margin: 10, marginTop:-20}]}
        placeholder="Enter number..."
        onChangeText={handlePriceChange}
        value={Pricee}
        keyboardType="numeric"
          />
        </View>
        </ScrollView>
        </View>
    );
  };



  
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
      titleText: {
        color: "#000",
        fontSize: 20,
        fontFamily: "mon-b",
    marginVertical:20,
    textAlign:'center'
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
  
    },
    button:{
      padding: 10, height:40, width:80,  borderRadius: 8,margin:20,backgroundColor:'gray' },
      text:{ color: 'white' ,fontSize:15, textAlign:'center', fontFamily: "mon-b",},
      
  });

  export default second;
  