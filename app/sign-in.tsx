import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Image,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { useSession } from "@/session/ctx";

import axios from "axios";

import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { colors } from "@/assets/palette/colors";
import { IconButton } from "react-native-paper";

export default function SignIn() {
  const colorScheme = useColorScheme();
  const { signIn, session } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

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

  // If the user is signed in, automatically redirect to the index page
  if (session) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 bg-zinc-100 dark:bg-zinc-900 px-5 pt-14">
      <AlertBox ref={alertBoxRef} />
      <View className="flex-1 flex items-center">
        <View className="flex justify-center items-center my-14 p-5 w-full">
          <Image
            className="size-40 rounded-3xl"
            source={require("@/assets/images/icon.png")}
            resizeMode="contain"
          />
        </View>
        <KeyboardAvoidingView
          enabled={true}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="mb-3">
            <Text className="text-2xl text-zinc-950 dark:text-zinc-50 font-semibold">
              Login
            </Text>
            <Text className="text-base text-zinc-800 dark:text-zinc-300 my-1">
              Login to enjoy beautiful, safe ride with RIDE-FAST
            </Text>
          </View>
          <View className="mb-3">
            <Text className="text-base text-zinc-950 dark:text-zinc-50 mb-1">
              Username
            </Text>
            <TextInput
              className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              autoCapitalize="none"

              returnKeyType="next"
              onSubmitEditing={() => {
                this.secondTextInput.focus();
              }}
            />
            <Text className="text-base text-zinc-950 dark:text-zinc-50 mb-1">
              Password
            </Text>
            <View className="relative">
              <TextInput
                className="w-full border-b-2 border-zinc-400 dark:border-zinc-600   placeholder:text-zinc-400 dark:placeholder:text-zinc-400 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 ps-2 pe-16 mb-3 text-base h-12"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={showPassword}
                ref={(input) => {
                  this.secondTextInput = input;
                }}
                // placeholder="Enter your password"
              />
              <View className="absolute right-0 top-[-3px]">
                <IconButton
                  icon={showPassword ? "eye" : "eye-off"}
                  iconColor={
                    colorScheme == "dark" ? colors.zinc[400] : colors.zinc[600]
                  }
                  size={20}
                  animated={true}
                  accessibilityLabel={"Toggle password visibility"}
                  onPress={() => setShowPassword((sp) => !sp)}
                />
              </View>
            </View>
          </View>
          <Button
            onPress={loginHandler}
            disabled={loginButtonDisabled}
            title={"Login"}
          ></Button>
        </KeyboardAvoidingView>
        <View className="mb-3 flex flex-row  justify-center items-end flex-1">
          <Text className="text-zinc-900 dark:text-zinc-50 text-base me-2">
            Don't have an account?
          </Text>
          <Link asChild href="/sign-up">
            <Text className="text-zinc-900 dark:text-zinc-50 text-base font-semibold underline">
              Register Now
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
