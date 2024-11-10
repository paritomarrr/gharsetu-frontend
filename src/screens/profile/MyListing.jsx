import { Input } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import ListingPropertyCard from "../../components/profile/ListingPropertyCard";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { getUserProperties } from "../../helperFunctions/profileHelpers/getUserProperties";
import { useState } from "react";
import { Link } from "react-router-dom";

const MyListing = () => {
  const {user} = useContext(UserContext)
  const [properties, setProperties] = useState([])

  useEffect(()=>{
    const getUserProp = async () =>{
      const res = await getUserProperties(user?._id)
      setProperties(res)
    }
    getUserProp()
  },[])
  return (
    <div className="flex flex-col gap-[26px]">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-3xl font-bold"> My Listings </div>
          <div>
            {" "}
            Manage your properties effortlessly and connect with potential
            clients.{" "}
          </div>
        </div>

        <Link to={'/postProperty'} className="flex gap-2 bg-[#1D4CBE] py-3 px-6 rounded-md text-white">
          <Plus />
          <div>Add New Listing</div>
        </Link>
      </div>

      <div className="flex gap-3">
        <Input placeholder="Search listings..." />
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

      <div className="grid grid-cols-3 gap-y-5">
       {
          properties.map((property)=>(
            <ListingPropertyCard key={property._id} property={property} />
          ))
       }
      </div>
    </div>
  );
};

export default MyListing;
