// import React, { useState, useEffect } from "react";
// import { View, Text, TouchableOpacity, FlatList } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import { useNavigation } from "@react-navigation/native";
// import FileText from "@expo/vector-icons/Feather";
// import Share2 from "@expo/vector-icons/Feather";
// import {
//   getIndieNotificationInbox,
//   deleteIndieNotificationInbox,
// } from "native-notify";

// // type Notification = {
// //   id: number;
// //   title: string;
// //   subtitle: string;
// //   timestamp: string;
// // };

// export default function NotificationsScreen() {
//   const navigation = useNavigation();
//   let takeNumber = 10;
//   let skipNumber = 0;

//   const [data, setData] = useState([]);
// //     useEffect(async () => {
// //       const notifications = await getIndieNotificationInbox('Indie Push Sub ID as a string', 25677, 'D83ft1902sTCmXwwESdtvN', take-number, skip-number);
// //       console.log("notifications: ", notifications);
// //       setData(notifications);
// //   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const notifications = await getIndieNotificationInbox(
//           "Indie Push Sub ID as a string",
//           25677,
//           "D83ft1902sTCmXwwESdtvN",
//           takeNumber, // Ensure this variable is defined
//           skipNumber // Ensure this variable is defined
//         );
//         console.log("notifications: ", notifications);
//         setData(notifications);
//       } catch (error) {
//         console.error("Error fetching notifications: ", error);
//       }
//     };

//     fetchNotifications();
//   }, []); // Dependency array remains unchanged

//   // Sample notifications data
// //   const notifications: Notification[] = [
// //     {
// //       id: 1,
// //       title: "Another Test",
// //       subtitle: "Test",
// //       timestamp: "5-17-2022 3:13PM",
// //     },
// //     {
// //       id: 2,
// //       title: "Ride Completed",
// //       subtitle: "Your ride with John has been completed",
// //       timestamp: "5-17-2022 2:30PM",
// //     },
// //     {
// //       id: 3,
// //       title: "New Ride Request",
// //       subtitle: "Sarah wants to book a ride",
// //       timestamp: "5-17-2022 1:45PM",
// //     },
// //     {
// //       id: 4,
// //       title: "Payment Successful",
// //       subtitle: "Payment for last ride processed",
// //       timestamp: "5-17-2022 12:20PM",
// //     },
// //     {
// //       id: 5,
// //       title: "Special Offer",
// //       subtitle: "Get 20% off on your next ride",
// //       timestamp: "5-17-2022 11:00AM",
// //     },
// //   ];

//   const renderNotification = ({ item }: { item: Notification }) => (
//     <TouchableOpacity
//       className="p-4 border-b border-zinc-100"
//       onPress={() => {
//         // Handle notification press
//       }}
//     >
//       <View className="space-y-1">
//         <Text className="text-lg font-medium text-zinc-900">{item.title}</Text>
//         <Text className="text-base text-zinc-600">{item.message}</Text>
//         <Text className="text-sm text-zinc-400">{item.date}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const ListEmptyComponent = () => (
//     <View className="flex-1 items-center justify-center p-8">
//       <Text className="text-zinc-500 text-center">No notifications yet</Text>
//     </View>
//   );

// //   const ListHeaderComponent = () => (
// //     <View className="flex-row items-center justify-between p-4 border-b border-zinc-200">
// //       <TouchableOpacity className="p-2">
// //         <FileText size={24} color="#27272a" />
// //       </TouchableOpacity>
// //       <Text className="text-xl font-semibold text-zinc-900">Startup Notes</Text>
// //       <TouchableOpacity className="p-2">
// //         <Share2 size={24} color="#27272a" />
// //       </TouchableOpacity>
// //     </View>
// //   );

//   return (
//     <SafeAreaView className="flex-1 bg-zinc-50">
//       <StatusBar style="dark" />

//       <FlatList
//         data={data}
//         keyExtractor={item => item.notification_id}
//         renderItem={renderNotification}
//         ListEmptyComponent={ListEmptyComponent}
//         // ListHeaderComponent={ListHeaderComponent}
//         contentContainerStyle={{ flexGrow: 1 }}
//         showsVerticalScrollIndicator={false}
//         initialNumToRender={10}
//         maxToRenderPerBatch={10}
//         windowSize={5}
//         removeClippedSubviews={true}
//       />
//     </SafeAreaView>
//   );
// }
