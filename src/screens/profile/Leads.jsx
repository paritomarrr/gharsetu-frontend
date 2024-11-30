import React from "react";
import StatBox from "../../components/profile/StatBox";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import { Input } from "@chakra-ui/react";
import LeadsCard from "../../components/profile/LeadsCard";


const Leads = () => {
  return (
    <div className="flex flex-col gap-[26px]">
      <div className="flex flex-col">
        <div className="text-3xl font-bold"> Leads (Potential Customers) </div>
        <div>
          Manage potential tenants and buyers for your properties efficiently.
        </div>
      </div>

      <div className="flex gap-4">
        <StatBox title={'Total Leads'} value={'12'}/>
        <StatBox title={'New Leads'} value={'3'}/>
        <StatBox title={'In Progress'} value={'3'}/>
        <StatBox title={'Converted'} value={'2'}/>
      </div>

      <div className="bg-[#DDD] h-[0.8px] w-full"></div>

      <div className="flex gap-3">
        <Input placeholder="Search Leads..." />
        <Menu>
          <MenuButton>
            <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm gap-2">
              <SlidersHorizontal size={14} />
              <span className="whitespace-nowrap">Date</span>{" "}
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem>Last 7 Days</MenuItem>
            <MenuItem>Last 30 Days</MenuItem>
            <MenuItem>All Time</MenuItem>
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton>
            <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm gap-2">
              <SlidersHorizontal size={14} />
              <span className="whitespace-nowrap">Status</span>{" "}
            </div>
          </MenuButton>
          <MenuList className="text-sm">
            <MenuItem>Last 7 Days</MenuItem>
            <MenuItem>Last 30 Days</MenuItem>
            <MenuItem>All Time</MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <LeadsCard/>
        <LeadsCard/>
        <LeadsCard/>
        <LeadsCard/>
        <LeadsCard/>
        <LeadsCard/>
        <LeadsCard/>
        <LeadsCard/>
      </div>

    </div>
  );
};

export default Leads;
