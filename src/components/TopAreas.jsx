import React from "react";

const TopAreas = () => {
  const areas = ["Ghaziabad", "Noida", "Delhi", "Gurgaon"];

  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <h1 className="font-bold text-xl sm:text-2xl text-[#222]">Top Areas in Gharsetu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {areas.map((area) => (
          <div
            key={area}
            className="relative group overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <img
              src={`/public/sampleHouse.jpg`}
              alt={area}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-4 left-4 z-20 text-white font-semibold text-lg">
              {area}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAreas;