import React from "react";
import { Verified, Dot, Star } from "lucide-react";

const PropertyInfo = ({ address, propertyStatus, propertySubType, averageRating, reviewCount, onReviewLinkClick, area, bhkConfig, furnishType, baths }) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="text-[#222] flex items-center gap-1">
        <div className="font-semibold text-xl">{address?.locality}, {address?.city}</div>
        <Verified size={16} />
      </div>
      <div className="text-sm">
        {address?.houseNumber}, {address?.locality}, {address?.city},{" "}
        {address?.state}, {address?.pincode}
      </div>
      <div className="flex text-sm">
        <div>{area} sq ft</div>
        <div>· {bhkConfig || "3 BHK"}</div>
        <div>· {furnishType}</div>
        <div>· {propertyStatus}</div>
        <div>· {propertySubType}</div>
      </div>
      <div className="flex text-sm items-center font-semibold ">
        <div className="flex gap-1 items-center">
          <Star /> {averageRating}{" "}
        </div>
        <Dot />
        <div className="underline cursor-pointer" onClick={onReviewLinkClick}>
          {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
