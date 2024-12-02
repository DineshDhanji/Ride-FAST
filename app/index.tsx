import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Ride FAST</Text>
      <Text style={styles.text}>Well this is just a demo.</Text>
      <Text style={styles.text}>Parkinsans: Parkinsans</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#09090b",
    padding: 20,
  },
  heading: {
    color: "#f9fafb",
    fontSize: 35,
    marginBottom: 10,
    fontFamily: "Parkinsans",
  },
  text: {
    color: "#f9fafb",
    fontSize: 16,
    fontFamily: "Parkinsans",
  },
});
