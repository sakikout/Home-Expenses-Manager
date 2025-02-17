import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const StorageProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
  });

    const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken : null;
    });

  const login = (userData, token) => {
    setUser(userData);
    setToken(token)
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", JSON.stringify(token));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    if (token){
      localStorage.setItem("token", JSON.stringify(user));
    }
  }, [user, token] );

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useStorage = () => useContext(AuthContext);
