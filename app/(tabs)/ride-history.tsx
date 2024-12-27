import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";

type Ride = {
  id: string;
  type: "offered" | "taken";
  date: string;
  time: string;
  from: string;
  to: string;
  partner: string;
  partnerImage: string;
};

export default function RidesHistoryScreen() {
  const navigation = useNavigation();

  const rides: Ride[] = [
    {
      id: "1",
      type: "taken",
      date: "2023-05-20",
      time: "14:30",
      from: "Main Gate",
      to: "Science Building",
      partner: "John Doe",
      partnerImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      type: "offered",
      date: "2023-05-18",
      time: "09:15",
      from: "Library",
      to: "Sports Complex",
      partner: "Jane Smith",
      partnerImage: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: "3",
      type: "taken",
      date: "2023-05-15",
      time: "11:45",
      from: "Student Center",
      to: "Engineering Building",
      partner: "Mike Johnson",
      partnerImage: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    // Add more rides as needed
  ];

  const renderRide = ({ item }: { item: Ride }) => (
    <TouchableOpacity
      className="flex-row items-center py-4 border-b border-zinc-200"
      onPress={() => {
        // Navigate to ride details screen
        // navigation.navigate('RideDetails', { rideId: item.id });
      }}
    >
      <Image
        source={{ uri: item.partnerImage }}
        className="w-12 h-12 rounded-full mr-4"
      />
      <View className="flex-1">
        <Text className="text-base font-medium text-zinc-900">
          {item.type === "offered" ? "Ride Offered" : "Ride Taken"}
        </Text>
        <Text className="text-sm text-zinc-500">
          {item.date} at {item.time}
        </Text>
        <View className="flex-row items-center mt-1">
          <Feather name="map-pin" size={24} color="black" />{" "}
          <Text className="text-sm text-zinc-700 ml-1">
            {item.from} to {item.to}
          </Text>
        </View>
      </View>
      <Text className="text-sm font-medium text-zinc-500">
        with {item.partner}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-zinc-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-zinc-900 ml-4">
          Rides History
        </Text>
      </View>

      <FlatList
        data={rides}
        renderItem={renderRide}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center">
            <Text className="text-base text-zinc-500">No rides yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
