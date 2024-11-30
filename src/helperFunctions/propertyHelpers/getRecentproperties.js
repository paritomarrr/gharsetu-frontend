import axios from "axios";

export const getRecentproperties = async () => {
    const response = await axios.post("http://localhost:8080/api/v1/properties/getRecentProperties");
    const data = response.data.properties;
    return data;
}