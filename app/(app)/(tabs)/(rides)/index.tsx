import { View, Text, ScrollView, useColorScheme } from "react-native";
import { Button } from "@/components/Button";
import { Divider } from "react-native-paper";
import { colors } from "@/assets/palette/colors";
import { Link, useNavigation } from "expo-router";

export default function Rides() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  console.log("Color scheme", colorScheme);

  return (
    <ScrollView className="flex-1 bg-zinc-200 dark:bg-zinc-800 p-3">
      <View className="p-4 border border-zinc-600 bg-zinc-100  dark:bg-zinc-900 rounded-xl mb-3">
        <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl mb-3">
          Create a ride
        </Text>
        <View>
          <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-base mb-4">
            Offering a ride is a great way to save on fuel, reduce traffic, and
            help others with their daily commute.
          </Text>
        </View>
        <Button
          onPress={() => {
            navigation.navigate("createRide");
          }}
          title={"Create Ride"}
        ></Button>
      </View>

      <Divider
        bold={true}
        style={{
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[500] : colors.zinc[400],
          marginTop: 7,
        }}
      />

      <View className="p-4">
        <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl mb-3">
          Your Rides
        </Text>
        <Text className="text-zinc-700 dark:text-zinc-300 font-medium text-md mb-3">
          No ride found.
        </Text>
      </View>
    </ScrollView>
  );
}
