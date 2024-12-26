import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import { useColorScheme } from "react-native";
import { Searchbar } from "react-native-paper";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import MapView, { Marker } from "react-native-maps";
import { colors } from "@/assets/palette/colors";
import axios from "axios";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY; // Replace with your Google API Key

export default function CreateRide() {
  const colorScheme = useColorScheme();
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carNumberPlate, setCarNumberPlate] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [price, setPrice] = useState("");
  const [pointsList, setPointsList] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [ac, setAc] = useState(false);
  const [music, setMusic] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [places, setPlaces] = useState([]);
  const initialRegion = {
    latitude: 24.8607, // Karachi's latitude
    longitude: 67.0011, // Karachi's longitude
    latitudeDelta: 0.0922, // Zoom level (adjust as necessary)
    longitudeDelta: 0.0421, // Zoom level (adjust as necessary)
  };

  const [selectedLocation, setSelectedLocation] = useState("source");
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  // Create refs for each input field
  const carModelRef = useRef(null);
  const carColorRef = useRef(null);
  const carNumberPlateRef = useRef(null);
  const availableSeatsRef = useRef(null);
  const priceRef = useRef(null);

  const alertBoxRef = useRef(null);
  const showAlert = (message, title = "Validation Error") => {
    if (alertBoxRef.current === null) {
      return;
    }
    alertBoxRef.current.setMessageTitle(title);
    alertBoxRef.current.setMessage(message);
    alertBoxRef.current.showModal();
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setExpanded(false);
      setPlaces([]);
    }
  }, [searchQuery]);

  // Validation function
  const validateForm = () => {
    if (!carModel.trim()) {
      showAlert("Car model is required.");
      return false;
    }
    if (!carColor.trim()) {
      showAlert("Car color is required.");
      return false;
    }
    if (!carNumberPlate.trim()) {
      showAlert("Car number plate is required.");
      return false;
    }
    if (
      !availableSeats.trim() ||
      isNaN(availableSeats) ||
      parseInt(availableSeats) <= 0
    ) {
      showAlert("Available seats should be a valid number greater than 0.");
      return false;
    }
    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      showAlert("Price per seat should be a valid number greater than 0.");
      return false;
    }
    if (!source || !destination) {
      showAlert("Please select both source and destination.");
      return false;
    }
    return true;
  };

  const submitRideRequestHandler = async () => {
    if (!validateForm()) {
      return;
    }
    console.log({
      carModel,
      carColor,
      carNumberPlate,
      availableSeats,
      price,
      pointsList,
      smoking,
      ac,
      music,
      source,
      destination,
    });
  };

  const searchLocationHandler = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    const googleAPISURL =
      "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchQuery.trim();
    const radius = 2000;
    const temp_location = `${initialRegion?.latitude},${initialRegion?.longitude}&radius=${radius}`;
    const finalURL = `${googleAPISURL}?query=${input}&location=${temp_location}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await fetch(finalURL);
      let data = await response.json();
      setPlaces(data.results);
      setExpanded(true);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handlePlaceSelect = (place) => {
    console.log("Selected place: ", place);
    console.log("A", place.name);
    if (selectedLocation === "source") {
      setSource({ name: place.name, location: place.geometry.location });
    } else {
      setDestination({ name: place.name, location: place.geometry.location });
    }
    setSearchQuery(""); // Clear search query after selection
    setExpanded(false); // Close the suggestions
  };
  console.log(source, destination);

  return (
    <ScrollView className="flex-1 bg-zinc-200 dark:bg-zinc-800 p-4">
      <AlertBox ref={alertBoxRef} />

      {/* Map View */}
      <View className="w-full h-52 border border-zinc-700 dark:border-zinc-400 rounded-lg overflow-hidden">
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={initialRegion}
        >
          {source && (
            <Marker
              coordinate={{
                latitude: source.location.lat,
                longitude: source.location.lng,
              }}
              title="Source"
              description={source.name}
            />
          )}
          {destination && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="Destination"
              description={destination.name}
            />
          )}
        </MapView>
      </View>

      {/* Searchbar */}
      <View className="h-max mb-4">
        <Searchbar
          placeholder="Search your location"
          mode="view"
          onChangeText={setSearchQuery}
          onEndEditing={searchLocationHandler}
          value={searchQuery}
          style={{
            position: "relative",
            marginVertical: 10,
            backgroundColor:
              colorScheme === "dark" ? colors.zinc[800] : colors.zinc[300],
          }}
          inputStyle={{
            color: colorScheme === "dark" ? colors.zinc[300] : colors.zinc[700],
          }}
        />
        {expanded && (
          <View className="w-full h-48 bg-zinc-400 absolute top-20 z-10">
            <ScrollView className="w-full h-full">
              {places.map((place) => (
                <Pressable
                  key={place.place_id}
                  className="h-10 flex justify-center my-1 p-2 bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:active:bg-zinc-700"
                  onPress={() => handlePlaceSelect(place)}
                >
                  <Text className="text-zinc-950 dark:text-zinc-50">
                    {place.name}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {/* Source/Destination Toggle */}
      <View className="flex flex-row justify-evenly mb-4">
        <Pressable
          onPress={() => setSelectedLocation("source")}
          className={`border rounded-xl w-5/12 p-3 ${
            selectedLocation === "source"
              ? "bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-zinc-100 "
              : "bg-zinc-300 border-zinc-700 dark:bg-zinc-700 dark:border-zinc-300"
          }`}
        >
          <Text className="text-base text-center text-zinc-900 dark:text-zinc-50">
            Source
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedLocation("destination")}
          className={`border rounded-xl w-5/12 p-3 ${
            selectedLocation === "destination"
              ? "bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-zinc-100"
              : "bg-zinc-300 border-zinc-700 dark:bg-zinc-700 dark:border-zinc-300"
          }`}
        >
          <Text className="text-base text-center text-zinc-900 dark:text-zinc-50">
            Destination
          </Text>
        </Pressable>
      </View>

      {/* Submit Button */}
      <View className="mb-10">
        <Button title="Create Ride" onPress={submitRideRequestHandler} />
      </View>
    </ScrollView>
  );
}
