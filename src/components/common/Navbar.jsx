import MainIcon from '../../assets/icons/MainIcon'
import { Link, useNavigate } from 'react-router-dom'
import { Bell } from 'lucide-react';
import ProfileDropDown from '../ProfileDropDown';
import { useSelector } from 'react-redux';
import SignInModal from '../signIn/SignInModal';
import NewUserDetails from '../signIn/NewUserDetails';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useDispatch } from 'react-redux';
import { toggleIsNewUserModalOpen } from '../../store/slices/SignInSlice';
import { toggleIsSignInOpen } from '../../store/slices/SignInSlice';


const Navbar = () => {
  const { user, setFormStep, formStep } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isSignInOpen = useSelector((state) => state.signInModal.isSignInModalOpen);
  const isNewUserDetailsModalOpen = useSelector((state) => state.signInModal.isNewUserModalOpen);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.isNewUser) {
      if (!isNewUserDetailsModalOpen) {
        dispatch(toggleIsNewUserModalOpen());
      }
    }
  }, [user]);

  const navigateToPostProperty = () => {
    setFormStep(0);
    navigate('/postProperty')
  }


  return (
    <>
      <div className='px-4 md:px-20 py-4 border-b-[1px] flex justify-between items-center shadow-sm'>
        <Link to={'/'} className='flex items-center gap-2'>
          <MainIcon />
          <div className='font-MavenPro font-bold text-[30px]'> GharSetu </div>
        </Link>

      {/* Desktop Links */}
        <div className='hidden md:flex text-[#6A6A6A] items-center'>
          <Link to={'/properties/buy'} className='p-3 cursor-pointer'> Buy </Link>
          <div className='bg-[#DDD] h-6 w-[1px]'></div>
          <Link to={'/properties/rent'} className='p-3 cursor-pointer'> Rent </Link>
          <div className='bg-[#DDD] h-6 w-[1px]'></div>
          <div onClick={navigateToPostProperty} className='flex items-center'>
            <div className='p-3 cursor-pointer'> Post Property </div>
            <div className='bg-gradient-to-r h-fit from-[#1D4CBE] to-[#6398FF] cursor-pointer text-white text-xs  py-1 px-2 rounded-full'> Free </div>
          </div>
        </div>

        <div className='flex gap-4 items-center z-100'>
          <ProfileDropDown user={user} setLoginModalOpen={setLoginModalOpen} loginModalOpen={loginModalOpen} />
        </div>
      </div>

      {
        loginModalOpen && (
          <SignInModal setLoginModalOpen={setLoginModalOpen} loginModalOpen={loginModalOpen} />
        )
      }

      {
        isSignInOpen && (
          <SignInModal />
        )
      }

      {
        isNewUserDetailsModalOpen && (
          <NewUserDetails user={user} />
        )
      }

    </>
  )
}

export default Navbar