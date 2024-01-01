import Colors from '@/constants/Colors';
import {  useSignIn } from '@clerk/clerk-expo';
import { useOAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Button } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { OtpInput } from 'react-native-otp-entry';

// https://github.com/clerkinc/clerk-expo-starter/blob/main/components/OAuth.tsx
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@/contex/LoginContex';
import { Image } from 'react-native';


enum Strategy {
  Google = 'oauth_google',
}
const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { emailAddress, setPassword, password, setEmailAddress } = useAuth();
  const [loading, setLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
    }[strategy];
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const { createdSessionId, setActive} = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error('OAuth error', err);
    }finally {
      setLoading(false);
    }
  };


 

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <Text style={[styles.btnOutlineText,styles.text]}>Hoster!</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress} 
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn} onPress={() => router.replace('/(modals)/loginCode')}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
      <Text style={[styles.btnOutlineText,styles.text]}>Lodger!</Text>

        <TouchableOpacity style={styles.btnOutline} onPress={() => onSelectAuth(Strategy.Google)}>
          <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

      </View>
<View style={styles.container1}>
  <Image source={require('@/assets/images/logo30.png')} style={styles.images}/>
</View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  text:{
    marginBottom:20,
    textAlign:'center'
  },
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
});