import { View, Text, Image, useColorScheme } from "react-native";
import { Divider } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/assets/palette/colors";
export default function SearchItem() {
  const colorScheme = useColorScheme();

  return (
    <View className="h-max w-full bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-900 border border-zinc-400 rounded-xl px-5 py-5 mb-4">
      <View className="flex flex-row mb-2">
        <Image
          className="size-16 rounded-full me-3"
          resizeMode="cover"
          source={{
            uri: "https://i.pinimg.com/originals/56/31/22/56312264db7ff9c2cf7b11a6eccb4633.jpg",
          }}
        />
        <View className="flex flex-col justify-center flex-1">
          <Text
            className="text-zinc-950 dark:text-zinc-50 text-lg mb-1"
            numberOfLines={1}
          >
            Shinchan Nohara
          </Text>
          <Text
            className="text-zinc-600 dark:text-zinc-400 text-md mb-1"
            numberOfLines={1}
          >
            77 trips
          </Text>
        </View>
      </View>
      <View className="h-max mt-3 rounded-lg">
        <View className="flex flex-row items-center px-3">
          <MaterialIcons
            className="size-7 flex justify-center items-center"
            name="circle"
            size={20}
            color={colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]}
          />
          <Text
            className="text-zinc-900 dark:text-zinc-100 text-md flex-1"
            numberOfLines={1}
          >
            A
          </Text>
        </View>
        <View className="flex flex-row items-center px-3 mt-1">
          <MaterialIcons
            className="size-7 flex justify-center items-center"
            name="location-pin"
            size={22}
            color={colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]}
          />
          <Text
            className="text-zinc-900 dark:text-zinc-100 text-md flex-1"
            numberOfLines={1}
          >
            B
          </Text>
        </View>
      </View>
      <Divider
        bold={true}
        style={{
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[50] : colors.zinc[400],
          marginTop: 5,
          marginBottom: 5,
        }}
      />
      <View className="h-16 flex flex-row justify-between mt-1 p-2 overflow-hidden">
        <View className="flex flex-row items-center me-5">
          <View className="flex justify-center items-center size-8 me-1">
            <MaterialIcons
              name="event-seat"
              size={25}
              color={
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[950]
              }
            />
          </View>
          <Text className="text-zinc-900 dark:text-zinc-100 text-lg">01</Text>
        </View>
        <View className="flex flex-row items-center">
          <Text
            className="text-zinc-900 dark:text-zinc-100 text-3xl text-right font-semibold w-36"
            numberOfLines={1}
          >
            Rs. 460
          </Text>
        </View>
      </View>
    </View>
  );
}
