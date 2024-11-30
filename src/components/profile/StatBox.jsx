import React from "react";
import { Info } from "lucide-react";

const StatBox = ({ title, value }) => {
  return (
    <div className="py-6 px-4 w-full shadow-md border rounded-md">
      <div className="flex justify-between">
        <div className="text-sm font-medium">{title}</div>
        <Info size={16}/>
      </div>
      <div className="text-4xl font-bold text-[#1D4CBE]">{value}</div>
    </div>
  );
};

export default StatBox;
