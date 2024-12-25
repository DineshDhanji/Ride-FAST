import { Text, Pressable, useColorScheme } from "react-native";
import { Button as RP_Button } from "react-native-paper";
import { colors } from "@/assets/palette/colors";
export function Button({ onPress, title, numberOfLines = 1 }) {
  const colorScheme = useColorScheme();
  return (
    <RP_Button
      className="my-1"
      mode="contained"
      buttonColor={colorScheme == "dark" ? colors.zinc[200] : colors.zinc[900]}
      style={{ borderRadius: 5 }}
      onPress={onPress}
    >
      <Text
        numberOfLines={numberOfLines}
        className="text-zinc-50 dark:text-zinc-950 text-center"
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
