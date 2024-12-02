import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { backend_url } from "../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [formStep, setFormStep] = useState(1)

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
    };
    getUser();
  }, []);

  const logOut = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("token"); 
    setFormStep(0)
    setuser(null); 
  };

  return (
    <UserContext.Provider value={{ user, setuser, logOut, formStep, setFormStep }}>
      {children}
    </UserContext.Provider>
  );
};
