import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { useSession } from "@/session/ctx";
import { useState } from "react";
import { colors } from "@/assets/palette/colors";
import { Button } from "@/components/Button";
import axios from "axios";

export default function SignIn() {
  const { signIn, session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const result = await signIn(username, password);
  };

  // If the user is signed in, automatically redirect to the index page
  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 dark:bg-zinc-950">
      <View className="flex-1 justify-center items-center p-3">
        <View className="w-11/12 h-max border border-zinc-950 dark:border-zinc-200 rounded-lg p-3">
          <Text className="font-semibold text-2xl text-zinc-950 dark:text-zinc-50">
            Headline Large
          </Text>
          <View>
            <Text className="text-zinc-900 dark:text-zinc-50 mb-1">
              Sign in to your account
            </Text>
            <View className="mt-3">
              <TextInput
                className="w-full border border-zinc-950 dark:border-zinc-200 dark:text-zinc-50 text-zinc-950 rounded-lg p-2 mb-3"
                placeholder="Username"
                onChangeText={setUsername}
              />
              <TextInput
                className="w-full border border-zinc-950 dark:border-zinc-200 dark:text-zinc-50 text-zinc-950 rounded-lg p-2 mb-3"
                placeholder="Password"
                onChangeText={setPassword}
              />
              <Button onPress={loginHandler} title="Login"></Button>
            </View>
          </View>
          <View className="border h-max mt-3">
            {/* <Text>Hello</Text> */}
            <Button onPress={()=>{
              
            }} title="Check Status"></Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Link href={"/_sitemap"}>
    //     <Text>Link</Text>
    //   </Link>
    //   <Button
    //     onPress={() => {
    //       signIn();
    //       // Navigate after signing in. You may want to tweak this to ensure sign-in is
    //       // successful before navigating.
    //       router.replace("/");
    //     }}
    //     title="Sign In"
    //   ></Button>
    //   <View className="mt-3">
    //     <Button
    //       onPress={() => {
    //         signOut();
    //         // Navigate after signing in. You may want to tweak this to ensure sign-in is
    //         // successful before navigating.
    //         router.replace("/");
    //       }}
    //       title="Sign Out"
    //     ></Button>
    //   </View>
    //   <View className="bg-zinc-200 p-3 rounded-lg border border-zinc-950 m-3">
    //     <View className="flex flex-row items-center my-2">
    //       <Text className="font-semibold me-3">Session:</Text>
    //       <Text className="text-lg">{session}</Text>
    //     </View>
    //     <View className="flex flex-row items-center my-2">
    //       <Text className="font-semibold me-3">Loading:</Text>
    //       <Text className="text-lg">{isLoading ? "True" : "False"}</Text>
    //     </View>
    //   </View>
    // </View>
  );
}
