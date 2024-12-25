import { Text, Pressable } from "react-native";
import { Button as RP_Button } from "react-native-paper";
import { colors } from "@/assets/palette/colors";
export function Button({ onPress, title, numberOfLines = 1 }) {
  return (
    <RP_Button
      mode="contained"
      buttonColor={colors.zinc[800]}
      style={{ borderRadius: 5 }}
      onPress={onPress}
    >
      <Text
        numberOfLines={numberOfLines}
        className="text-zinc-50 text-center"
      >
        {title}
      </Text>
    </RP_Button>
    // <Pressable
    //   className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600  border rounded-lg py-2 px-3 my-1"
    // >
    // </Pressable>
  );
}
