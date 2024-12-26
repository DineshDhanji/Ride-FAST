import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { useSession } from "@/session/ctx";

export default function AppLayout() {
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

  // This layout can be deferred because it's not the root layout.
  return (
    <NavigationContainer>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="sign-up" />
      </Stack>
    </NavigationContainer>
  );
}
