import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  const login = (token) => {
    localStorage.setItem("token", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {props.children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContextProvider, useAuth };
