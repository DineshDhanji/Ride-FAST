import { Tabs, useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { colors } from "@/assets/palette/colors";
import Ionicon from "@expo/vector-icons/Ionicons";
import { RideProvider } from "@/context/ride";
import { Text } from "react-native";
import { IconButton } from "react-native-paper";

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const goBackComponent = () => {
    return (
      <IconButton
        icon="arrow-left"
        iconColor={colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900]}
        size={25}
        // onPress={() => navigation.navigate("search")}
        onPress={() => navigation.navigate("(tabs)", { screen: "search" })}
      />
    );
  };

  return (
    <>
      <RideProvider>
        <StatusBar
          animated={true}
          backgroundColor={
            colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100]
          }
        />
        <Tabs
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = "";
              // size = focused ? size + 4 : size;

              if (route.name === "search") {
                iconName = focused ? "search" : "search-outline";
              } else if (route.name === "(rides)") {
                iconName = focused ? "car-sport" : "car-sport-outline";
              } else if (route.name === "(home)") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "(profile)") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "notifications") {
                iconName = focused ? "notifications" : "notifications-outline";
              }

              return <Ionicon name={iconName} size={size} color={color} />;
            },

            headerTintColor:
              colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900],
            headerStyle: {
              backgroundColor:
                colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
            },
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
              backgroundColor:
                colorScheme === "dark" ? colors.zinc[900] : colors.zinc[100],
            },
            tabBarActiveTintColor:
              colorScheme === "dark" ? colors.zinc[100] : colors.zinc[900],
            tabBarInactiveTintColor:
              colorScheme === "dark" ? colors.zinc[500] : colors.zinc[600],
            tabBarActiveBackgroundColor:
              colorScheme === "dark" ? colors.zinc[950] : colors.zinc[200],
            tabBarAllowFontScaling: true,
          })}
        >
          <Tabs.Screen
            name="search"
            options={{
              title: "Search",
              tabBarAccessibilityLabel: "Search Rides",
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="(rides)"
            options={{
              headerShown: false,
              tabBarAccessibilityLabel: "Offer a Ride",
              tabBarLabel: "Ride",
            }}
          />
          <Tabs.Screen
            name="(home)"
            options={{
              title: "Home",
              headerShown: false,
              tabBarAccessibilityLabel: "Home",
            }}
          />
          <Tabs.Screen
            name="notifications"
            options={{
              title: "Notifications",
              tabBarAccessibilityLabel: "Notifications",
            }}
          />
          <Tabs.Screen
            name="(profile)"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarAccessibilityLabel: "Profile",
            }}
          />
          <Tabs.Screen
            name="viewRide"
            options={{
              href: null,
              title: "Ride Details",
              headerLeft: () => goBackComponent(),
            }}
          />
        </Tabs>
      </RideProvider>
    </>
  );
}
