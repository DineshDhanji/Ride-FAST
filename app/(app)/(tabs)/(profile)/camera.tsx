import { View, Text } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import { Button } from "@/components/Button";
import { useSession } from "@/session/ctx";
import { useUser } from "@/context/user";

export default function CameraScreen() {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [cameraFacing, setCameraFacing] = useState("back");
  const { session } = useSession();
  const [userData, setUserData] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const { user, setUser} = useUser();
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
  if (!BASE_URL) {
    console.error("Base API URL is not defined");
    return null;
  }

  const apiURL = `${BASE_URL}/api/get_info`;
  const uploadURL = `${BASE_URL}/api/upload_photo`; // Image upload endpoint

  useEffect(() => {
    // Fetch user data on component mount
    axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${session}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUserData(response.data.data); // Set user data
        setUser(response.data.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const flipCamera = () => {
    setCameraFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const capture = async () => {
    if (!cameraRef.current) return;

    // Capture the image
    const photo = await cameraRef.current.takePictureAsync({
      base64: true, // Include base64 data for uploading
    });

    // Prepare FormData for upload
    const formData = new FormData();
    formData.append("photo", {
      uri: photo.uri, // File URI
      name: "photo.jpg", // File name
      type: "image/jpeg", // File type
    });

    axios
      .post(uploadURL, formData, {
        headers: {
          Authorization: `Bearer ${session}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const r = response.data;
        console.log(response.data);
        console.log(r.profile_picture);
        console.log("as ",r.profile_picture.replace("/media", ""));
        if (r.saved === true) {
          console.log("Image uploaded successfully:", r);
          // Update user data after successful upload
          setUserData((prev) => ({
            ...prev,
            profile_picture: r.profile_picture, // Update profile picture URL
          }));
          navigation.goBack(); // Navigate back to the index screen
        } else {
          console.error("Image upload failed:", response.data);
        }
      })
      .catch((error) => console.error("Error uploading photo:", error));
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission.granted === false) {
    return (
      <View className="flex justify-center flex-1 bg-zinc-200 dark:bg-zinc-800 px-5">
        <Text className="text-zinc-950 dark:text-zinc-50 text-xl">
          Please allow camera permission.
        </Text>
        <Button onPress={requestCameraPermission} title="Ask for permission" />
      </View>
    );
  }

  return (
    <View className="flex flex=col justify-between flex-1 bg-zinc-200 dark:bg-zinc-800">
      <View className="h-max px-5">
        <Text className="text-zinc-50 text-3xl mt-5 mb-5 px-2">Camera</Text>
        {userData && (
          <Text className="text-zinc-50 text-lg">
            Hello, {userData.first_name} {userData.last_name}!
          </Text>
        )}
        <CameraView
          ref={cameraRef}
          style={{ width: "100%", height: "auto", aspectRatio: 1 }}
          ratio="1:1"
          facing={cameraFacing}
          animateShutter={true}
          shutterSound={true}
        />
        <Text className="text-center text-zinc-50 text-xl mt-3">
          Smile (●'◡'●)
        </Text>
      </View>
      <View className="h-1/5 flex justify-end p-4">
        <Button
          onPress={flipCamera}
          title={
            cameraFacing === "back" ? "Use Front Camera" : "Use Back Camera"
          }
        />
        <Button onPress={capture} title="Capture" />
      </View>
    </View>
  );
}
