import { useColorScheme } from "react-native";
import { Slot, Stack } from "expo-router";
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
        backgroundColor={
          colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100]
        }
      />
      <PaperProvider>
        <Stack
          initialRouteName="sign-in"
          screenOptions={{
            headerShown: false,
            keyboardHandlingEnabled: false,
            headerTintColor:
              colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900],
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
            },
          }}
        >
          <Stack.Screen
            name="sign-up"
            options={{ title: "Sign Up", headerShown: true }}
          />
          <Stack.Screen name="sign-in" options={{ title: "" }} />
        </Stack>
        {/* <Slot/> */}
      </PaperProvider>
    </SessionProvider>
  );
}
