import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, Redirect } from "expo-router";
import { useSession } from "@/session/ctx";
import axios from "axios";

import { Picker } from "@react-native-picker/picker";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import { colors } from "@/assets/palette/colors";
import { IconButton } from "react-native-paper";

export default function SignUp() {
  const colorScheme = useColorScheme();
  const { signIn, session } = useSession();
  const [signUpButtonDisabled, setLoginButtonDisabled] = useState(false);

  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("N"); // Default to "Not Specified"

  // Phone number validation: Check if it's exactly 11 digits
  const isPhoneNumberValid = phoneNumber.length === 11;

  const alertBoxRef = useRef(null);

  // Refs for all the TextInput fields
  const password1Ref = useRef(null);
  const password2Ref = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const genderRef = useRef(null);

  // If the user is signed in, automatically redirect to the index page
  if (session) {
    return <Redirect href="/" />;
  }

  const showAlert = (message, title = "SignUp Error") => {
    if (alertBoxRef.current === null) {
      return;
    }
    alertBoxRef.current.setMessageTitle(title);
    alertBoxRef.current.setMessage(message);
    alertBoxRef.current.showModal();
  };

  function validateForm() {
    const isValidEmail = (input) => {
      // Regular expression to check if the input is a valid email
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(input);
    };

    if (
      username.length < 1 ||
      password1.length < 1 ||
      password2.length < 1 ||
      email.length < 1 ||
      phoneNumber.length < 1
    ) {
      showAlert("Please fill out all the fields!");
      return false;
    }
    if (password1 !== password2) {
      showAlert("Passwords do not match!");
      return false;
    }
    if (password1.length < 6) {
      showAlert("Password must be at least 6 characters long!");
      return false;
    }
    if (!isValidEmail(email)) {
      showAlert("Please enter a valid email address!");
      return false;
    }
    if (!isPhoneNumberValid) {
      showAlert("Phone number must be exactly 11 digits!");
      return false;
    }
    return true;
  }

  const signUpHandler = async () => {
    if (!validateForm()) {
      return;
    }
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (BASE_URL === undefined) {
      console.error("Base API URL is not defined");
      return;
    }

    const apiURL = BASE_URL + "/api/auth/sign_up";
    console.log(apiURL);
    setLoginButtonDisabled(true);

    axios
      .post(apiURL, {
        username: username,
        password: password1,
        email: email,
        phone_number: phoneNumber,
        gender: gender,
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
          console.error("Error:", errorMessage);
          showAlert(errorMessage ?? "An error occurred");
        }
      })
      .finally(() => {
        setLoginButtonDisabled(false);
      });
  };

  return (
    <ScrollView className="flex-1 bg-zinc-100 dark:bg-zinc-900 px-5 py-3">
      <AlertBox ref={alertBoxRef} />
      <KeyboardAvoidingView
        style={{ height: 200 }}
        keyboardVerticalOffset={100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="mt-5 mb-7">
          <Text className="text-zinc-900 dark:text-zinc-100 text-2xl font-semibold">
            Create an Account
          </Text>
          <Text className="text-zinc-900 dark:text-zinc-100 text-base">
            Join us today and enjoy all the benefits. Please fill out the form
            below to get started. It's quick and easy!
          </Text>
        </View>

        <View className="mb-2">
          <View className="mb-3">
            <Text className="text-lg text-zinc-950 font-medium dark:text-zinc-50 mb-2">
              Username
            </Text>
            <TextInput
              className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 text-base h-12"
              placeholder="satou"
              value={username}
              onChangeText={setUsername}
              keyboardType="default"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => password1Ref.current.focus()}
            />
          </View>

          <View className="mb-3">
            <Text className="text-lg text-zinc-950 font-medium dark:text-zinc-50 mb-2">
              Password
            </Text>
            <TextInput
              ref={password1Ref}
              className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 text-base h-12 relative"
              placeholder="********"
              value={password1}
              onChangeText={setPassword1}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={showPassword}
              returnKeyType="next"
              onSubmitEditing={() => password2Ref.current.focus()}
            />
            <View className="absolute right-0 bottom-0">
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

          <View className="mb-3">
            <Text className="text-lg text-zinc-950 font-medium dark:text-zinc-50 mb-2">
              Recheck Password
            </Text>
            <TextInput
              ref={password2Ref}
              className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 text-base h-12 relative"
              placeholder="********"
              value={password2}
              onChangeText={setPassword2}
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry={showPassword}
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
            />
            <View className="absolute right-0 bottom-0">
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

          <View className="mb-3">
            <Text className="text-lg text-zinc-950 font-medium dark:text-zinc-50 mb-2">
              Email
            </Text>
            <TextInput
              ref={emailRef}
              className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 text-base h-12"
              placeholder="satoukazuma@konosuba.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => phoneNumberRef.current.focus()}
            />
          </View>

          <View className="mb-3">
            <Text className="text-lg text-zinc-950 font-medium dark:text-zinc-50 mb-2">
              Phone Number
            </Text>
            <TextInput
              ref={phoneNumberRef}
              className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 text-base h-12"
              placeholder="03001234567"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              maxLength={11} // Restrict the input to 11 characters
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => genderRef.current.focus()}
            />
            {!isPhoneNumberValid && phoneNumber.length > 0 && (
              <Text className="text-red-500 text-xs mt-1">
                Phone number must be exactly 11 digits.
              </Text>
            )}
          </View>

          <View className="mb-3">
            <Text className="text-lg text-zinc-950 font-medium dark:text-zinc-50 mb-2">
              Gender
            </Text>
            <Picker
              ref={genderRef}
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={{
                height: 50,
                width: "100%",
                backgroundColor:
                  colorScheme === "dark" ? colors.zinc[700] : colors.zinc[200],
                color:
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950],
              }}
              prompt={"Select one"}
            >
              <Picker.Item label="Not Specified" value="N" />
              <Picker.Item label="Male" value="M" />
              <Picker.Item label="Female" value="F" />
            </Picker>
          </View>

          <View className="mt-7">
            <Button
              onPress={signUpHandler}
              disabled={signUpButtonDisabled}
              title="Sign Up"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
