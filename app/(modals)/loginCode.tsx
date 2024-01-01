import Colors from '@/constants/Colors';
import {  useSignIn } from '@clerk/clerk-expo';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { OtpInput } from 'react-native-otp-entry';

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@/contex/LoginContex';



const Page = () => {
  useWarmUpBrowser();

 
  const { emailAddress, setPassword, password, setEmailAddress } = useAuth();
  const [loading, setLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();


 
  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {

      console.log("email",emailAddress,"pwd : ",password)
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <Text style={styles.message}>Please enter your
          <Text style={{color : Colors.primary}}> Yallah </Text>
          <Text style={{color : Colors.green}}>Vamos</Text> code 
      </Text>
      <OtpInput 
       focusColor={Colors.primary}
       numberOfDigits={5}
       onFilled={(text) => setPassword(text)}
     />
     
      <TouchableOpacity style={[defaultStyles.btn,{marginTop : 30}]} onPress={onSignInPress}>
        <Text style={defaultStyles.btnText}>Connect</Text>
      </TouchableOpacity>
      <View style={styles.container1}>
          <Image source={require('@/assets/images/logo30.png')} style={styles.images}/>
      </View>
     </View>


  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
    images: {
      width: 200,
      height: 200,
      resizeMode: 'contain',   
    },

  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.grey,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  message : {
    marginBottom : 30,
    color: Colors.grey,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});