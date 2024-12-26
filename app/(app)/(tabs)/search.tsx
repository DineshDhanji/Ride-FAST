import { View, Text, useColorScheme } from "react-native";

export default function Search() {
  const colorScheme = useColorScheme();
  console.log("Color scheme", colorScheme);
  
  return (
    <View className="flex-1 flex justify-center items-center">
      <Text className="text-2xl">Search</Text>
    </View>
  );
}
