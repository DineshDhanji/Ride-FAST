// About App Page

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
// import GitHub from "@expo/vector-icons/Feather";
// import Mail from "@expo/vector-icons/Feather";

export default function AboutScreen() {
  const navigation = useNavigation();

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-zinc-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Feather name="arrow-left" size={24} color="black" />{" "}
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-zinc-900 ml-4">
          About RIDE-FAST
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        {/* Logo */}
        <View className="flex-row items-center mb-12 ml-8">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-24 h-24 resize-contain rounded-2xl mt-12 mr-8"
          />
          <Text className="text-4xl text-zinc-500 mt-12 ">RIDE-FAST</Text>
        </View>
        <Text className="text-lg text-zinc-700 mb-6">
          RIDE-FAST is a ride-sharing application designed specifically for
          university students and faculty. Our mission is to make campus
          transportation easier, more affordable, and environmentally friendly.
        </Text>

        <Text className="text-xl font-semibold text-zinc-900 mb-4">
          Features
        </Text>
        <View className="mb-6">
          <Text className="text-lg text-zinc-700 mb-2">
            • Easy ride requests and offers
          </Text>
          <Text className="text-lg text-zinc-700 mb-2">
            • Real-time ride tracking
          </Text>
          <Text className="text-lg text-zinc-700 mb-2">
            • University-verified users only
          </Text>
          <Text className="text-lg text-zinc-700">
            • Eco-friendly carpooling options
          </Text>
        </View>

        <Text className="text-xl font-semibold text-zinc-900 mb-4">
          Contact Us
        </Text>
        <TouchableOpacity
          onPress={() => openLink("mailto:support@ride-fast.com")}
          className="flex-row items-center mb-4"
        >
          <Feather name="mail" size={24} color="black" />
          <Text className="text-base text-blue-600 ml-2">
            support@ride-fast.com
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            openLink("https://github.com/DineshDhanji/Ride-FAST.git")
          }
          className="flex-row items-center mb-6"
        >
          <Feather name="github" size={24} color="black" />
          <Text className="text-base text-blue-600 ml-2">GitHub</Text>
        </TouchableOpacity>

        <Text className="text-sm text-zinc-500 text-center mt-6">
          © 2024 RIDE-FAST. All rights reserved.
        </Text>
        <Text className="text-sm text-zinc-500 text-center mt-2">
          Version 1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
