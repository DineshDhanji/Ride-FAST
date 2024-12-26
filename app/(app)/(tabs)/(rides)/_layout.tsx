import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { colors } from "@/assets/palette/colors";

export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={
          colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100]
        }
      />
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor:
            colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900],
          headerStyle: {
            backgroundColor:
              colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Offer Ride" }} />

        <Stack.Screen
          name="createRide"
          options={{ title: "Ride Creation Form" }}
        />
      </Stack>
    </>
  );
}


// {/* Car Model */}
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
// Car Model
// </Text>
// <TextInput
// ref={carModelRef} // Reference for Car Model
// className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
// placeholder="Enter car model"
// value={carModel}
// onChangeText={setCarModel}
// onSubmitEditing={() => carColorRef.current.focus()} // Focus next field
// returnKeyType="next"
// />

// {/* Car Color */}
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
// Car Color
// </Text>
// <TextInput
// ref={carColorRef} // Reference for Car Color
// className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
// placeholder="Enter car color"
// value={carColor}
// onChangeText={setCarColor}
// onSubmitEditing={() => carNumberPlateRef.current.focus()} // Focus next field
// returnKeyType="next"
// />

// {/* Car Number Plate */}
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
// Car Number Plate
// </Text>
// <TextInput
// ref={carNumberPlateRef} // Reference for Car Number Plate
// className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
// placeholder="Enter car number plate"
// value={carNumberPlate}
// onChangeText={setCarNumberPlate}
// onSubmitEditing={() => availableSeatsRef.current.focus()} // Focus next field
// returnKeyType="next"
// />

// {/* Available Seats */}
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
// Available Seats
// </Text>
// <TextInput
// ref={availableSeatsRef} // Reference for Available Seats
// className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
// placeholder="Enter number of available seats"
// value={availableSeats}
// onChangeText={setAvailableSeats}
// onSubmitEditing={() => priceRef.current.focus()} // Focus next field
// keyboardType="numeric"
// returnKeyType="next"
// />

// {/* Price */}
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mb-1">
// Price per seat
// </Text>
// <TextInput
// ref={priceRef} // Reference for Price
// className="w-full placeholder:text-zinc-400 dark:placeholder:text-zinc-400 border-b-2 border-zinc-400 dark:border-zinc-600 dark:text-zinc-50 text-zinc-950 bg-zinc-100 dark:bg-zinc-700 p-2 mb-4 text-base h-12"
// placeholder="Enter price per seat"
// value={price}
// onChangeText={setPrice}
// keyboardType="numeric"
// />

// {/* Smoking */}
// <View className="flex-row items-center mb-2">
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mr-2">
//   Smoking Allowed
// </Text>
// <Checkbox
//   status={smoking ? "checked" : "unchecked"}
//   onPress={() => {
//     setSmoking(!smoking);
//   }}
//   color={colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]}
// />
// </View>
// {/* AC Available */}
// <View className="flex-row items-center mb-2">
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mr-2">
//   AC Available
// </Text>
// <Checkbox
//   status={ac ? "checked" : "unchecked"}
//   onPress={() => {
//     setAc(!ac);
//   }}
//   color={colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]}
// />
// </View>
// {/* Music Available */}
// <View className="flex-row items-center mb-2">
// <Text className="text-lg font-semibold text-zinc-950 dark:text-zinc-50 mr-2">
//   Music Available
// </Text>
// <Checkbox
//   status={music ? "checked" : "unchecked"}
//   onPress={() => {
//     setMusic(!music);
//   }}
//   color={colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]}
// />
// </View>