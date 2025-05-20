import { createContext, useContext, useEffect, useState } from "react";
import { web } from "../utils/routes.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch(`${web}/api/auth/user`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const data = await res.json();
        setIsAuthenticated(true);
        setUser(data.user);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setUser(null);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
