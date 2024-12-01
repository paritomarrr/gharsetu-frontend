import axios from "axios";

export const getUserProperties = async (userId) => {
    const response = await axios.post(`https://gharsetu-server.vercel.app/api/v1/userProperties/getUserProperties`, {
        id: userId
    });
    const data = response.data.properties;
    return data;
}