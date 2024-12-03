import { View } from "react-native";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Index() {
  return (
    <View className="flex-1 p-5">
      <Heading size={"5xl"} className="mb-3">Welcome to Ride FAST</Heading>
      <Text>Well this is just a demo.</Text>
      <Text>Parkinsans: Parkinsans</Text>
      <Text className="text-black">Demo App</Text>
    </View>
  );
}

// fontFamily: "Parkinsans",
