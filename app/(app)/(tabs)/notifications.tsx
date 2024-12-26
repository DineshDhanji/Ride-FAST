import { View, Text, useColorScheme } from "react-native";

export default function Notifications() {
  const colorScheme = useColorScheme();
  console.log("Color scheme", colorScheme);

  return (
    <View className="flex-1 flex justify-center items-center bg-zinc-200 dark:bg-zinc-800">
      <Text className="text-2xl">Notifications</Text>
    </View>
  );
}
