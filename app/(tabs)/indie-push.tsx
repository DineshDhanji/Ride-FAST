// // Indie Push.tsx
// import axios from "axios";
// import { registerIndieID, unregisterIndieDevice } from "native-notify";
// import { Text, View } from "react-native";
// import Button from "../../components/Button"

// export default function IndieNotification() {
//   const registeruser = () => {
//     registerIndieID("user1", 25677, "D83ft1902sTCmXwwESdtvN");
//   };

//   const sendnotification = () => {
//     axios.post(`https://app.nativenotify.com/api/indie/notification`, {
//         subID: 'user1',
//         appId: 25677,
//         appToken: 'D83ft1902sTCmXwwESdtvN',
//         title: 'This is the title',
//         message: 'This is body'
//    });
//   }
//   return (
//     <View className="flex flex=col justify-between flex-1 bg-slate-800">
//       <View className="h-1/5 flex justify-end  p-4">
//         <Button onPress={registeruser} text="Register User" />
//         <Button onPress={sendnotification} text="Send Notification" />
//       </View>
//     </View>
//   );
// }
