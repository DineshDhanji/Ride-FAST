import { useColorScheme } from "react-native";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SessionProvider } from "@/session/ctx";
import { colors } from "@/assets/palette/colors";
import "@/global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SessionProvider>
      <StatusBar
        animated={true}
        backgroundColor={colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100]}
      />
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </SessionProvider>
  );
}
