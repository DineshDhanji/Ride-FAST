import { useContext, createContext, useState } from "react";

const RideContext = createContext({
  ride: null,
  setRide: () => null,
});

export function useRide() {
  const value = useContext(RideContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}
export function RideProvider({ children }) {
  const [ride, setRide] = useState(null);

  return (
    <RideContext.Provider value={{ ride, setRide }}>
      {children}
    </RideContext.Provider>
  );
}
