import { useContext, createContext, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => null,
});

export function useUser() {
  const value = useContext(UserContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <UserProvider />");
    }
  }

  return value;
}
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
