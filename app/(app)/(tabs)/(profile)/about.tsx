import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/assets/palette/colors";

export default function AboutScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <ScrollView className="flex-1 px-6   bg-zinc-200 dark:bg-zinc-800">
      {/* Logo */}
      <View className="flex-row items-center mb-12 ml-8">
        <Image
          source={require("@/assets/images/icon.png")}
          className="w-24 h-24 resize-contain rounded-2xl mt-12 mr-8"
        />
        <Text className="text-4xl text-zinc-800  dark:text-zinc-300 mt-12">Ride-FAST</Text>
      </View>
      <Text className="text-lg text-zinc-950 dark:text-zinc-50 mb-6">
        RIDE-FAST is a ride-sharing application designed specifically for
        university students and faculty. Our mission is to make campus
        transportation easier, more affordable, and environmentally friendly.
      </Text>

      <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Features
      </Text>
      <View className="mb-6">
        <Text className="text-lg text-zinc-700 dark:text-zinc-300   mb-2">
          • Easy ride requests and offers
        </Text>
        <Text className="text-lg text-zinc-700 dark:text-zinc-300   mb-2">
          • Real-time ride tracking
        </Text>
        <Text className="text-lg text-zinc-700 dark:text-zinc-300   mb-2">
          • University-verified users only
        </Text>
        <Text className="text-lg text-zinc-700 dark:text-zinc-300  ">
          • Eco-friendly carpooling options
        </Text>
      </View>

      <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
        Contact Us
      </Text>
      <TouchableOpacity
        onPress={() => openLink("mailto:support@ride-fast.com")}
        className="flex-row items-center mb-4"
      >
        <Feather
          name="mail"
          size={24}
          color={colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]}
        />
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
        <Feather
          name="github"
          size={24}
          color={colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]}
        />
        <Text className="text-base text-blue-600 ml-2">GitHub</Text>
      </TouchableOpacity>

      <Text className="text-sm text-zinc-500 text-center mt-6">
        © 2024 RIDE-FAST. All rights reserved.
      </Text>
      <Text className="text-sm text-zinc-500 text-center mt-2">
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}
