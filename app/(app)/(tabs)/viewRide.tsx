import {
  View,
  Text,
  Image,
  ImageBackground,
  useColorScheme,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import axios from "axios";
import { useSession } from "@/session/ctx";
import { colors } from "@/assets/palette/colors";
import { Button } from "@/components/Button";

export default function ViewRide() {
  const colorScheme = useColorScheme();
  const { ride } = useLocalSearchParams();
  const rideObject = JSON.parse(ride);
  console.log(rideObject);
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
  if (BASE_URL === undefined) {
    console.error("Base API URL is not defined");
    return;
  }
  const imageURL = `${BASE_URL}/${rideObject.rider.profile_picture}`;


  const { session, signOut } = useSession();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

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
        // console.log(data.id);
        setShow(true);
      });
  }, []);

  const sendnotification = () => {
        axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: rideObject.rider.id.toString(),
            appId: 25677,
            appToken: 'D83ft1902sTCmXwwESdtvN',
            title: `${data.first_name} has booked the ride.`,
            message: `${data.first_name} has booked a seat in your ride.`
       });
       console.log("Notification sent to user", rideObject.rider.id.toString());
      }

  return (
    <ScrollView className="flex-1 bg-zinc-200 dark:bg-zinc-800">
      <View className="h-36 relative">
        <ImageBackground
          source={require("@/assets/images/background.jpg")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          <View className="border-2 border-zinc-50 bg-zinc-200 dark:bg-zinc-800 z-30 size-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 rounded-full ">
            <Image
              resizeMode="cover"
              source={{ uri: imageURL }}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
        </ImageBackground>
      </View>
      <View className=" h-max pt-16 relative">
        <Text className="text-zinc-900 dark:text-zinc-100 text-2xl px-5 py-5 text-center mt-4">
          {rideObject.rider.first_name} {rideObject.rider.last_name}
        </Text>
        <Text className="text-xl text-zinc-700 dark:text-zinc-400 text-center absolute bottom-[-10] left-1/2 transform -translate-x-1/2">
          {rideObject.rider.completed_trips} Trips
        </Text>
      </View>
      <View className="h-max px-3 pt-3 pb-4 mt-3">
        <Text className="text-zinc-950 dark:text-zinc-50 text-2xl">Route</Text>
        <View className="flex flex-row items-center mb-3">
          <Text className="text-zinc-950 dark:text-zinc-50 font-semibold text-lg me-4 w-3/12">
            Source
          </Text>
          <View className="flex-1 h-max">
            <Text className="text-zinc-950 dark:text-zinc-50 text-base">
              {rideObject.points_list.source.name}
            </Text>
            <Text className="text-zinc-950 dark:text-zinc-50 text-sm">
              {rideObject.points_list.source.address}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center">
          <Text className="text-zinc-950 dark:text-zinc-50 font-semibold text-lg me-4 w-3/12">
            Destination
          </Text>
          <View className="flex-1 h-max">
            <Text className="text-zinc-950 dark:text-zinc-50 text-base">
              {rideObject.points_list.destination.name}
            </Text>
            <Text className="text-zinc-950 dark:text-zinc-50 text-sm">
              {rideObject.points_list.destination.address}
            </Text>
          </View>
        </View>
      </View>
      <View className="h-max px-3 pt-3 pb-4">
        <Text className="text-zinc-950 dark:text-zinc-50 text-2xl">
          Preference
        </Text>
        <View>
          <View className="flex flex-row items-center h-12">
            <MaterialIcons
              name="air"
              className="size-7 me-2"
              size={25}
              color={
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
              }
            />
            <Text className="text-zinc-950 dark:text-zinc-50 text-lg me-10">
              AC
            </Text>
            {rideObject.ac_available ? (
              <MaterialIcons
                name="check"
                className="size-6"
                size={21}
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
                }
              />
            ) : (
              <Octicons
                name="x"
                className="size-6"
                size={21}
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
                }
              />
            )}
          </View>
          <View className="flex flex-row items-center h-12">
            <MaterialIcons
              name="music-note"
              className="size-7 me-2"
              size={25}
              color={
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
              }
            />
            <Text className="text-zinc-950 dark:text-zinc-50 text-lg me-10">
              Music
            </Text>
            {rideObject.music_allowed ? (
              <MaterialIcons
                name="check"
                className="size-6"
                size={21}
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
                }
              />
            ) : (
              <Octicons
                name="x"
                className="size-6"
                size={21}
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
                }
              />
            )}
          </View>
          <View className="flex flex-row items-center h-12">
            <MaterialIcons
              name="smoking-rooms"
              className="size-7 me-2"
              size={25}
              color={
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
              }
            />
            <Text className="text-zinc-950 dark:text-zinc-50 text-lg me-10">
              Smoking
            </Text>
            {rideObject.smoking_allowed ? (
              <MaterialIcons
                name="check"
                className="size-6"
                size={21}
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
                }
              />
            ) : (
              <Octicons
                name="x"
                className="size-6"
                size={21}
                color={
                  colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
                }
              />
            )}
          </View>
        </View>
      </View>
      <View className="px-3 mb-3">
        <Button onPress={sendnotification} title={"Request Ride"} />
      </View>
    </ScrollView>
  );
}
