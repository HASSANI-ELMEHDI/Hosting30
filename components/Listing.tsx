import { defaultStyles } from '@/constants/Styles';
import { useAuth, useUser } from '@clerk/clerk-expo';

import { Ionicons } from '@expo/vector-icons';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Link, router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, ListRenderItem, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


interface Props{
    listing:any[];
    refresh: number;
    category:string;

}

const Listings = ({listing:items, refresh,category}:Props) => {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();

  const wish=(id:string)=>{
    if(isSignedIn){
    console.log(id)
    }else router.replace('/login');


  }
    const [loading, setLoading] = useState<boolean>(false);
    const listRef = useRef<FlatList>(null);
    useEffect(() => {
      if (refresh) {
        scrollListTop();
      }
    }, [refresh]);

     const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 200);
      }, [category]);
      const renderRow: ListRenderItem<any> = ({ item }:any) => (
        <Link href={`/listing/${item._id}`} asChild>
        <TouchableOpacity>
          <View style={styles.listings}>
          <Image source={{uri:item["medium_url"][0]}} style={styles.image}/>
            <TouchableOpacity style={styles.heart} onPress={() => wish(item._id)}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 20 }}>
            <Text style={{ fontSize: 16, fontFamily: 'mon-sb' ,color:'#FE0404'}}>{item.name}</Text>
          </View>
          <Text style={{ fontFamily: 'mon',marginLeft: 20 }}>{item.room_type}</Text>
          <View style={{ flexDirection: 'row',marginLeft: 20 , gap: 4 }}>
            <Text style={{ fontFamily: 'mon-sb' ,color:'#FE0404'}}>€ {item.price}</Text>
            <Text style={{ fontFamily: 'mon' ,color:'#FE0404'}}>per night</Text>
          </View>
        </TouchableOpacity>
        
        
      </Link>
      )
  return (
    <View style={defaultStyles.container}>
    <BottomSheetFlatList
    renderItem={renderRow}
    ref={listRef}
    data={loading?[]:items.filter(item => item.type === category)}
    ListHeaderComponent={<Text style={styles.info}>{items.filter(item => item.type === category).length} {category}</Text>}
    />
        

    </View>
  );
};

const styles=StyleSheet.create({
  listings:{
    padding:16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  heart:
  { position: 'absolute', 
  right: 30, 
  top: 30 },
  info: {
    textAlign: 'center',
    fontFamily: 'mon-sb',
    fontSize: 16,
    marginTop: 4,
  },
})


export default Listings;