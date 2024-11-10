import axios from "axios";

export const getUserProperties = async (userId) => {
    console.log('from getUserProperties', userId)
    const response = await axios.post(`http://localhost:8080/api/v1/userProperties/getUserProperties`, {
        id: userId
    });
    const data = response.data.properties;
    return data;
}