import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { colors } from "@/assets/palette/colors";

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={
          colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100]
        }
      />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor:
            colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900],
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Offer Ride" }} />

        <Stack.Screen
          name="createRide"
          options={{ title: "Ride Creation Form" }}
        />
      </Stack>
    </>
  );
}