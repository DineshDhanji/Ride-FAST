// import { Text } from "react-native";
import { createContext, useContext } from "react";
import { Stack } from "expo-router";
// import { createStackNavigator } from "@react-navigation/stack";
// import LoginScreen from './index';
// import SignUpScreen from "./sign-up";
import { PaperProvider } from "react-native-paper";
// import ProfileScreen from './index';

// const Stack = createStackNavigator();
export const StackContext = createContext(null);
export default function RootLayout() {
  // const { session, isLoading } = useSession();

  // // You can keep the splash screen open, or render a loading screen like we do here.
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // // Only require authentication within the (app) group's layout as users
  // // need to be able to access the (auth) group and sign in again.
  // if (!session) {
  //   // On web, static rendering will stop here as the user is not authenticated
  //   // in the headless Node process that the pages are rendered in.
  //   return <Redirect href="log-in" />;
  // }

  return (
    <StackContext.Provider
      value={{
        default:
          "../../assets/images/profile_pic.png",
        saved: null,
      }}
    >
      <PaperProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fafafa",
            },
            headerTintColor: "#18181b",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {/* <Stack.Screen name="index" options={{headerShown:false,}}/> */}
          {/* <Stack.Screen name="Personal Details" component={SignUpScreen} options={{headerShown:true,}}/> */}
          {/* <Stack.Screen name="index" component={ProfileScreen} options={{headerShown:true, headerTitle: "Profile"}}/> */}
          {/* <Stack.Screen
            name="index"
            options={{ headerShown: true, headerTitle: "Profile Details" }}
          /> */}
          <Stack.Screen
            name="index"
            options={{ headerShown: true, headerTitle: "Notifications" }}
          />
          {/* <Stack.Screen
            name="camera"
            options={{ headerShown: true, headerTitle: "Camera" }}
          /> */}
          
          {/* <Stack.Screen name="index" component={LoginScreen} options={{headerShown:false,}}/> */}
          {/* <Stack.Screen name="profile" component={ProfileScreen} options={{headerShown:true, headerTitle: "Profile"}}/>
      <Stack.Screen name="sign-up" component={SignUpScreen} options={{headerShown:true, headerTitle: "Personal Details"}}/> */}
        </Stack>
      </PaperProvider>
    </StackContext.Provider>
  );
}
