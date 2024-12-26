import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather"; // Import Feather once

export default function ProfileScreen() {
  const navigation = useNavigation();

  // Menu items with icon names
  const menuItems = [
    { icon: "user", label: "My Profile" },
    { icon: "settings", label: "Settings" },
    { icon: "bell", label: "Notifications" },
    { icon: "clock", label: "Transaction History" },
    { icon: "help-circle", label: "FAQ" },
    { icon: "info", label: "About App" },
    { icon: "log-out", label: "Logout", isLogout: true },
  ];

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />

      <View className="flex-1">
        {/* Profile Info */}
        <View className="p-6 border-b border-zinc-200">
          <View className="flex-row items-center">
            <Image
              source={require("../../assets/images/profile_pic.png")}
              className="w-16 h-16 resize-contain rounded-full"
            />
            <View className="ml-4">
              <Text className="text-lg font-semibold text-zinc-900">
                Ameer Hamza
              </Text>
              <Text className="text-zinc-500">ameerhamza@gmail.com</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="p-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`flex-row items-center py-4 px-2 ${
                index !== menuItems.length - 1 ? "border-b-4 border-zinc-100" : "mt-24"
              }`}
            >
              <View className="w-8 h-8 items-center justify-center">
                {/* Render icons dynamically */}
                <Feather
                  name={item.icon}
                  size={24}
                  color={item.isLogout ? "#ef4444" : "#71717a"}
                />
              </View>
              <Text
                className={`text-base ml-3 ${
                  item.isLogout ? "text-red-500" : "text-zinc-900"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
