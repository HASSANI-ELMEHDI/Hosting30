import React, { useState, useEffect } from 'react';
import { usePro } from '@/contex/context';
import {
	Button,
	Image,
	View,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	Text,
	FlatList,
  Dimensions,
  TouchableOpacity,
  Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '@/constants/Colors';
const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;
import {firebase} from '@/config'
const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
	const dirInfo = await FileSystem.getInfoAsync(imgDir);
	if (!dirInfo.exists) {
		await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
	}
};

export default function App() {
	const {myImages,setMyImages}=usePro()
	const [modalVisible, setModalVisible] = useState(false);
	const openModal = () => {
	  setModalVisible(true);
	};
  
	const closeModal = () => {
	  setModalVisible(false);
	};
	const [uploading, setUploading] = useState(false);
	const [images, setImages] = useState<any[]>([]);
	const [addingImage, setAddingImage] = useState(false);
	// Load images on startup
	useEffect(() => {
		
	}, []);

	// Select image from library or camera
	const selectImage = async (useLibrary: boolean) => {
		let result;
		const options: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.75
		};

		if (useLibrary) {
			result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);
		}

		// Save image if not cancelled
		if (!result.canceled) {
			saveImage(result.assets[0].uri);
		}
		setAddingImage(false);
		
	};
  // Save image to file system
const saveImage = async (uri: string) => {
	await ensureDirExists();
	const filename = new Date().getTime() + '.jpeg';
	const dest = imgDir + filename;
	await FileSystem.copyAsync({ from: uri, to: dest });
	setImages([...images, dest]);
	closeModal()
	
};
const [prevTableLength, setPrevTableLength] = useState(0);


useEffect (()=> {
	if(images.length>prevTableLength && images.length) uploadImage()
	setPrevTableLength(images.length)
},[images])

useEffect (()=> {
	myImages.pop()
},[])


const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
	  const lastIndex=images.length -1 ;
	  console.log("_____",lastIndex)
      xhr.open('GET', images[lastIndex], true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`Pictures/Image${images[images.length-1]}`)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
		  myImages.push(url)
          blob.close()
          return url
        })
      }
      )
  }

// Delete image from file system
const deleteImage = async (uri: string) => {
	await FileSystem.deleteAsync(uri);
	for(const [index, e] of images.entries()){
		if(e===uri)
		{
			const newArray = [...myImages];
			newArray.splice(index, 1);
			setMyImages(newArray)
		}
	}
	setImages(images.filter((i) => i !== uri));
};

// Render image list item
const renderItem = ({ item, index }: { item: any; index: number }) => {
	if (index === images.length) {
		return (
			<TouchableOpacity style={styles.addContainer} onPress={openModal}>
			<Ionicons name="add" size={100} color={Colors.primary} />
		  </TouchableOpacity>
		);
	  }
	
	return (
		<View style={styles.item}>
  <Image style={{ width: 100, height: 100 }} source={{ uri: item }} />
  <TouchableOpacity style={styles.trashButtonContainer} onPress={() => deleteImage(item)}>
    <Ionicons name="close"  size={16} color={Colors.primary} />
  </TouchableOpacity >
</View>
	);
};

return (
	<SafeAreaView style={{ flex: 1 }}>
     <View style={styles.container}>
      <FlatList
        data={[...images, 'add']} 
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
      
    </View>
		
	<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
          activeOpacity={1}
          onPress={closeModal}
        >
          <View style={{ backgroundColor: 'white', paddingHorizontal: 20, borderRadius: 8, paddingTop: 10 }}>
               <Text style={{ justifyContent: 'center', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Add Photo</Text>
                 <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 10 }}>
					   <TouchableOpacity style ={styles.choice} onPress={() => selectImage(true)}>
					       <Ionicons name="image-outline" size={50} color={Colors.yellow}/>
						   <Text>Gallery</Text>
						</TouchableOpacity> 
						<TouchableOpacity style ={[styles.choice,{marginLeft : 30}]} onPress={() => selectImage(false)}>
						    <Ionicons name="camera-outline" size={50} color={Colors.yellow}  />
							<Text>Camera</Text>
						</TouchableOpacity> 
                 </View>
           </View>
        </TouchableOpacity>
      </Modal>

	</SafeAreaView>
);
      
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  item: {
    position: 'relative',
    width: itemWidth,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
  trashButtonContainer: {
    backgroundColor : 'white',
    position: 'absolute',
    borderRadius :50,
    margin :5,
    top: 0,
    right: 20,
 
  },
  addContainer : {
	borderRadius :8,
	backgroundColor : 'rgba(220, 220, 220, 0.5)',
	width : 100,
	height : 100,
  },
  choice : {

  }
});