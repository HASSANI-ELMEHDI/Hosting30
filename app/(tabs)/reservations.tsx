import {
	View,
	Text,
	StyleSheet,
	Platform,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { Stack, Link } from "expo-router";

// CONSTANTS
import Colors from "@/constants/Colors";
import BookingCard from "@/components/Reservation";

const Page = () => {
 
	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					header: () => (
						<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
							<View style={styles.header} />
						</SafeAreaView>
					),
				}}
			/>

			<View style={styles.title}>
				<Text style={styles.titleText}>Reservations</Text>
			</View>
{/*
			<View style={styles.empty}>
				<Text style={styles.emptyTitle}>No accommodations booked...yet!</Text>

				<Text style={styles.emptyText}>
           Your dream accommodation for the World Cup:
           <Text style={{fontWeight :'bold'}}> Welcome the World to Your Home!</Text>
				</Text>

				<Link href={"/(tabs)/"} asChild>
					<TouchableOpacity style={styles.emptyBtn}>
						<Text style={styles.emptyBtnText}>Start searching</Text>
					</TouchableOpacity>
				</Link>
			</View>*/}
      <BookingCard/>
      
		</View>
	);
};

export default Page;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop:40,
		backgroundColor: "#fff",
	},
	header: {
		height:  40,
	},
	title: {
		marginTop: 20,
		marginHorizontal: 30,
		paddingBottom: 15,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: Colors.grey,
	},
	titleText: {
		color: "#000",
		fontSize: 20,
		fontFamily: "mon-b",
	},
	empty: {
		marginTop: 25,
		marginHorizontal: 30,
		paddingBottom: 30,
		
	},
	emptyTitle: {
		color: "#000",
		fontSize: 18,
		fontFamily: "mon-sb",
	},
	emptyText: {
		marginTop: 10,
		color: Colors.grey,
		fontSize: 16,
		fontFamily: "mon",
		lineHeight: 19,
	},
	emptyBtn: {
		width: Platform.OS === "ios" ? 160 : 180,
		marginTop: 25,
		padding: 16,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: Colors.dark,
		borderRadius: 8,
	},
	emptyBtnText: {
		color: Colors.dark,
		fontSize: 16,
		fontFamily: "mon-sb",
	},
	helpInstructions: {
		marginTop: 20,
		marginHorizontal: 30,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 4,
	},
	helpInstructionsText: {
		color: Colors.grey,
		fontSize: 15,
		fontFamily: "mon",
	},
	helpInstructionsLink: {
		color: Colors.dark,
		fontSize: 15,
		fontFamily: "mon-sb",
		textDecorationLine: "underline",
	},
});
