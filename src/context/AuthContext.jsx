import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
      setLoading(false);
    }
  }, []);


  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", userData.username);
    setToken(userData.token);
    setUser(userData.username);
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
