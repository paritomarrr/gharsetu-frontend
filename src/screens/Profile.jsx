import { SquarePen } from 'lucide-react';
import Separator from '../components/Separator';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      console.log('User not found, redirecting to homepage...');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='h-[calc(100vh-158px)] px-20 py-6 flex flex-col gap-5 overflow-scroll'>
      <div className="flex justify-between items-center">
        <div>
          <div className="text-3xl font-bold">Your Profile Overview</div>
          <div className="text-2xl">Keep track of your personal and professional information.</div>
        </div>

        <div className='flex gap-2 items-center text-white px-4 py-2 rounded-md bg-[#1D4CBE]'>
          Edit Profile <SquarePen size={16} />
        </div>
      </div>

      <Separator />

      <div className='flex justify-between gap-10'>
        <div className='shadow-lg border-[1px] rounded-xl w-80'>
          <div className='px-4 py-3 hover:bg-slate-100 cursor-pointer'> General Info </div>
          <div className='px-4 py-3 hover:bg-slate-100 cursor-pointer'> Agent Info </div>
          <div className='px-4 py-3 hover:bg-slate-100 cursor-pointer'> Social Media & Links </div>
        </div>
        <div className='w-full'>
          <div className='font-medium text-2xl'> General Information </div>
          <div>
            Name : {user?.firstName}
            Email : {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
