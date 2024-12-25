import { Slot } from "expo-router";
import { SessionProvider } from "@/session/ctx";
import "@/global.css";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
