import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  useColorScheme,
} from "react-native";
import {
  Searchbar,
  ActivityIndicator,
  Divider,
  Checkbox,
} from "react-native-paper";
import { useNavigation } from "expo-router";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { Button } from "@/components/Button";
import { AlertBox } from "@/components/AlertBox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/assets/palette/colors";
import axios from "axios";
import { useSession } from "@/session/ctx";
import { useRide } from "@/context/ride";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAP_API_KEY; // Replace with your Google API Key

export default function CreateRide() {
  const colorScheme = useColorScheme();
  const { session } = useSession();
  const navigation = useNavigation();
  const { ride, setRide } = useRide();

  // Form variables
  const [carModel, setCarModel] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carNumberPlate, setCarNumberPlate] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [price, setPrice] = useState("");
  const [smoking, setSmoking] = useState(false);
  const [ac, setAc] = useState(false);
  const [music, setMusic] = useState(false);
  // Create refs for each input field
  const carModelRef = useRef(null);
  const carColorRef = useRef(null);
  const carNumberPlateRef = useRef(null);
  const availableSeatsRef = useRef(null);
  const priceRef = useRef(null);

  // Search variables
  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [places, setPlaces] = useState([]);
  const [searchingBool, setSearchingBool] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setExpanded(false);
      setPlaces([]);
    }
  }, [searchQuery]);
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
      setSearchingBool(true);
      setExpanded(true);
      const response = await fetch(finalURL);
      let data = await response.json();
      setPlaces(data.results);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setSearchingBool(false);
    }
  };

  const handlePlaceSelect = (place) => {
    if (selectedLocation === "source") {
      setSource({
        name: place.name,
        address: place.formatted_address,
        location: place.geometry.location,
      });
    } else {
      setDestination({
        name: place.name,
        address: place.formatted_address,
        location: place.geometry.location,
      });
    }
    setSearchQuery(""); // Clear search query after selection
    setExpanded(false); // Close the suggestions
  };

  // Location variables
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      await Location.getCurrentPositionAsync({}).then((res) => {
        setLocation({
          latitude: res["coords"].latitude,
          longitude: res["coords"].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setErrorMsg(null);
      });
    } else {
      setErrorMsg(
        "Location permission was denied. Please enable it in settings."
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const initialRegion = {
    latitude: 24.8607, // Karachi's latitude
    longitude: 67.0011, // Karachi's longitude
    latitudeDelta: 0.0922, // Zoom level (adjust as necessary)
    longitudeDelta: 0.0421, // Zoom level (adjust as necessary)
  };

  const [selectedLocation, setSelectedLocation] = useState("source");
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  // States variables
  const alertBoxRef = useRef(null);
  const showAlert = (message, title = "Validation Error") => {
    if (alertBoxRef.current === null) {
      return;
    }
    alertBoxRef.current.setMessageTitle(title);
    alertBoxRef.current.setMessage(message);
    alertBoxRef.current.showModal();
  };
  const [isParentScrollEnabled, setIsParentScrollEnabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // Validation function
  const validateForm = () => {
    if (!carModel.trim()) {
      showAlert(
        (message = "Car model is required."),
        (title = "Validation Error")
      );
      return false;
    }
    if (!carColor.trim()) {
      showAlert(
        (message = "Car color is required."),
        (title = "Validation Error")
      );
      return false;
    }
    if (!carNumberPlate.trim()) {
      showAlert(
        (message = "Car number plate is required."),
        (title = "Validation Error")
      );
      return false;
    }
    if (
      !availableSeats.trim() ||
      isNaN(availableSeats) ||
      parseInt(availableSeats) <= 0
    ) {
      showAlert(
        (message = "Available seats should be a valid number greater than 0."),
        (title = "Validation Error")
      );
      return false;
    }
    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      showAlert(
        (message = "Price per seat should be a valid number greater than 0."),
        (title = "Validation Error")
      );
      return false;
    }
    if (!source || !destination) {
      showAlert(
        (message = "Please select both source and destination."),
        (title = "Validation Error")
      );
      return false;
    }
    return true;
  };

  const submitRideRequestHandler = async () => {
    if (!validateForm()) {
      return;
    }

    const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
    if (!BASE_URL) {
      console.error("Base API URL is not defined");
      return;
    }

    const apiURL = `${BASE_URL}/api/create_ride`;
    setSubmitDisabled(true);
    axios
      .post(
        apiURL,
        {
          carModel: carModel,
          carColor: carColor,
          carNumberPlate: carNumberPlate,
          availableSeats: availableSeats,
          price: price,
          smoking: smoking,
          ac: ac,
          music: music,
          source: source,
          destination: destination,
        },
        {
          timeout: 10000, // Set timeout to 10 seconds
          headers: {
            Authorization: `Bearer ${session}`, // Correct header key
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Response: ", response.data);
        if (response.data.success) {
          showAlert(
            (message = "Ride created successfully."),
            (title = "Success")
          );
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          showAlert(
            (message = "Request timed out. Please try again."),
            (title = "Server Error")
          );
        } else {
          // Other errors
          showAlert((message = error.message), (title = "Server Error"));
        }
      })
      .finally(() => {
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
          })
          .finally(() => {
            setSubmitDisabled(false);
            navigation.goBack();
          });
      });
  };
  if (ride !== null) {
    return (
      <View className="flex-1 bg-zinc-200 dark:bg-zinc-800 p-4">
        <Text className="text-zinc-950 dark:text-zinc-50 text-2xl mb-2">
          Ride Found!
        </Text>
        <Text className="text-zinc-950 dark:text-zinc-50 text-lg">
          You already have a ride created. Kindly delete the existing ride to
          create a new one.
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("(home)"); // Navigate to 'Home' screen
          }}
          style={{ marginTop: 8 }}
        >
          <Text className="text-zinc-950 dark:text-zinc-50 text-lg underline">
            Go to Home
          </Text>
        </Pressable>
      </View>
    );
  } else {
    if (errorMsg) {
      return (
        <View className="flex-1 bg-zinc-200 dark:bg-zinc-800 p-4">
          <Text className="text-zinc-800 dark:text-zinc-200 text-2xl">
            Location Error
          </Text>
          <Text className="text-zinc-950 dark:text-zinc-50 text-lg">
            {errorMsg}
          </Text>
          <Button
            onPress={getCurrentLocation}
            title={"Grant Permission"}
          ></Button>
        </View>
      );
    } else {
      return (
        <ScrollView
          scrollEnabled={isParentScrollEnabled}
          className="flex-1 bg-zinc-200 dark:bg-zinc-800 p-4"
        >
          <AlertBox ref={alertBoxRef} />

          {/* Map View */}
          <View className="w-full aspect-square border border-zinc-700 dark:border-zinc-400 rounded-lg overflow-hidden">
            {errorMsg === null && (
              <MapView
                // provider={PROVIDER_GOOGLE}
                style={{
                  width: "100%",
                  height: "100%",
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsCompass={true}
                zoomEnabled={true}
                showsMyLocationButton={true}
                userInterfaceStyle={colorScheme}
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
                {source !== null && (
                  <Marker
                    coordinate={{
                      latitude: source.location.lat,
                      longitude: source.location.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    title="Source"
                    pinColor="black"
                    description={source.name}
                  />
                )}

                {destination !== null && (
                  <Marker
                    coordinate={{
                      latitude: destination.location.lat,
                      longitude: destination.location.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    pinColor="red"
                    title="Destination"
                    description={destination.name}
                  />
                )}
                {source !== null && destination !== null && (
                  <MapViewDirections
                    origin={{
                      latitude: source.location["lat"],
                      longitude: source.location["lng"],
                    }}
                    destination={{
                      latitude: destination.location["lat"],
                      longitude: destination.location["lng"],
                    }}
                    // origin={{ latitude: 24.8555485, longitude: 67.0103228 }}
                    // destination={{ latitude: 24.8568991, longitude: 67.2646838 }}
                    apikey={GOOGLE_API_KEY}
                    strokeColor={colors.zinc[900]}
                    strokeWidth={4}
                  />
                )}
              </MapView>
            )}
          </View>

          {/* Searchbar */}
          <View className="h-max mb-4">
            <Searchbar
              placeholder="Search your location"
              mode="view"
              onChangeText={setSearchQuery}
              // onFocus={() => setExpanded(true)}
              onEndEditing={searchLocationHandler}
              value={searchQuery}
              style={{
                position: "relative",
                marginVertical: 10,
                backgroundColor:
                  colorScheme === "dark" ? colors.zinc[900] : colors.zinc[300],
              }}
              inputStyle={{
                color:
                  colorScheme === "dark" ? colors.zinc[300] : colors.zinc[700],
              }}
            />
            {expanded && (
              <View className="w-full min-h-0 max-h-60 bg-zinc-300 dark:bg-zinc-900 border-t border-zinc-700 dark:border-zinc-400 absolute top-20 py-2 z-10">
                {searchingBool && (
                  <ActivityIndicator
                    animating={searchingBool}
                    hidesWhenStopped={true}
                    color={
                      colorScheme === "dark"
                        ? colors.zinc[50]
                        : colors.zinc[900]
                    }
                  />
                )}
                <ScrollView
                  nestedScrollEnabled={true} // Ensure nested scrolling works
                  onTouchStart={() => setIsParentScrollEnabled(false)} // Disable parent scrolling
                  onTouchEnd={() => setIsParentScrollEnabled(true)} // Enable parent scrolling
                  onMomentumScrollEnd={() => setIsParentScrollEnabled(true)} // Re-enable parent scrolling after
                  className="w-full h-full"
                >
                  {places.map((place) => (
                    <Pressable
                      key={place.place_id}
                      className="min-h-12 max-h-max flex flex-row items-center my-1 p-2 bg-zinc-200 active:bg-zinc-300 dark:bg-zinc-800 dark:active:bg-zinc-700"
                      onPress={() => handlePlaceSelect(place)}
                    >
                      <View className="m-3">
                        <Image
                          className="size-8"
                          source={{ uri: place.icon }}
                          resizeMode="contain"
                        ></Image>
                      </View>
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
              <View className="flex flex-row items-center justify-start">
                <MaterialIcons
                  className="size-7 me-2 my-1"
                  name="location-pin"
                  size={25}
                  color={
                    colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]
                  }
                />
                <Text className="text-base text-zinc-900 dark:text-zinc-50">
                  Source
                </Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => setSelectedLocation("destination")}
              className={`border rounded-xl w-5/12 p-3 ${
                selectedLocation === "destination"
                  ? "bg-zinc-100 border-zinc-900 dark:bg-zinc-900 dark:border-zinc-100"
                  : "bg-zinc-300 border-zinc-700 dark:bg-zinc-700 dark:border-zinc-300"
              }`}
            >
              <View className="flex flex-row items-center justify-start">
                <MaterialIcons
                  className="size-7 me-2 my-1"
                  name="location-pin"
                  size={25}
                  color={colorScheme === "dark" ? "#7f1d1d" : "#dc2626"}
                />
                <Text className="text-base text-zinc-900 dark:text-zinc-50">
                  Destination
                </Text>
              </View>
            </Pressable>
          </View>
          <View className="h-max">
            <View className="flex flex-row items-center p-2">
              <MaterialIcons
                className="size-7 me-2 my-1"
                name="location-pin"
                size={25}
                color={
                  colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]
                }
              />
              <Text className="text-zinc-950 dark:text-zinc-50 text-base font-normal h-max flex-1">
                {source !== null ? source.name : "-"}
              </Text>
            </View>
            <View className="flex flex-row items-center p-2">
              <MaterialIcons
                className="size-7 me-2 my-1"
                name="location-pin"
                size={25}
                color={colorScheme === "dark" ? "#7f1d1d" : "#dc2626"}
              />
              <Text className="text-zinc-950 dark:text-zinc-50 text-base font-normal h-max flex-1">
                {destination !== null ? destination.name : "-"}
              </Text>
            </View>
          </View>

          <Divider
            bold={true}
            style={{
              backgroundColor:
                colorScheme === "dark" ? colors.zinc[50] : colors.zinc[400],
              marginTop: 5,
              marginBottom: 15,
            }}
          />

          {/* Car Model */}
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
            Car Model
          </Text>
          <TextInput
            ref={carModelRef} // Reference for Car Model
            className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
            placeholder="Enter car model"
            value={carModel}
            onChangeText={setCarModel}
            onSubmitEditing={() => carColorRef.current.focus()} // Focus next field
            returnKeyType="next"
          />

          {/* Car Color */}
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
            Car Color
          </Text>
          <TextInput
            ref={carColorRef} // Reference for Car Color
            className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
            placeholder="Enter car color"
            value={carColor}
            onChangeText={setCarColor}
            onSubmitEditing={() => carNumberPlateRef.current.focus()} // Focus next field
            returnKeyType="next"
          />

          {/* Car Number Plate */}
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
            Car Number Plate
          </Text>
          <TextInput
            ref={carNumberPlateRef} // Reference for Car Number Plate
            className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
            placeholder="Enter car number plate"
            value={carNumberPlate}
            onChangeText={setCarNumberPlate}
            onSubmitEditing={() => availableSeatsRef.current.focus()} // Focus next field
            returnKeyType="next"
          />

          {/* Available Seats */}
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
            Available Seats
          </Text>
          <TextInput
            ref={availableSeatsRef} // Reference for Available Seats
            className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
            placeholder="Enter number of available seats"
            value={availableSeats}
            onChangeText={setAvailableSeats}
            onSubmitEditing={() => priceRef.current.focus()} // Focus next field
            keyboardType="numeric"
            returnKeyType="next"
          />

          {/* Price */}
          <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
            Price per seat
          </Text>
          <TextInput
            ref={priceRef} // Reference for Price
            className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
            placeholder="Enter price per seat"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          {/* Smoking */}
          <View className="flex-row items-center mb-2">
            <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mr-2">
              Smoking Allowed
            </Text>
            <Checkbox
              status={smoking ? "checked" : "unchecked"}
              onPress={() => {
                setSmoking(!smoking);
              }}
              color={
                colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]
              }
            />
          </View>
          {/* AC Available */}
          <View className="flex-row items-center mb-2">
            <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mr-2">
              AC Available
            </Text>
            <Checkbox
              status={ac ? "checked" : "unchecked"}
              onPress={() => {
                setAc(!ac);
              }}
              color={
                colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]
              }
            />
          </View>
          {/* Music Available */}
          <View className="flex-row items-center mb-2">
            <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mr-2">
              Music Available
            </Text>
            <Checkbox
              status={music ? "checked" : "unchecked"}
              onPress={() => {
                setMusic(!music);
              }}
              color={
                colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]
              }
            />
          </View>

          {/* Submit Button */}
          <View className="mb-10">
            <Button
              title="Create Ride"
              disabled={submitDisabled}
              onPress={submitRideRequestHandler}
            />
          </View>
        </ScrollView>
      );
    }
  }
}
