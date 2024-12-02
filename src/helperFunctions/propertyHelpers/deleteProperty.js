import axios from "axios";
import { backend_url } from "../../config";

export const DeleteProperty = async ({propertyId, userId}) => {
    const res = await axios.post(
        `${backend_url}/api/v1/properties/deleteProperty`,
        {
            propertyId,
            userId
        }
    );

    return res;
}