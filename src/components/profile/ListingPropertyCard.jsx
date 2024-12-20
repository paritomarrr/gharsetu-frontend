import React from "react";
import { ChartArea, ExternalLink, PenLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { convertPriceToWords } from "../../helperFunctions/basicHelpers";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { DeleteProperty } from "../../helperFunctions/propertyHelpers/deleteProperty";

const ListingPropertyCard = ({ property, setDeletePropertyModel }) => {

  const {user} = useContext(UserContext)


  const handleDelete = async (propertyId) => {
    try {
      if (confirm("Are you sure you want to delete this property?")) {
        const res = await DeleteProperty({propertyId, userId: user?._id})
        if(res.data.success) {
          console.log("Property deleted successfully")
          setDeletePropertyModel(prev => !prev)
        }
      }
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  };

  return (
    <div className="p-4 shadow-md border-[#F7F7F7] w-fit border-[1px] rounded-md">
      <div>
        <img
          src={property?.images[0]?.cloudinaryUrl || "/placeholder-image.jpg"}
          alt="property"
          className="h-60 w-60 object-cover rounded-lg"
        />
      </div>

      <div className="flex gap-[5px] flex-col mt-2">
        <Link
          to={`/property/${property._id}`}
          className="font-semibold flex gap-1 items-center"
        >
          {property?.address?.locality} <ExternalLink size={14} />
        </Link>
        <div className="text-[#6A6A6A] text-xs">
          {property?.address?.locality}, {property?.address?.state}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="bg-[#EEF5F0] flex w-fit gap-[6px] px-2 py-1 rounded-full items-center">
            <div className="bg-[#589E67] w-[7px] h-[7px] rounded-full"></div>
            <div className="text-[10px] text-[#589E67]">Available</div>
          </div>
          <div className="text-sm font-bold">
            ₹{convertPriceToWords(property?.askedPrice)}
          </div>
        </div>
        <div className="flex justify-between text-xs font-semibold mt-2">
          <div className="bg-[#F9F9F9] rounded-md py-1 px-2">150 views</div>
        </div>
        <div className="flex justify-between text-xs mt-2">
          <div className="flex gap-1 items-center border border-black p-1 rounded-md cursor-pointer">
            <PenLine size={12} />
            <div>Edit</div>
          </div>
          <div className="flex gap-1 items-center border border-black p-1 rounded-md cursor-pointer">
            <ChartArea size={12} />
            <div>Analytics</div>
          </div>
          <div
            onClick={() => handleDelete(property?._id)}
            className="flex gap-1 items-center border border-red-600 p-1 rounded-md text-red-600 cursor-pointer"
          >
            <Trash2 size={12} />
            <div>Delete</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPropertyCard 
