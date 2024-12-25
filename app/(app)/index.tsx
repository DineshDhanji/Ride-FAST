import { View, Text, TouchableOpacity } from "react-native";
import { useSession } from "@/session/ctx";
import { Link } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Index() {
  const { signIn, signOut, session, isLoading } = useSession();
  
  return (
    <View className="flex-1 p-3">
      <Text className="text-zinc-900 text-3xl mb-3">Main App Index</Text>
      <View className="flex flex-col items-center justify-start  flex-1">
        <Link asChild href={"/_sitemap"}>
          <TouchableOpacity className="bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-zinc-50 border border-zinc-950 rounded-lg py-2 px-3 text-center my-1">
            <Text className="text-zinc-50 text-lg">SiteMap</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          onPress={() => {
            signIn();
          }}
          className="bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-zinc-50 border border-zinc-950 rounded-lg py-2 px-3 text-center my-1"
        >
          <Text className="text-zinc-50 text-lg">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          className="bg-zinc-500 hover:bg-zinc-600 active:bg-zinc-700 text-zinc-50 border border-zinc-950 rounded-lg py-2 px-3 text-center my-1"
        >
          <Text className="text-zinc-50 text-lg">Sign Out</Text>
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
    </View>
  );
}
