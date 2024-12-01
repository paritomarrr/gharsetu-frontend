import axios from "axios";

export const getRecentproperties = async () => {
    const response = await axios.post("https://gharsetu-server.vercel.app/api/v1/properties/getRecentProperties");
    const data = response.data.properties;
    return data;
}