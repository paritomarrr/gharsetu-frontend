import React from "react";
import { Verified, Dot, Star } from "lucide-react";

const PropertyInfo = ({ address, propertyStatus, propertySubType }) => {
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
        <div>1500 sq ft</div>
        <div>· 5 BHK</div>
        <div>· Fully Furnished</div>
        <div>· 3 bath</div>
        <div>· {propertyStatus}</div>
        <div>· {propertySubType}</div>
      </div>
      <div className="flex text-sm items-center font-semibold ">
        <div className="flex gap-1 items-center">
          {" "}
          <Star /> 4.90{" "}
        </div>
        <Dot />
        <div className="underline cursor-pointer">366 reviews</div>
      </div>
    </div>
  );
};

export default PropertyInfo;
