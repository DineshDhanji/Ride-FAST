import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import { Text, View, Button } from "react-native";
import { useSession } from "@/session/ctx";
import * as SecureStore from "expo-secure-store";

export default function SignIn() {
  const { signIn, signOut, session, isLoading } = useSession();
  const router = useRouter();

  // If the user is signed in, automatically redirect to the index page
  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Link href={"/_sitemap"}>
        <Text>Link</Text>
      </Link>
      <Button
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace("/");
        }}
        title="Sign In"
      ></Button>
      <View className="mt-3">
        <Button
          onPress={() => {
            signOut();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace("/");
          }}
          title="Sign Out"
        ></Button>
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
