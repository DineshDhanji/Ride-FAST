import { View, Text, TouchableOpacity } from "react-native";
import { useSession } from "@/session/ctx";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Appearance, useColorScheme } from "react-native";
import axios from "axios";
import { Button } from "@/components/Button";
import { checkUser } from "@/session/checkUser";

export default function Index() {
  const { signOut, session, isLoading } = useSession();
  let colorScheme = useColorScheme();

  const logoutHandler = async () => {
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (BASE_URL === undefined) {
      console.error("Base API URL is not defined");
      return;
    }

    const apiURL = BASE_URL + "/api/auth/logout";

    // Perform sign-out logic here
    axios
      .post(
        apiURL,
        {},
        {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      )
      .then(() => {
        signOut();
      })
      .catch((error) => {
        console.error("Error logging out", error);
      });
  };

  console.log("Session", session);
  return (
    <View className="flex-1 p-3">
      <StatusBar />

      <Text className="text-zinc-900 text-3xl mb-3">Main App Index</Text>
      <View className="flex flex-col items-center justify-start h-max">
        <Link asChild href={"/_sitemap"}>
          <TouchableOpacity className="w-full bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-zinc-50 border border-zinc-950 rounded-lg py-2 px-3 text-center my-1">
            <Text className="text-zinc-50 text-lg text-center">SiteMap</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          onPress={logoutHandler}
          className="w-full bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-zinc-50 border border-zinc-950 rounded-lg py-2 px-3 text-center my-1"
        >
          <Text className="text-zinc-50 text-lg text-center">Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View className="bg-zinc-200 p-3 rounded-lg border border-zinc-950 m-3">
        <View className="flex flex-row items-center my-2">
          <Text className="font-semibold me-3">Session:</Text>
          <Text className="text-lg">{session}</Text>
        </View>
        <View className="flex flex-row items-center my-2">
          <Text className="font-semibold me-3">Loading:</Text>
          <Text className="text-lg">{isLoading ? "True" : "False"}</Text>
        </View>
      </View>

      <Button onPress={() => checkUser(session)} title="Check Status"></Button>
    </View>
  );
}
