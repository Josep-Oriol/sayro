import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/auth/user", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const data = await res.json();
        console.log(data);
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
