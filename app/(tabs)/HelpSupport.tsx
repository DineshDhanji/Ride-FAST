import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
// import { ArrowLeft, MessageCircle, Mail, Phone, FileText, HelpCircle } from '@expo/vector-icons/Feather';
import Feather from "@expo/vector-icons/Feather";

export default function HelpSupportScreen() {
  const navigation = useNavigation();

  const supportOptions = [
      {
      icon: "mail",
      title: "Email Support",
      description: "Send us an email",
      action: () => {
        Linking.openURL("mailto:support@ride-fast.com");
      },
    },
    {
      icon: "phone",
      title: "Phone Support",
      description: "Call our support line",
      action: () => {
        Linking.openURL("tel:+1234567890");
      },
    },
    {
      icon: "file-text",
      title: "FAQs",
      description: "View frequently asked questions",
      action: () => {
        navigation.navigate("FAQ");
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-zinc-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Feather name="arrow-left" size={24} color="black" />{" "}
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-zinc-900 ml-4">
          Help & Support
        </Text>
      </View>

      <ScrollView className="flex-1 p-6">
        <Text className="text-base text-zinc-700 mb-6">
          Need help? Choose from the options below to get support or find
          answers to your questions.
        </Text>

        {supportOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={option.action}
            className="flex-row items-center bg-white p-4 rounded-lg shadow-sm mb-4"
          >
            <View className="w-12 h-12 bg-zinc-100 rounded-full items-center justify-center mr-4">
              <Feather name={option.icon} size={24} color="#4f46e5" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-medium text-zinc-900">
                {option.title}
              </Text>
              <Text className="text-sm text-zinc-500">
                {option.description}
              </Text>
            </View>
            <Feather name="arrow-left"
              size={20}
              color="#71717a"
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          </TouchableOpacity>
        ))}

        <View className="mt-6 bg-zinc-100 p-4 rounded-lg">
          <Text className="text-base font-medium text-zinc-900 mb-2">
            Operating Hours
          </Text>
          <Text className="text-sm text-zinc-700">
            Monday - Friday: 9:00 AM - 6:00 PM
          </Text>
          <Text className="text-sm text-zinc-700">
            Saturday: 10:00 AM - 4:00 PM
          </Text>
          <Text className="text-sm text-zinc-700">Sunday: Closed</Text>
        </View>

        <Text className="text-sm mt-48 text-zinc-500 text-center mt-6">
          RIDE-FAST Support Team
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
