import axios from "axios"
import { backend_url } from "../config";

export const getCoordinates = async (query) => {
    const res = await axios.post(`${backend_url}/api/v1/localitySuggestions/getCoordinates`, {
        query
    })

    return res.data.coordinates;
}