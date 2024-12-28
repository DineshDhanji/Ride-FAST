import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Appearance,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
// import ArrowLeft from '@expo/vector-icons/Feather';
// import Bell from '@expo/vector-icons/Feather';
// import Lock from '@expo/vector-icons/Feather';
// import MapPin from '@expo/vector-icons/Feather';
// import CreditCard from '@expo/vector-icons/Feather';
// import HelpCircle from '@expo/vector-icons/Feather';
import Feather from "@expo/vector-icons/Feather";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    notifications: true,
    locationServices: true,
  });
  const [darkMode, setDarkMode] = useState(
    Appearance.getColorScheme() === "dark" ? true : false
  );

  const toggleSetting = (setting) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: !prevSettings[setting],
    }));
  };

  const settingsOptions = [
    { icon: "bell", label: "Push Notifications", value: "notifications" },
    { icon: "map-pin", label: "Location Services", value: "locationServices" },
    {
      icon: "lock",
      label: "Change Password",
      onPress: () => navigation.navigate("ChangePassword"),
    },
    {
      icon: "help-circle",
      label: "Help & Support",
      onPress: () => navigation.navigate("help"),
    },
  ];

  return (
    <ScrollView className="flex-1 px-4  bg-zinc-200 dark:bg-zinc-800">
      {settingsOptions.map((option, index) => (
        <View
          key={index}
          className="flex-row items-center justify-between py-4 border-b border-zinc-200"
        >
          <View className="flex-row items-center">
            <Feather name={option.icon} size={24} color="#71717a" />
            <Text className="text-base text-zinc-900 dark:text-zinc-100 text-lg ml-3">
              {option.label}
            </Text>
          </View>
          {option.value ? (
            <Switch
              value={settings[option.value]}
              onValueChange={() => toggleSetting(option.value)}
            />
          ) : (
            <TouchableOpacity onPress={option.onPress}>
              <Text className="text-blue-500">Go</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Dark Mode Toggle */}
      <View className="flex-row items-center justify-between py-4 border-b border-zinc-200">
        <Text className="text-base text-zinc-900 dark:text-zinc-100 text-lg">
          Dark Mode
        </Text>
        <Switch
          value={darkMode}
          onValueChange={() => {
            setDarkMode(dm => !dm)
            Appearance.setColorScheme(!darkMode ? "dark" : "light");
          }}
        />
      </View>

      {/* Version Info */}
      <Text className="text-sm text-zinc-500 mt-80 text-center">
        RIDE-FAST v1.0.0
      </Text>
    </ScrollView>
  );
}
