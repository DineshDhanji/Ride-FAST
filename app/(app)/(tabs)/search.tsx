import { colors } from "@/assets/palette/colors";
import { useState } from "react";
import { View, Text, useColorScheme, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchItem from "@/components/SearchItem";

export default function Search() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-zinc-200 dark:bg-zinc-800">
        <View className="bg-zinc-100 dark:bg-zinc-900 h-max py-4 px-3">
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            rippleColor={colors.zinc[800]}
            iconColor={
              colorScheme === "dark" ? colors.zinc[300] : colors.zinc[700]
            }
            style={{
              backgroundColor:
                colorScheme === "dark" ? colors.zinc[800] : colors.zinc[300],
            }}
            inputStyle={{
              color:
                colorScheme === "dark" ? colors.zinc[300] : colors.zinc[700],
            }}
            // loading={true}
            traileringIconColor={
              colorScheme === "dark" ? colors.zinc[300] : colors.zinc[700]
            }
          />
        </View>
        <View className="bg-zinc-200 dark:bg-zinc-900 flex-1 p-3">
          <View className="mb-4">
            <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl">
              Available Rides
            </Text>
          </View>
          <ScrollView className="flex-1">
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
