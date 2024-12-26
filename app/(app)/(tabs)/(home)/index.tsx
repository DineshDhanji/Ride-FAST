import { View, Text, useColorScheme, ScrollView } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-zinc-200 dark:bg-zinc-800">
        <View className="w-full h-2/3">
          <MapView
            style={{
              width: "100%",
              height: "100%",
            }}
            initialRegion={{
              latitude: 24.8607, // Karachi's latitude
              longitude: 67.0011, // Karachi's longitude
              latitudeDelta: 0.0922, // Zoom level (adjust as necessary)
              longitudeDelta: 0.0421, // Zoom level (adjust as necessary)
            }}
          />
        </View>
        <ScrollView className="flex-1 px-5 mt-3">
          <Text className="text-zinc-950 dark:text-zinc-50 text-2xl font-semibold">
            Welcome 😊
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
