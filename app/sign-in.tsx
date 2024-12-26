import { useState, useRef } from "react";
import { View, Text, TextInput, SafeAreaView } from "react-native";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import { useSession } from "@/session/ctx";
import { getToken } from "@/session/getToken";
import { checkUser } from "@/session/checkUser";

import axios from "axios";

import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { colors } from "@/assets/palette/colors";

export default function SignIn() {
  const { signIn, session } = useSession();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);
  const alertBoxRef = useRef(null);

  const loginHandler = async () => {
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (BASE_URL === undefined) {
      console.error("Base API URL is not defined");
      return;
    }

    const apiURL = BASE_URL + "/api/auth/login";
    // const csrfToken = await getToken();
    setLoginButtonDisabled(true);
    axios
      .post(apiURL, {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        const accessToken = data.access;
        const refreshToken = data.refresh;
        signIn(accessToken, refreshToken);
      })
      .catch((error) => {
        if (error.response) {
          let errorMessage = error.response.data.errorMessage;
          console.log("Error:", errorMessage);
          alertBoxRef.current.setMessage(errorMessage);
          alertBoxRef.current.setMessageTitle("Login Error");
          alertBoxRef.current.showModal();
        }
      })
      .finally(() => {
        setLoginButtonDisabled(false);
      });
  };

  console.log("Session", session);
  // If the user is signed in, automatically redirect to the index page
  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-100 dark:bg-zinc-900">
      <AlertBox ref={alertBoxRef} />

      <View className="flex-1 justify-center items-center p-3">
        <View className="bg-zinc-200 dark:bg-zinc-800 w-11/12 h-max border border-zinc-400 dark:border-zinc-600 rounded-lg p-4">
          <Text className="font-semibold text-2xl text-zinc-950 dark:text-zinc-50">
            Headline Large
          </Text>
          <View>
            <Text className="text-zinc-900 dark:text-zinc-50 mb-1">
              Sign in to your account
            </Text>
            <View className="mt-3">
              <TextInput
                className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2 mb-3"
                placeholder="Username"
                onChangeText={setUsername}
              />
              <TextInput
                className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 rounded-lg p-2 mb-3"
                placeholder="Password"
                onChangeText={setPassword}
              />
              <Button
                onPress={loginHandler}
                disabled={loginButtonDisabled}
                title="Login"
              ></Button>
            </View>
          </View>
          <View className="h-max mt-3">
            <Button
              onPress={() => {
                console.log("A");
                checkUser();
              }}
              title="Check Status"
            ></Button>
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
