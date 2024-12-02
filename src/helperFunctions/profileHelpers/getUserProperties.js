import axios from "axios";
import { backend_url } from "../../config";

export const getUserProperties = async (userId) => {
    const response = await axios.post(`${backend_url}/api/v1/userProperties/getUserProperties`, {
        id: userId
    });
    const data = response.data.properties;
    return data;
}