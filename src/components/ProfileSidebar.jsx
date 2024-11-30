import React from "react";
import { Grid2x2, House, Users, Settings, BadgeHelp } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";

const profileSidebarItems = [
  {
    name: "Dashboard",
    url: "/profile/dashboard",
    icon: <Grid2x2 size={16} />,
  },
  {
    name: "My Listing",
    url: "/profile/my-listing",
    icon: <House size={16} />,
  },
  {
    name: "Leads",
    url: "/profile/leads",
    icon: <Users size={16} />,
  },
  {
    name: "Account Settings",
    url: "/profile/account-settings",
    icon: <Settings size={16} />,
  },
  {
    name: "Help Centre",
    url: "/profile/help-centre",
    icon: <BadgeHelp size={16} />,
  },
];

const ProfileSidebar = () => {
  const { pathname } = useLocation();
  console.log("path", pathname);

  return (
    <div className="w-60 shadow-md rounded-lg h-fit">
      {profileSidebarItems.map((item, index) => (
        <Link
          to={item.url}
          key={index}
          className={`flex items-center gap-4 py-[11px] px-4 cursor-pointer rounded-lg hover:bg-gray-100 ${
            pathname === item.url ? "bg-gray-100" : ""
          }`}
        >
          <div className={`${pathname === item.url ? "text-[#1D4CBE]" : ""}`}>
            {item.icon}
          </div>
          <span
            className={`${
              pathname === item.url ? "text-[#1D4CBE] font-bold" : ""
            } text-sm`}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ProfileSidebar;
