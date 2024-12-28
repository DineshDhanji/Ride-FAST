import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Feather from "@expo/vector-icons/Feather"; // Import Feather once
// import { StackContext } from "@/app/(tabs)/_layout";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { colors } from "@/assets/palette/colors";
import { useSession } from "@/session/ctx";
import { Button } from "@/components/Button";
import { Link } from "expo-router";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { session, signOut } = useSession();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
  if (BASE_URL === undefined) {
    console.error("Base API URL is not defined");
    return;
  }

  const apiURL = BASE_URL + "/api/get_info";

  useEffect(() => {
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${session}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
        setShow(true);
      });
  }, []);
  // Menu items with icon names
  const menuItems = [
    { icon: "settings", label: "Settings", link: "settings" },
    { icon: "clock", label: "Rides History", link: "history" },
    { icon: "help-circle", label: "FAQ", link: "faq" },
    { icon: "info", label: "About App", link: "about" },
  ];

  // const photoURI = useContext(StackContext);
  // const [photo, setPhoto] = useState(photoURI?.default);

  useEffect(() => {
    getPhotoFromContext();
    // console.log(photoURI);
  });

  const getPhotoFromContext = async () => {
    // if (photoURI?.saved !== null) {
    //   setPhoto(photoURI?.saved);
    // }
  };
  const removePhoto = async () => {
    // photoURI.saved = null;
    // setPhoto(photoURI.default);
  };
  const goToCamera = () => {
    navigation.navigate("camera");
  };
  return (
    <SafeAreaView className="flex-1 bg-zinc-200 dark:bg-zinc-800">
      {show ? (
        <>
          <View className="flex-1">
            <View className="p-6 border-b border-zinc-200">
              <View className="flex-row items-center">
                <TouchableOpacity onPress={goToCamera}>
                  <Image
                    source={{ uri: `${BASE_URL}${data["profile_picture"]}` }}
                    className="w-16 h-16 resize-contain rounded-full"
                  />
                </TouchableOpacity>
                <View className="ml-4">
                  <Text className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {data.first_name} {data.last_name}
                  </Text>
                  <Text className="text-zinc-500">{data.email}</Text>
                </View>
              </View>
            </View>

            <View className="p-4">
              {menuItems.map((item, index) => (
                <Link asChild href={`/${item.link}`}>
                  <TouchableOpacity
                    key={index}
                    className={`flex-row items-center py-4 px-2`}
                  >
                    <View className="w-8 h-8 items-center justify-center">
                      <Feather
                        name={item.icon}
                        size={24}
                        color={item.isLogout ? "#ef4444" : "#71717a"}
                      />
                    </View>

                    <Text
                      className={`text-base ml-3 ${
                        item.isLogout
                          ? "text-red-500"
                          : "text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
            <View className="px-3">
              <Button onPress={signOut} title={"Logout"} />
            </View>
          </View>
        </>
      ) : (
        <>
          <ActivityIndicator
            animating={!show}
            hidesWhenStopped={true}
            color={colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]}
          />
        </>
      )}
    </SafeAreaView>
  );
}
