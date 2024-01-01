import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { defaultStyles } from '@/constants/Styles';
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [country, setCountry] = useState(user?.publicMetadata?.country);
  const [address, setAddress] = useState(user?.publicMetadata?.address);
  const [languages, setLanguages] = useState(user?.publicMetadata?.languages);
  const [phone, setPhone] = useState(user?.publicMetadata?.phone);
  const [born, setBorn] = useState(user?.publicMetadata?.born);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (!user) {
      return;
    }
    console.log(user)
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  // Update Clerk user data
  const onSaveUser = async () => {
    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  // Capture image from camera roll
  // Upload to Clerk as avatar
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        scrollEventThrottle={16}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {user && (
        <View style={styles.card}>
          <View style={{alignItems : 'center'}}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {!edit && (
              <View style={styles.editRow}>
                <Text style={{ fontFamily: 'mon-b', fontSize: 22 }}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
            {edit && (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First Name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, { width: 100 }]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          </View>
          <View style={{flexDirection : 'row' }}>
             <Ionicons style={styles.icon}  name="md-mail-outline"/>
             <Text>Email :  {email}</Text>
          </View>
          <View style={{flexDirection : 'row' }}>
             <Ionicons style={styles.icon}  name="md-earth-outline"/>
             <Text>Country :  {country}</Text>
          </View>
          <View style={{flexDirection : 'row' }}>
            <Feather style={styles.icon}  name="phone"/>
            <Text>Phone :  {phone}</Text>
          </View>
          <View style={{flexDirection : 'row' }}>
          <MaterialCommunityIcons style={styles.icon} size={15} name="balloon"/>
            <Text>Born in :  {born}</Text>
          </View>
          <View style={{flexDirection : 'row' }}>
            <Ionicons style={styles.icon}  name="md-home-outline"/>
             <Text>Address :  {address}</Text>
          </View> 
          <View style={{flexDirection : 'row' }}>
          <FontAwesome style={styles.icon} name="language" />
            <Text>Languages :  {languages}</Text>
          </View>
          <View style={{alignItems :'center'}}>
          <Text style={{color : Colors.grey}}>Since {user?.createdAt!.toLocaleDateString()}</Text>
          </View>
          
        </View>
      )}

      {isSignedIn && 
      <TouchableOpacity style={[defaultStyles.btn,styles.cardBtn]} onPress={() => signOut()}>
        <Text style={defaultStyles.btnText}>Log Out</Text>
      </TouchableOpacity>
      }
      {!isSignedIn && (
        <Link href={'/(modals)/login'} asChild>
          <Button title="Log In" color={Colors.dark} />
        </Link>
      )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    }
    ,
    
    gap: 14,
    marginBottom: 24,
  },
  cardBtn: {
    borderRadius: 10,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  icon :{
    marginTop : 4,
    marginRight : 10 
  }
});

export default Page;