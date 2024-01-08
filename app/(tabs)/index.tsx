import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listing";
import { Link, Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

import ListingsMap from "@/components/ListingsMap";
import { fetchData } from '@/constants/api';
import ListingsBottomSheet from "@/components/ListingsBottomSheet";

const Page = () => {
    const [category, setCategory] = useState<string>('Rooms');
  const onDataChanged = (category: string) => {
    setCategory(category);

  };

  const [listingsData , setData] = useState([]);

  useEffect(() => {
    fetchData()
      .then(data => {
        setData(data);
      });
  }, []);
  const items = useMemo(() => {
    return listingsData;
  }, [listingsData]);
return (
    <View style={{ flex: 1, marginTop: 130}}>
      <Stack.Screen
      options={{
        header : () => <ExploreHeader onCategoryChanged={onDataChanged} />
      }}
      />
    
       <ListingsMap listings={listingsData} category={category}/>
       <ListingsBottomSheet listings={items} category={category} />
    </View>
  );
};
export default Page;