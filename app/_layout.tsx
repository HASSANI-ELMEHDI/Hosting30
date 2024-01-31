import Colors from '@/constants/Colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack, useRouter,useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth, useUser } from '@clerk/clerk-expo';
import { AuthProvider } from '@/contex/LoginContex';
import { initData } from '@/constants/api';
import { ContProvider } from '@/contex/context';


const CLERK_PUBLISHABLE_KEY = 'pk_test_c3RpbGwtcGFudGhlci00NC5jbGVyay5hY2NvdW50cy5kZXYk';
// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    mon: require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'), 
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  useEffect(() => {
    initData();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
     <AuthProvider>
      <ContProvider>
        <RootLayoutNav />
        </ContProvider>
      </AuthProvider> 
    </ClerkProvider>
  );
}

const RootLayoutNav = () => {
  const { isLoaded, isSignedIn,signOut } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const { user } = useUser();
  const [strategyAuth, setStrategyAuth] = useState(user?.externalAccounts[0]?.verification?.strategy);

 
  useEffect(() => {
    if (!isLoaded) return;
    setStrategyAuth(user?.externalAccounts[0]?.verification?.strategy)
    console.log('User changed: ', isSignedIn);
    if (isSignedIn) {
      strategyAuth === "oauth_google" ? router.replace('/hoster/') : router.replace('/(tabs)') 
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn,strategyAuth]);

  
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Log in or sign up',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
        <Stack.Screen
        name="(modals)/loginCode"
        options={{
          presentation: 'modal',
          title: 'Verification code',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/')}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />

   <Stack.Screen
        name="hoster/add"
        options={{
          presentation: 'modal',
          title: 'Add offer',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
            
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/hoster/')}>
              <Ionicons name="arrow-back" size={28} color="black" style={{marginRight : 10}} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="hoster/index"
        options={{
          presentation: 'modal',
          title: 'Offers management ',
          headerTitleStyle: {
            fontFamily: 'mon-sb',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() =>{
              signOut()
              router.replace('/')            }
            }>
              <AntDesign name="logout" size={28} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
        />
       <Stack.Screen name="listing/[id]" options={{ headerTitle: '',headerTransparent:true }} />
       <Stack.Screen name="reserving/[id]" options={{ headerTitle: '',headerTransparent:false }} />
       <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTransparent: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: '#fff',
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}>
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      />
      </Stack>
      
  );
}


export default RootLayout;