import { ExternalLink, Mail, Phone } from "lucide-react";
import React from "react";

const LeadsCard = () => {
  return (
    <div className="max-w-72 border-[1px] shadow-md py-4 px-5 rounded-md flex flex-col gap-[9px]">
      <div className="flex justify-between items-center">
        <div className="text-[17px] font-semibold">John Doe</div>
        <div className="text-[8px] bg-[#EDF2FE] py-[2px] px-1 text-[#4976F4] h-fit rounded-sm">
          {" "}
          New{" "}
        </div>
      </div>
      <div className="text-sm flex gap-1 items-center">
        Cozy Apartment <ExternalLink size={12} />
      </div>
      <div className="flex gap-1 items-center">
        <Phone size={12} className="text-[#6A6A6A]" />
        <span className="text-[#6A6A6A] text-xs">+91 9876543210</span>
      </div>
      <div className="flex gap-1 items-center">
        <Mail size={12} className="text-[#6A6A6A]" />
        <span className="text-[#6A6A6A] text-xs">john@example.com</span>
      </div>
    </div>
  );
};

export default LeadsCard;
