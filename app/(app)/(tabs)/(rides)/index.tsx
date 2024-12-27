import { useEffect, useState } from "react";
import { View, Text, ScrollView, useColorScheme } from "react-native";
import { Link, useNavigation } from "expo-router";
import { useSession } from "@/session/ctx";
import { Dialog, Portal, Button as RPButton } from "react-native-paper";
import axios from "axios";
import { Button } from "@/components/Button";
import { Divider } from "react-native-paper";
import { colors } from "@/assets/palette/colors";
import { useRide } from "@/context/ride";
import SearchItem from "@/components/SearchItem";

export default function Rides() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const { session } = useSession();
  const { ride, setRide } = useRide();
  const [buttonDisable, setButtonDisable] = useState(false);

  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const deleteRide = async () => {
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (BASE_URL === undefined) {
      console.error("Base API URL is not defined");
      return;
    }

    const apiURL = BASE_URL + "/api/delete_ride";
    setButtonDisable(true);
    axios
      .post(apiURL, null, { headers: { Authorization: `Bearer ${session}` } })
      .then((response) => {
        if (response.data.deleted) {
          setRide(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setButtonDisable(false);
        hideDialog();
      });
  };

  return (
    <ScrollView className="flex-1 bg-zinc-200 dark:bg-zinc-800 p-3">
      <View className="p-4 border border-zinc-600 bg-zinc-100  dark:bg-zinc-900 rounded-xl mb-3">
        <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl mb-3">
          Create a ride
        </Text>
        <View>
          <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-base mb-4">
            Offering a ride is a great way to save on fuel, reduce traffic, and
            help others with their daily commute.
          </Text>
        </View>
        <Button
          onPress={() => {
            navigation.navigate("createRide");
          }}
          title={"Create Ride"}
        ></Button>
      </View>

      <Divider
        bold={true}
        style={{
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[500] : colors.zinc[400],
          marginTop: 7,
        }}
      />

      <View className="p-4">
        <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl mb-3">
          Your Rides
        </Text>
        {ride !== null ? (
          <View className="h-max">
            <SearchItem ride={ride} link={false} />
            <Button
              disabled={buttonDisable}
              onPress={showDialog}
              title={"Delete Ride"}
            ></Button>
          </View>
        ) : (
          <View>
            <Text className="text-zinc-700 dark:text-zinc-300 font-medium text-md mb-3">
              No ride found.
            </Text>
          </View>
        )}
      </View>

      <Divider
        bold={true}
        style={{
          backgroundColor:
            colorScheme === "dark" ? colors.zinc[500] : colors.zinc[400],
          marginTop: 7,
        }}
      />

      <View className="p-4">
        <Text className="text-zinc-900 dark:text-zinc-100 font-medium text-2xl mb-3 h-max">
          Requests for your ride
        </Text>
        <View>
          <Text className="text-zinc-700 dark:text-zinc-300 font-medium text-md mb-3">
            No requests found.
          </Text>
        </View>
      </View>

      <View className="mb-6"></View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={hideDialog}
          style={{
            backgroundColor:
              colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
          }}
        >
          <Dialog.Title
            style={{
              color:
                colorScheme === "dark" ? colors.zinc[200] : colors.zinc[800],
            }}
          >
            Are you sure?
          </Dialog.Title>
          <Dialog.Content>
            <Text className="text-lg text-zinc-950 dark:text-zinc-50">
              Deleting this ride will remove all request. Do you wanna proceed?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <View className="me-3">
              <RPButton
                buttonColor={
                  colorScheme === "dark" ? colors.zinc[700] : colors.zinc[300]
                }
                textColor={
                  colorScheme === "dark" ? colors.zinc[200] : colors.zinc[800]
                }
                style={{
                  borderRadius: 7,
                }}
                mode="contained"
                onPress={hideDialog}
              >
                No
              </RPButton>
            </View>
            <View>
              <Button onPress={deleteRide} title={"Yes"} />
            </View>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}
