import React, { useState } from "react";
import { ChartArea, PenLine, Star, Trash2 } from "lucide-react";
import UnLiked from "../../assets/icons/UnLiked";
import { Link } from "react-router-dom";
import { use } from "framer-motion/client";
import { useEffect } from "react";
import { convertPriceToWords } from "../../helperFunctions/basicHelpers";
import DeleteConfirmation from "./DeleteConfirmation";

const ListingPropertyCard = ({ property, deletePropertyModel, setDeletePropertyModel }) => {

  return (
    <div className="p-4 shadow-md border-[#F7F7F7] w-fit border-[1px] rounded-md">
      <div>
        <img
          src={property?.images[0]?.cloudinaryUrl}
          alt="property"
          className="h-60 w-60 object-cover rounded-lg"
        />
      </div>

      <div className="flex gap-[5px] flex-col">
        <div className="font-semibold">Cozy Apartment</div>
        <div className="text-[#6A6A6A] text-xs">{property?.address?.locality}, {property?.address?.state}</div>
        <div className="flex justify-between items-center">
          <div className="bg-[#EEF5F0] flex w-fit gap-[6px] px-2 py-1 rounded-full items-center">
            <div className="bg-[#589E67] w-[7px] h-[7px] rounded-full"></div>
            <div className="text-[10px] text-[#589E67]">Available</div>
          </div>
          <div className="text-sm font-bold">₹{convertPriceToWords(property?.askedPrice)}</div>
        </div>
        <div className="flex justify-between text-xs font-semibold">
          <div className="bg-[#F9F9F9] rounded-md py-1 px-2">150 views</div>
          {/* <div className="bg-[#F9F9F9] rounded-md py-1 px-2">150 views</div>
          <div className="bg-[#F9F9F9] rounded-md py-1 px-2">150 views</div> */}
        </div>
        <div className="flex justify-between text-xs">
          <div className="flex gap-1 items-center border border-black p-1 rounded-md cursor-pointer">
            <PenLine size={12} />
            <div>Edit</div>
          </div>
          <div className="flex gap-1 items-center border border-black p-1 rounded-md cursor-pointer">
            <ChartArea size={12} />
            <div>Analytics</div>
          </div>
          <div onClick={() => setDeletePropertyModel(true)} className="flex gap-1 items-center border border-red-600 p-1 rounded-md text-red-600 cursor-pointer">
            <Trash2 size={12} />
            <div>Delete</div>
          </div>
        </div>
      </div>

      {
        deletePropertyModel && (
          <div>
            <DeleteConfirmation setDeletePropertyModel={setDeletePropertyModel} propertyId={property._id} />
          </div>
        )
      }
    </div>
  );
};

export default ListingPropertyCard;
