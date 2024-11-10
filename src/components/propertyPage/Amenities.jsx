import React from "react";
import {
    Leaf,
    Wifi,
    Orbit,
    Wind,
    Refrigerator,
  } from "lucide-react";

const Amenities = () => {
  return (
    <div className="flex flex-col gap-7">
      <div className="text-xl font-medium">What this place offers</div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-[14px]">
          <div className="flex gap-3">
            <Leaf size={20} />
            <div className="text-sm">Garden view</div>
          </div>
          <div className="flex gap-3">
            <Wifi size={20} />
            <div className="text-sm"> WIFI </div>
          </div>
          <div className="flex gap-3">
            <Orbit size={20} />
            <div className="text-sm">Free washer - in building</div>
          </div>
          <div className="flex gap-3">
            <Wind size={20} />
            <div className="text-sm">Central air conditioning</div>
          </div>
          <div className="flex gap-3">
            <Refrigerator size={20} />
            <div className="text-sm">Refrigerator</div>
          </div>
        </div>
        <div className="flex flex-col gap-[14px]">
          <div className="flex gap-3">
            <Leaf size={20} />
            <div className="text-sm">Garden view</div>
          </div>
          <div className="flex gap-3">
            <Wifi size={20} />
            <div className="text-sm"> WIFI </div>
          </div>
          <div className="flex gap-3">
            <Orbit size={20} />
            <div className="text-sm">Free washer - in building</div>
          </div>
          <div className="flex gap-3">
            <Wind size={20} />
            <div className="text-sm">Central air conditioning</div>
          </div>
          <div className="flex gap-3">
            <Refrigerator size={20} />
            <div className="text-sm">Refrigerator</div>
          </div>
        </div>
      </div>
      <div className="py-[7px] px-[14px] border-[1px] border-black w-fit cursor-pointer rounded-lg text-xs">
        {" "}
        Show all 37 Amenities
      </div>
    </div>
  );
};

export default Amenities;
