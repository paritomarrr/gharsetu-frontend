import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { backend_url } from "../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formStep, setFormStep] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUser = async () => {
      if (token) {
        try {
          const response = await axios.post(`${backend_url}/api/v1/auth/getUser`, {
            token,
          });
          setuser(response.data.user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const logOut = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("token");
    setFormStep(0);
    setuser(null);
  };

  return (
    <UserContext.Provider value={{ user, setuser, logOut, formStep, setFormStep, loading }}>
      {children}
    </UserContext.Provider>
  );
};
