import { Text, View } from "react-native";
import { colors } from "@/assets/palette/colors";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-lg" style={{ color: colors.zinc[300] }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  );
}
