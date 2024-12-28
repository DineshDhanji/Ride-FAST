import { View, Text, useColorScheme, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Button } from "@/components/Button";
import { useRide } from "@/context/ride";
import axios from "axios";
import { registerIndieID, unregisterIndieDevice } from "native-notify";
import { useSession } from "@/session/ctx";
import { colors } from "@/assets/palette/colors";
import registerNNPushToken from "native-notify";

export default function Home() {
  registerNNPushToken(25677, "D83ft1902sTCmXwwESdtvN");
  const colorScheme = useColorScheme();
  const { ride, setRide } = useRide();
  const { session } = useSession();

  // const { session, signOut } = useSession();
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data is fetched
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (BASE_URL === undefined) {
      console.error("Base API URL is not defined");
      return;
    }
    
    const infoapiURL = BASE_URL + "/api/get_info";
    
    useEffect(() => {
      axios
      .get(infoapiURL, {
        headers: {
          Authorization: `Bearer ${session}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data)
        setData(response.data.data);
        setShow(true);
        setIsDataFetched(true);
      });
    }, []);

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY;
  const initialRegion = {
    latitude: 24.8607, // Karachi's latitude
    longitude: 67.0011, // Karachi's longitude
    latitudeDelta: 0.0922, // Zoom level (adjust as necessary)
    longitudeDelta: 0.0921, // Zoom level (adjust as necessary)
  };

  const registeruser = () => {
    registerIndieID(data.id.toString(), 25677, "D83ft1902sTCmXwwESdtvN");
  };

  const getRide = () => {
    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (!BASE_URL) {
      console.error("Base API URL is not defined");
      return;
    }
    const apiURL = `${BASE_URL}/api/get_ride`;
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      })
      .then((response) => {
        setRide(response.data.data);
        console.log("Ride ", ride);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRide();
  }, []);
  
  useEffect(() => {
    // Run function after data is fetched
    if (isDataFetched) {
      console.log("Data is now available:", data);
      registeruser();
    }
  }, [isDataFetched]); // Dependency is isDataFetched

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-zinc-200 dark:bg-zinc-800">
        <View className="w-full h-2/3">
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              width: "100%",
              height: "100%",
            }}
            initialRegion={initialRegion}
            region={undefined}
            showsCompass={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            onPoiClick={(e) => {
              console.log("POI Clicked ", e.nativeEvent);
            }}
          >
            {ride !== null && (
              <>
                <MapViewDirections
                  origin={{
                    latitude: ride.points_list.source.location["lat"],
                    longitude: ride.points_list.source.location["lng"],
                    latitudeDelta: 0.016886786149022726,
                    longitudeDelta: 0.01476924866437912,
                  }}
                  destination={{
                    latitude: ride.points_list.destination.location["lat"],
                    longitude: ride.points_list.destination.location["lng"],
                    latitudeDelta: 0.016886786149022726,
                    longitudeDelta: 0.01476924866437912,
                  }}
                  apikey={GOOGLE_API_KEY}
                  strokeColor={colors.zinc[900]}
                  strokeWidth={4}
                />
                <Marker
                  title={ride.points_list.source.name}
                  pinColor="#FFFFFF"
                  coordinate={{
                    latitude: ride.points_list.source.location["lat"],
                    longitude: ride.points_list.source.location["lng"],
                    latitudeDelta: 0.016886786149022726,
                    longitudeDelta: 0.01476924866437912,
                  }}
                  key={1}
                  description={ride.points_list.source.address}
                />
                <Marker
                  title={ride.points_list.destination.name}
                  pinColor="#000000"
                  coordinate={{
                    latitude: ride.points_list.destination.location["lat"],
                    longitude: ride.points_list.destination.location["lng"],
                    latitudeDelta: 0.016886786149022726,
                    longitudeDelta: 0.01476924866437912,
                  }}
                  key={2}
                  description={ride.points_list.source.address}
                />
              </>
            )}
          </MapView>
        </View>
        <ScrollView className="flex-1 px-5 mt-5">
          <Text className="text-zinc-950 dark:text-zinc-50 text-3xl font-semibold">
            Your Ride 😊
          </Text>
          <Text className="text-lg text-zinc-950 dark:text-zinc-50">
            You don't have any upcomming ride schedule.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
