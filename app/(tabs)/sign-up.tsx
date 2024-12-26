import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />
      <View className="flex-1 px-6 pt-2">
        {/* Sign Up Form */}
        <View className="space-y-6">
          <View>
            <Text className="text-2xl mb-4 font-semibold text-zinc-900">
              Sign Up
            </Text>
          </View>

          {/* Name Input */}
          <View className="space-y-2">
            <Text className="text-base text-zinc-500">Name</Text>
            <TextInput
              className="text-base w-full py-3 mb-6 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg"
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Gender Input */}
          <View className="space-y-2">
            <Text className="text-base text-zinc-500">Gender</Text>
            <TextInput
              className="text-base w-full py-3 mb-6 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg"
              placeholder="Male/Female"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Phone Number Input */}
          <View className="space-y-2">
            <Text className="text-base text-zinc-500">Phone Number</Text>
            <TextInput
              className="text-base w-full py-3 mb-6 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg"
              placeholder="+923**-*******"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Email Input */}
          <View className="space-y-2">
            <Text className="text-base text-zinc-500">Email</Text>
            <TextInput
              className="text-base w-full py-3 mb-6 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg"
              placeholder="sample@nu.edu.pk"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View className="space-y-2">
            <Text className="text-base text-zinc-500">Password</Text>
            <View className="relative">
              <TextInput
                className="text-base w-full py-2 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg pr-12"
                placeholder="••••••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-2"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#71717a"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className="space-y-2 mt-8">
            <Text className="text-base text-zinc-500">Confirm Password</Text>
            <View className="relative">
              <TextInput
                className="text-base w-full py-2 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg pr-12"
                placeholder="••••••••••••"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-2"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#71717a"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-base text-zinc-500">
              Already have an account?{" "}
            </Text>
          {/* Login Link */}
            <TouchableOpacity onPress={() => navigation.navigate("index")}>
              <Text className="text-base font-bold text-zinc-900 underline">
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity onPress={() => {navigation.navigate("profile")}} className="w-full bg-zinc-900 py-4 rounded-full items-center mt-4">
            <Text className="text-white font-semibold text-xl">Sign Up</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}
