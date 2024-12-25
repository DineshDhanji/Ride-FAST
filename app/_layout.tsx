import { Slot } from "expo-router";
import { SessionProvider } from "@/session/ctx";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import "@/global.css";

export default function RootLayout() {
  return (
    <SessionProvider>
      <StatusBar />
      <PaperProvider>
        <Slot />
      </PaperProvider>
    </SessionProvider>
  );
}
