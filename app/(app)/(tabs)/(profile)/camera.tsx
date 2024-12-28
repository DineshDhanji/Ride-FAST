// import { View, Text } from "react-native";
// import { useState, useRef, useEffect } from "react";
// import { useNavigation } from "expo-router";
// import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { Button } from "@/components/Button";
// import { useSession } from "@/session/ctx";
// // import { StackContext } from "./_layout";

// export default function CameraScreen() {
//   const [permission, requestCameraPermission] = useCameraPermissions();
//   const [cameraFacing, setCameraFacing] = useState("back");
//   const { session, signOut } = useSession();
//   const [show, setShow] = useState(false);
//   const [data, setData] = useState(null);
//   const cameraRef = useRef(null);
//   const navigation = useNavigation();
// //   const photoURI = useContext(StackContext);
//   const photoURI = `${BASE_URL}${data["profile_picture"]}`;

//   const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
//   if (BASE_URL === undefined) {
//     console.error("Base API URL is not defined");
//     return;
//   }

//   const apiURL = BASE_URL + "/api/get_info";

//   useEffect(() => {
//     axios
//       .get(apiURL, {
//         headers: {
//           Authorization: `Bearer ${session}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         setData(response.data.data);
//         setShow(true);
//       });
//   }, []);

//   const flipCamera = () => {
//     setCameraFacing((oldFacing) => (oldFacing === "back" ? "front" : "back"));
//   };
//   const capture = async () => {
//     console.log("Capture");
//     cameraRef.current.takePictureAsync().then((photo) => {
//       console.log(photo);
//       photoURI.saved = photo.uri;
//       navigation.navigate("index");
//     });
//   };
//   if (!permission) {
//     // Camera permissions are still loading.
//     return <View />;
//   }
//   console.log(permission);

//   if (permission.granted === false) {
//     return (
//       <View className="flex justify-center flex-1 bg-slate-800 px-5">
//         <Text className="text-slate-50 text-xl">
//           Please allow camera permission.
//         </Text>
//         <Button onPress={requestCameraPermission} text={"Ask for permission"} />
//       </View>
//     );
//   }

//   return (
//     <View className="flex flex=col justify-between flex-1 bg-slate-800">
//       <View className="h-max px-5">
//         <Text className="text-slate-50 text-3xl mt-5 mb-5 px-2">
//           Camera 
//         </Text>
//         <CameraView
//           ref={cameraRef}
//           style={{ width: "100%", height: "auto", aspectRatio: 1 }}
//           ratio="1:1"
//           facing={cameraFacing}
//           animateShutter={true}
//           shutterSound={true}
//         />
//         <Text className="text-center text-slate-50 text-xl mt-3">
//           Smile (●'◡'●)
//         </Text>
//       </View>
//       <View className="h-1/5 flex justify-end  p-4">
//         <Button
//           onPress={flipCamera}
//           title={
//             cameraFacing === "back" ? "Use Front Camera" : "Use Back Camera"
//           }
//         />
//         <Button onPress={capture} title="Capture" />
//       </View>
//     </View>
//   );
// }

import { View, Text } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";
import { Button } from "@/components/Button";
import { useSession } from "@/session/ctx";

export default function CameraScreen() {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [cameraFacing, setCameraFacing] = useState("back");
  const { session } = useSession();
  const [userData, setUserData] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

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
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const flipCamera = () => {
    setCameraFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  const capture = async () => {
    try {
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

      const response = await axios.post(uploadURL, formData, {
        headers: {
          Authorization: `Bearer ${session}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Image uploaded successfully:", response.data);
        // Update user data after successful upload
        setUserData((prev) => ({
          ...prev,
          profile_picture: response.data.profile_picture, // Update profile picture URL
        }));
        navigation.navigate("index"); // Navigate back to the index screen
      } else {
        console.error("Image upload failed:", response.data);
      }
    } catch (error) {
      console.error("Error capturing or uploading photo:", error);
    }
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission.granted === false) {
    return (
      <View className="flex justify-center flex-1 bg-slate-800 px-5">
        <Text className="text-slate-50 text-xl">
          Please allow camera permission.
        </Text>
        <Button onPress={requestCameraPermission} text="Ask for permission" />
      </View>
    );
  }

  return (
    <View className="flex flex=col justify-between flex-1 bg-slate-800">
      <View className="h-max px-5">
        <Text className="text-slate-50 text-3xl mt-5 mb-5 px-2">Camera</Text>
        {userData && (
          <Text className="text-slate-50 text-lg">
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
        <Text className="text-center text-slate-50 text-xl mt-3">
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
