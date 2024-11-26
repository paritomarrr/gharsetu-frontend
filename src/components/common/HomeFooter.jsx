import React from 'react';
import CTA from '../../assets/cta.png';
import { MoveRight } from 'lucide-react';
import MainIconDarkMode from '../../assets/icons/MainIconDarkMode';
import { Link } from 'react-router-dom';

const HomeFooter = () => {
  return (
    <div className='px-16 py-9'>
      <div className='relative'>
        <img src={CTA} alt='CTA' className='w-full' />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-[490px] flex gap-6 flex-col text-center'>
          <div className='text-6xl text-center font-semibold'>
            Find your dream home, effortlessly.
          </div>
          <div className='text-sm text-[#FAFAFA]'>
            Your journey to the perfect property starts here. Whether you're buying, selling, or renting, we're here to make it simple.
          </div>

          <div className='flex justify-center'>
            <div className='border border-gray-500 hover:border-white cursor-pointer w-fit p-4 rounded-full'>
              <MoveRight className='text-gray-500 hover:text-white' />
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#141415] rounded-b-[50px] h-[480px] px-16'>
        <div className='bg-[#515151] h-[0.8px] w-full'></div>
        <div className='pt-16 pb-[50px] flex justify-between'>
          <MainIconDarkMode />
          <div className='flex gap-48 text-[#E0E0E0]'>
            <div className='flex flex-col gap-3'>
              <Link to={'/'}>About us</Link>
              {/* <Link to={'/'}>Careers</Link> */}
              <Link to={'/'}>Articles</Link>
              <Link to={'/postProperty'} target='_blank'>List with us</Link>
              <Link to={'/'}>Contact Us</Link>
            </div>

            <div className='flex flex-col gap-3'>
              <Link to={'https://www.linkedin.com/company/gharsetu/'} target='_blank'>Linkedin</Link>
              <Link to={'https://x.com/gharsetu'} target='_blank'>X / Twitter</Link>
              <Link to={'https://www.facebook.com/profile.php?id=61563651175703'} target='_blank'>Facebook</Link>
              <Link to={'https://www.instagram.com/gharsetu/'} target='_blank'>Instagram</Link>
            </div>
          </div>
        </div>
        <div className='pt-10 pb-20 px-5 text-[#BDBDBD] flex flex-col gap-5'>
          <div className='flex gap-6 text-xs'>
            <div> Terms of Use </div>
            <div> Privacy Policy </div>
            <div> About Cookies </div>
          </div>
          <div className='text-[8px]'>
            Copyright © 2024 Transparent. All rights reserved.
          </div>
          <div className='text-[9.5px]'>
          Making home-finding easy across India. GharSetu connects property buyers, sellers, and renters, simplifying your journey to finding the perfect home.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
