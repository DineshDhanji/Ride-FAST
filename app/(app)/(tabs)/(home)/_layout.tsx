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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
