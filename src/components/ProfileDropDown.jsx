import { useState, useEffect, useRef } from "react";
import { Menu, User } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  toggleIsSignInOpen,
  setSignInModalTitle,
} from "../store/slices/SignInSlice";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const ProfileDropDown = ({ user, loginModalOpen, setLoginModalOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logOut } = useContext(UserContext);

  const dispatch = useDispatch();
  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openSignInModal = () => {
    dispatch(toggleIsSignInOpen());
    setIsOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(!loginModalOpen);
    dispatch(setSignInModalTitle("Log In"));
    setIsOpen(false);
  };

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <div
        onClick={toggleDropDown}
        className="flex items-center gap-[14px] py-2 px-3 border-[1px] rounded-full cursor-pointer"
      >
        <Menu size={20} />
        <div className=" flex justify-center items-center  ">
          {user && user.firstName ? (
            <div className="bg-primary text-white px-[10px] py-[5px] rounded-full">
              {" "}
              {user.firstName[0].toUpperCase()}{" "}
            </div>
          ) : (
            <div className="bg-primary text-white p-[10px] rounded-full">
              {" "}
              <User size={20} />{" "}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="absolute right-0 py-2 border-[1px] rounded-xl bg-white shadow-custom w-[220px] text-sm">
          {user ? (
            <div className="flex flex-col gap-1">
              <div className="py-[10px] px-4 font-bold cursor-pointer">
                Hi, {user.firstName}
              </div>
              <Link
                to={"/profile/dashboard"}
                className="py-[10px] px-4 cursor-pointer"
              >
                Profile
              </Link>
              <Link to={"/bookmarks"} className="py-[10px] px-4 cursor-pointer">
                Bookmarks
              </Link>

               {/* Mobile Only Links  */}
          <div className="md:hidden mt-2 border-t border-[#DDD] pt-2 flex flex-col">
            <Link
              to={"/properties/buy"}
              className="py-[10px] px-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Buy
            </Link>
            <Link
              to={"/properties/rent"}
              className="py-[10px] px-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Rent
            </Link>
          </div>
          <div
            onClick={() => {
              setIsOpen(false);
              // If you have a navigateToPostProperty function in navbar,
              // either pass it down as a prop or handle it here:
              // navigateToPostProperty();
            }}
            className="py-[10px] px-4 cursor-pointer flex items-center gap-2"
          >
            <Link to={'/postProperty'}>
            Post Property
            </Link>
            <div className="bg-gradient-to-r from-[#1D4CBE] to-[#6398FF] text-white text-xs py-1 px-2 rounded-full">
              Free
            </div>
          </div>
              <div className="w-full h-[1px] bg-[#DDD]"></div>

              <div onClick={logOut} className="py-[10px] px-4 cursor-pointer">
                Log Out
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={openSignInModal}
                className="py-[10px] px-4 font-bold cursor-pointer"
              >
                Sign Up
              </div>
              <div
                onClick={openLoginModal}
                className="py-[10px] px-4 cursor-pointer"
              >
                Log In
              </div>
            </>
          )}

         
        </div>
      )}
    </div>
  );
};

export default ProfileDropDown;
