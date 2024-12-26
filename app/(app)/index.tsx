import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />
      <View className="flex-1 px-6 pt-12">
        {/* Logo */}
        <View className="flex-row items-center mb-12 ml-8">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-24 h-24 resize-contain rounded-2xl mt-12 mr-8"
          />
          <Text className="text-4xl text-zinc-500 mt-12 ">RIDE-FAST</Text>
        </View>

        {/* Login Form */}
        <View className="space-y-6">
          <View>
            <Text className="text-2xl mt-12 font-semibold text-zinc-900">Login</Text>
            <Text className="text-lg mt-2 mb-6 text-zinc-500">
              Login to enjoy beautiful, safe ride with RIDE-FAST
            </Text>
          </View>

          {/* Email Input */}
          <View className="space-y-2">
            <Text className="text-base text-zinc-500">Email</Text>
            <TextInput
              className="text-base w-full py-3 mb-8 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg"
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
                className="text-base w-full py-3 text-zinc-900 bg-zinc-50 border-b-2 border-zinc-200 rounded-lg pr-12"
                placeholder="••••••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="absolute right-4 top-3"
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

          {/* Forgot Password */}
          <TouchableOpacity>
            <Text className="text-base font-bold text-right text-zinc-900 underline mb-32">Forgot password?</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center mt-6">
            <Text className="text-base text-zinc-500">Don't have an account? </Text>
            <TouchableOpacity>
              <Text className="text-base font-bold text-zinc-900 underline">Register</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity onPress={() => navigation.navigate('sign-up')} className="w-full bg-zinc-900 py-4 rounded-full items-center mt-4">
            <Text className="text-white font-semibold text-xl">Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}
