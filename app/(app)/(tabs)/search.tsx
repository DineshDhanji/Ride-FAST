import { colors } from "@/assets/palette/colors";
import { useEffect, useState } from "react";
import { View, Text, useColorScheme, ScrollView, FlatList } from "react-native";
import {
  Searchbar,
  ActivityIndicator,
  Button as RPButton,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/session/ctx";
import SearchItem from "@/components/SearchItem";
import axios from "axios";

export default function Search() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [fetching, setFetching] = useState(false);
  const [allRides, setAllRides] = useState([]);
  const [searchRides, setSearchRides] = useState([]);
  const { session } = useSession();

  const retrieveAll = async () => {
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (BASE_URL === undefined) {
      console.error("Base API URL is not defined");
      return;
    }

    const apiURL = BASE_URL + "/api/get_all_rides";
    setFetching(true);
    console.log("Fetching all rides");
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        console.log(
          "Fetching all rides successful, ",
          response.data.data.length
        );
        setAllRides(response.data.data);
        setSearchRides(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setFetching(false);
      });
  };
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchRides(allRides);
    }
  }, [searchQuery]);

  useEffect(() => {
    retrieveAll();
    setSearchRides(allRides);
  }, []);

  const initiateSearch = () => {
    if (searchQuery.trim() !== "") {
      const searchResults = allRides.filter((ride) => {
        return (
          ride.points_list.source.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ride.points_list.destination.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ride.rider.first_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          ride.rider.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setSearchRides(searchResults);
    }
    return;
  };

  const ListEmptyComponent = () => {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-zinc-900 dark:text-zinc-100 text-lg font-medium">
          No rides available
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-zinc-200 dark:bg-zinc-800">
        <View className="bg-zinc-100 dark:bg-zinc-900 h-max py-4 px-3">
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            onEndEditing={initiateSearch}
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
          <View className="mb-4 flex flex-row justify-between items-center">
            <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl flex-1">
              Available Rides
            </Text>
            <View className="w-32">
              <RPButton
                buttonColor={
                  colorScheme === "dark" ? colors.zinc[800] : colors.zinc[300]
                }
                textColor={
                  colorScheme === "dark" ? colors.zinc[300] : colors.zinc[700]
                }
                icon="refresh"
                mode="outlined"
                onPress={retrieveAll}
              >
                Refresh
              </RPButton>
            </View>
          </View>
          {fetching && (
            <ActivityIndicator
              animating={fetching}
              hidesWhenStopped={true}
              color={
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[900]
              }
            />
          )}
          <FlatList
            data={searchRides}
            renderItem={({ item, index }) => <SearchItem ride={item} />}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={ListEmptyComponent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
