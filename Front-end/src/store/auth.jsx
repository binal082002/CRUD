import { createContext, useContext, useState, useEffect } from "react";

//1. context
export const AuthContext = createContext();

//2. Provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const authToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    // console.log("Storing token in LS: ", serverToken);
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const clearTokenFromLS = () => {
    // console.log("Clearing token from LS");
    setToken("");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token; // If token is found value is true.
  console.log("isLogged in: ", isLoggedIn);

  // Logout functionality
  const logoutUser = () => {
    clearTokenFromLS();
  };

  // JWT authorization - to get currently logged in userData
  const userAuthentication = async () => {
    if (!token) {
      console.log("No token available, skipping authentication");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setIsAdmin(false);
      // console.log("Fetching user data with token: ", authToken);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const usr_data = data.data;
        // console.log("User data: ", usr_data);
        setUser(usr_data);
        setIsLoading(false); // Once data is set into user state then set loading to false!
        
        if (usr_data.isAdmin) setIsAdmin(true);
        else setIsAdmin(false);
      } else {
        console.log("Failed to fetch user data");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Error fetching user data", err);
    }
  };

  useEffect(() => {
    // // Only clear token from local storage if not already set
    // if (!localStorage.getItem("initialLoadDone")) {
    //   clearTokenFromLS();
    //   localStorage.setItem("initialLoadDone", "true");
    // }

    // Only authenticate user if a token is present
    if (token) {
      userAuthentication();
    } else {
      setIsLoading(false); // Ensure loading state is false if no token
    }

  }, [token]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, storeTokenInLS, logoutUser, authToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

//3. Delivery
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);

  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
