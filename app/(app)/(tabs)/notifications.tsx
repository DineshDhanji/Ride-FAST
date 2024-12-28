import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSession } from "@/session/ctx";
import FileText from "@expo/vector-icons/Feather";
import Share2 from "@expo/vector-icons/Feather";
import {
  getIndieNotificationInbox,
  deleteIndieNotificationInbox,
} from "native-notify";


export default function IndieNotificationsInbox() {
  const navigation = useNavigation();
  let takeNumber = 10;
  let skipNumber = 0;
  const { session, signOut } = useSession();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data is fetched

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
        console.log(response.data)
        setData(response.data.data);
        setShow(true);
        setIsDataFetched(true);
      });
  }, []);

  // const [data, setData] = useState([]);
  useEffect(() => {
    if (isDataFetched) {
      console.log("ID: ", data.id.toString());
    const fetchNotifications = async () => {
      try {
        const notifications = await getIndieNotificationInbox(
          data.id.toString(),
          25677,
          "D83ft1902sTCmXwwESdtvN",
          takeNumber, // Ensure this variable is defined
          skipNumber // Ensure this variable is defined
        );
        console.log("notifications: ", notifications);
        setData(notifications);
      } catch (error) {
        console.error("Error fetching notifications: ", error);
      }
    };
      fetchNotifications();
    }
  }, [isDataFetched]); // Dependency array remains unchanged


const renderNotification = ({ item }) => (
    <TouchableOpacity
      className="p-4 border-b border-zinc-100"
      onPress={() => {
        // Handle notification press
        console.log("Notification clicked:", item.notification_id);
      }}
    >
      <View className="space-y-1">
        <Text className="text-lg font-medium text-zinc-900">{item.title}</Text>
        <Text className="text-base text-zinc-600">{item.message}</Text>
        <Text className="text-sm text-zinc-400">{item.date}</Text>
      </View>
    </TouchableOpacity>
  );
  


  const ListEmptyComponent = () => (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-zinc-500 text-center">No notifications yet</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />

      <FlatList
        data={data}
        keyExtractor={(item) => item.notification_id}
        renderItem={renderNotification}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}