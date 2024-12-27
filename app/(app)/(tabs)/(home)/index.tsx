import { View, Text, useColorScheme, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Button } from "@/components/Button";
export default function Home() {
  const colorScheme = useColorScheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const initialRegion = {
    latitude: 24.8607, // Karachi's latitude
    longitude: 67.0011, // Karachi's longitude
    latitudeDelta: 0.0922, // Zoom level (adjust as necessary)
    longitudeDelta: 0.0421, // Zoom level (adjust as necessary)
  };

  // useEffect(() => {
  //   async function getCurrentLocation() {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   }

  //   getCurrentLocation();
  // }, []);
  useEffect(() => {
    console.log(location);
  }, [location]);
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-zinc-200 dark:bg-zinc-800">
        <View className="w-full h-2/3">
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={{
              width: "100%",
              height: "100%",
            }}
            initialRegion={initialRegion}
            // showsUserLocation={true}
            showsCompass={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            onPoiClick={(e) => {
              console.log("POI Clicked ", e.nativeEvent);
            }}
          >
            <Marker
              title="A"
              pinColor="red"
              coordinate={{
                latitude: 24.86549307525781,
                longitude: 67.02338604256511,
                latitudeDelta: 0.016886786149022726,
                longitudeDelta: 0.01476924866437912,
              }}
              // key={1}
              description="A"
            />
          </MapView>
        </View>
        <ScrollView className="flex-1 px-5 mt-3">
          <Text className="text-zinc-950 dark:text-zinc-50 text-2xl font-semibold">
            Welcome 😊
          </Text>
          {/* <Button onPress={getLocation} title={"Get Location"} /> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
