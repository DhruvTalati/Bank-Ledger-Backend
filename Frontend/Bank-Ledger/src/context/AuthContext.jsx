import { createContext, useState } from "react";
import { saveAuth, getToken, getUser, clearAuth } from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const login = (data) => {
    saveAuth(data);

    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    clearAuth();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
