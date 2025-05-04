import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

const authContext = createContext<any>(undefined);

export function ProvideAuth({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const StoredUser = localStorage.getItem("user");
    if (StoredUser) {
      const ParseUser = JSON.parse(StoredUser);
      setUser(ParseUser);
      setIsLoggedIn(true);  
    } else {
      setIsLoggedIn(false);  
    }
  }, []);
  
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 30 }),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

  return {
    user,
    login,
    logout,
    isLoggedIn,
    isLoading,
  };
}

export default ProvideAuth;
