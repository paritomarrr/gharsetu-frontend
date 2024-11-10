import React from "react";
import { Leaf, Wifi, Orbit, Wind, Refrigerator } from "lucide-react";
import {
  Cctv,
  Dumbbell,
  Fence,
  Phone,
  Trash2,
  Volleyball,
  Waves,
  Webcam,
} from "lucide-react";
import { CircleParking, SquareChevronUp, Cable } from "lucide-react";
import { useState } from "react";

const societyAmenities = [
  { name: "Gym", icon: <Dumbbell size={18} />, value: "gym" },
  {
    name: "Car Parking",
    icon: <CircleParking size={18} />,
    value: "carParking",
  },
  { name: "Garden/Park", icon: <Fence size={18} />, value: "gardenPark" },
  {
    name: "Elevator",
    icon: <SquareChevronUp size={18} />,
    value: "elevator",
  },
  { name: "Security", icon: <Webcam size={18} />, value: "security" },
  { name: "Pet-Friendly", icon: <Wifi size={18} />, value: "petFriendly" },
  { name: "Swimming", icon: <Waves size={18} />, value: "swimming" },
  { name: "CCTV", icon: <Cctv size={18} />, value: "cctv" },
  { name: "Intercomm", icon: <Phone size={18} />, value: "intercomm" },
  {
    name: "Waste Management",
    icon: <Trash2 size={18} />,
    value: "wasteManagement",
  },
  { name: "Power Backup", icon: <Cable size={18} />, value: "powerBackup" },
  {
    name: "Sports facility",
    icon: <Volleyball size={18} />,
    value: "sportsFacility",
  },
];
const Amenities = ({ data }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const filteredAmenities = societyAmenities?.filter((amenity) =>
    data?.includes(amenity.value)
  );

  const displayedAmenities = showAllAmenities 
    ? filteredAmenities 
    : filteredAmenities.slice(0, 6);

  const toggleShowAllAmenities = () => {
    setShowAllAmenities(!showAllAmenities);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="text-xl font-medium">What this place offers</div>
      <div className="grid grid-cols-2 gap-4">
        {displayedAmenities.map((item, index) => (
          <div key={index} className="flex gap-2 items-center">
            {item.icon}
            <div>{item.name}</div>
          </div>
        ))}
      </div>
      {filteredAmenities.length === 0 && <div>No amenities available</div>}
      {filteredAmenities.length > 6 && (
        <button
          onClick={toggleShowAllAmenities}
          className="py-[7px] px-[14px] border border-black w-fit cursor-pointer rounded-lg text-xs"
        >
          {showAllAmenities 
            ? `Show less`
            : `Show all ${filteredAmenities.length} amenities`}
        </button>
      )}
    </div>
  );
};

export default Amenities;