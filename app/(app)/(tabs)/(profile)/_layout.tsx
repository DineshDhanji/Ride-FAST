import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { colors } from "@/assets/palette/colors";

export default function App() {
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
        <Stack.Screen name="index" options={{ title: "My Profile" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen name="history" options={{ title: "History" }} />
        <Stack.Screen name="faq" options={{ title: "FAQ" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
    </>
  );
}
