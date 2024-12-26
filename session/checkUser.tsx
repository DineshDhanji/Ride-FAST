import { useSession } from "@/session/ctx";
import axios from "axios";

export async function checkUser(session) {
  if (!session) {
    return null;
  }
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL;
  const apiURL = BASE_URL + "/check_status";
  axios
    .post(
      apiURL,
      {},
      {
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error("Error", error);
      return null;
    });
}
