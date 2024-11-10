import { useState, useEffect, useRef } from 'react'
import { Menu, User } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleIsSignInOpen } from '../store/slices/SignInSlice';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Link } from 'react-router-dom';

const ProfileDropDown = ({ user }) => {
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
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openSignInModal = () => {
        dispatch(toggleIsSignInOpen());
    };

    return (
        <div className='relative' ref={dropdownRef}>
            <div onClick={toggleDropDown} className='flex items-center gap-[14px] py-2 px-3 border-[1px] rounded-full cursor-pointer'>
                <Menu size={20} />
                <div className=' flex justify-center items-center  '>
                    {user && user.firstName ? (<div className='bg-primary text-white px-[10px] py-[5px] rounded-full'> {user.firstName[0].toUpperCase()} </div>) : (<div className='bg-primary text-white p-[10px] rounded-full'> <User size={20} /> </div>)}
                </div>
            </div>
            {isOpen && (
                <div className='absolute right-0 py-2 border-[1px] rounded-xl bg-white shadow-custom w-[220px] text-sm'>
                    {user ? (
                        <div className='flex flex-col gap-1'>
                            <div className='py-[10px] px-4 font-bold cursor-pointer'>
                                Hi, {user.firstName}
                            </div>
                            <Link to={'/profile/dashboard'} className='py-[10px] px-4 cursor-pointer'>
                                Profile
                            </Link>
                            <div className='w-full h-[1px] bg-[#DDD]'></div>

                            <div onClick={logOut} className='py-[10px] px-4 cursor-pointer'>
                                Log Out
                            </div>
                        </div>
                    ) : (
                        <>
                            <div onClick={openSignInModal} className='py-[10px] px-4 font-bold cursor-pointer'>
                                Sign Up
                            </div>
                            <div className='py-[10px] px-4 cursor-pointer'>
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
