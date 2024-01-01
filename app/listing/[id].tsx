import { defaultStyles } from '@/constants/Styles';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';

const DetailsPage = () => {

  const { id } = useLocalSearchParams();

  return (
   <View style={{marginTop:100}}>
    <Text>{id}</Text>
   </View>
  );
};
export default DetailsPage;