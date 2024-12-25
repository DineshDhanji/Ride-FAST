import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (username, password) => {
          const apiUrl = process.env.EXPO_PUBLIC_BASE_API_URL;
          if (apiUrl === undefined) {
            console.error("Base API URL is not defined");
            return;
          }

          const getToken = async () => {
            try {
              const response = await fetch(`${apiUrl}/api/get_csrf_token`);
              const data = await response.json();
              return data.csrf_token;
            } catch (error) {
              console.error("Error fetching CSRF token:", error);
            }
            return null;
          };

          const url = apiUrl + "/api/login";
          console.log("URL: ", url);
          getToken().then((csrfToken) => {
            axios
              .post(
                url,
                {
                  username: username,
                  password: password,
                },
                {
                  headers: {
                    "X-CSRFToken": csrfToken, // Send the CSRF token in the header
                  },
                }
              )
              .then((response) => {
                console.log("response", response);
                // setSession("123456");
              })
              .catch((error) => {
                console.error("error", error);
              });
          });
          // Perform sign-in logic here
          // setSession("123456");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const signInHandler = () => {};
