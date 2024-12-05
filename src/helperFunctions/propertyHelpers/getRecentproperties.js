import axios from "axios";
import { backend_url } from "../../config";

export const getRecentproperties = async () => {
    const response = await axios.post(`${backend_url}/api/v1/properties/getRecentProperties`);
    // const response = await axios.post(`http://localhost:8080/api/v1/properties/getRecentProperties`);
    const data = response.data.properties;
    return data;
}