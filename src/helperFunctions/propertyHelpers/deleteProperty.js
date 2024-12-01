import axios from "axios";

export const DeleteProperty = async ({propertyId, userId}) => {
    const res = await axios.post(
        "https://gharsetu-server-git-main-paritomarrrs-projects.vercel.app/api/v1/properties/deleteProperty",
        {
            propertyId,
            userId
        }
    );

    return res;
}