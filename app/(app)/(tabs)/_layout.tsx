import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { colors } from "@/assets/palette/colors";

export default function AppLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <StatusBar />
      <Tabs
        screenOptions={{
          headerTintColor:
            colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900],
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
          },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tabs.Screen name="search" options={{ title: "Search" }} />
        <Tabs.Screen name="rides" options={{ title: "Rides" }} />
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
      </Tabs>
    </>
  );
}
