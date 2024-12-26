import { Text, Pressable, useColorScheme } from "react-native";
import { Button as RP_Button } from "react-native-paper";
import { colors } from "@/assets/palette/colors";
export function Button({
  onPress,
  title,
  disabled = false,
  numberOfLines = 1,
}) {
  const colorScheme = useColorScheme();
  return (
    <RP_Button
      className="my-1"
      textColor={colorScheme == "dark" ? colors.zinc[900] : colors.zinc[200]}
      buttonColor={colorScheme == "dark" ? colors.zinc[200] : colors.zinc[900]}
      style={{ borderRadius: 5 }}
      onPress={onPress}
      disabled={disabled}
    >
      {title}
      {/* <Text
        // numberOfLines={numberOfLines}
        className="text-zinc-50 dark:text-zinc-950 text-center font-semibold"
      >
      </Text> */}
    </RP_Button>
    // <Pressable
    //   className="bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600  border rounded-lg py-2 px-3 my-1"
    // >
    // </Pressable>
  );
}
