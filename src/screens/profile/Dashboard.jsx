import React, { useEffect, useState } from "react";
import StatBox from "../../components/profile/StatBox";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { SlidersHorizontal } from "lucide-react";
import DashboardTable from "../../components/profile/DashboardTable";
import { getUserProperties } from "../../helperFunctions/profileHelpers/getUserProperties";
import { useContext } from "react";
import { backend_url } from "../../config";
import { UserContext } from "../../context/userContext";

const Dashboard = () => {
  const {user} = useContext(UserContext);
  const [stats, setStats] = useState({
    totalListings: 0,
    totalImpressions: 0,
    totalViews: 0,
    totalGenerated: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?._id) return;
      try {
        const res = await fetch(`${backend_url}/api/v1/stats/dashboard`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.data);
          console.log("data", data.data)
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()


    const getUserProp = async () => {
      const res = await getUserProperties(user?._id);
      setTotalListings(res.length);
    };
    getUserProp();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-[26px]">
      <div className="text-3xl font-bold"> Welcome, {user?.firstName || "User"}</div>

      <div className="flex gap-5">
        <StatBox title="Total Listings" value={stats.totalListings} />
        <StatBox title="Total Impressions" value={stats.totalImpressions} />
        <StatBox title="Total Views" value={stats.totalViews} />
        <StatBox title="Total Generated" value={stats.totalGenerated} />
      </div>

      <div className="bg-[#DDD] h-[0.8px] w-full"></div>

      {/* <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="text-3xl font-semibold">Your Lisitings</div>

          <div className="flex gap-4">
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

            <Menu>
              <MenuButton>
                <div className="flex border-[1px] border-gray-300 py-2 rounded-md px-2 items-center text-sm gap-2">
                  <SlidersHorizontal size={14} />
                  <span className="whitespace-nowrap">All Time</span>{" "}
                </div>
              </MenuButton>
              <MenuList className="text-sm">
                <MenuItem>Last 7 Days</MenuItem>
                <MenuItem>Last 30 Days</MenuItem>
                <MenuItem>All Time</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>

        <div className="p-4 shadow-md border rounded-md">
          <DashboardTable />
        </div>
      </div> */}

      <div className="bg-[#DDD] h-[0.8px] w-full"></div>

      {/* TODO  */}
      {/* <div className="flex justify-between">
        <div>
          <div> Engagement Tips </div>

          <div>
            <div> Tip 1: Use high quality images </div>
            <div> Tip 2: Write a detailed description </div>
            <div> Tip 3: Share your listing on social media </div>
            <div> Tip 4: Respond to queries promptly </div>
          </div>
        </div>

        <div>
          <div> Engagement Tips </div>

          <div>
            <div> Tip 1: Use high quality images </div>
            <div> Tip 2: Write a detailed description </div>
            <div> Tip 3: Share your listing on social media </div>
            <div> Tip 4: Respond to queries promptly </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
