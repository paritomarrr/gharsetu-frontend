import { SquarePen } from "lucide-react";
import Separator from "../components/Separator";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import VerifiedUser from "../assets/icons/VerifiedUser";

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      console.log("User not found, redirecting to homepage...");
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="h-[calc(100vh-158px)] px-20 py-6 flex flex-col gap-5 overflow-scroll">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-3xl font-bold">Your Profile Overview</div>
          <div className="text-2xl">
            Keep track of your personal and professional information.
          </div>
        </div>

        <div className="flex gap-2 items-center text-white px-4 py-2 rounded-md bg-[#1D4CBE]">
          Edit Profile <SquarePen size={16} />
        </div>
      </div>

      <Separator />

      <div className="flex justify-between gap-10">
        <div className="shadow-lg border-[1px] rounded-xl w-80">
          <div className="px-4 py-3 hover:bg-slate-100 cursor-pointer">
            {" "}
            General Info{" "}
          </div>
          <div className="px-4 py-3 hover:bg-slate-100 cursor-pointer">
            {" "}
            Agent Info{" "}
          </div>
          <div className="px-4 py-3 hover:bg-slate-100 cursor-pointer">
            {" "}
            Social Media & Links{" "}
          </div>
        </div>
        <div className="w-full flex flex-col gap-8">
          <div className="font-medium text-2xl"> General Information </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-5 relative">
              <div className="flex-shrink-0">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQEvhR-oclWlDw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725570376005?e=1736380800&v=beta&t=8AvIwEEfanwKjsvLwfbM7bSN55COnJaSmpyDrPOw0tQ"
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <div className="absolute top-14 left-16">
                  <VerifiedUser />
                </div>
              </div>

              <div className="flex flex-col w-full">
                <span className="text-xs text-gray-400">Your Full Name</span>
                <input
                  type="text"
                  className="border-[1px] border-[#DDD] p-2 rounded-t-lg"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  className="border-[1px] border-[#DDD] p-2 rounded-b-lg"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Your Email</span>
              <input
                type="text"
                className="border-[1px] border-[#DDD] p-2 rounded-lg"
                placeholder="Your Email"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Your Phone Number</span>
              <input
                type="text"
                className="border-[1px] border-[#DDD] p-2 rounded-lg"
                placeholder="Your Phone Number"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
