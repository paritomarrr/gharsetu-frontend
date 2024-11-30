import axios from "axios";

export const DeleteProperty = async ({propertyId, userId}) => {
    const res = await axios.post(
        "http://localhost:8080/api/v1/properties/deleteProperty",
        {
            propertyId,
            userId
        }
    );

    return res;
}