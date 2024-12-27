import React from 'react';
import CTA from '../../assets/cta.png';
import { MoveRight } from 'lucide-react';
import MainIconDarkMode from '../../assets/icons/MainIconDarkMode';
import { Link } from 'react-router-dom';

const HomeFooter = () => {
  return (
    <div className='px-4 md:px-16 py-6 md:py-9'>
      {/* CTA Section */}
      <div className='relative'>
        <img src={CTA} alt='CTA' className='w-full' />
        <div className='absolute md:p-0 mt-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-full max-w-md mx-auto flex flex-col gap-4 text-center px-4'>
          <div className='text-2xl md:text-6xl font-semibold mt-8'>
            Find your dream home, effortlessly.
          </div>
          <div className='text-xs md:text-sm text-[#FAFAFA]'>
            Your journey to the perfect property starts here. Whether you're buying, selling, or renting, we're here to make it simple.
          </div>

          <div className='flex justify-center'>
            <div className='border border-gray-500 hover:border-white cursor-pointer w-fit p-3 md:p-4 rounded-full'>
              <MoveRight className='text-gray-500 hover:text-white' />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className='bg-[#141415] rounded-b-[50px] px-4 md:px-16 pt-6 md:pt-16'>
        <div className='bg-[#515151] h-[0.8px] w-full'></div>
        <div className='pt-8 md:pt-16 pb-8 md:pb-[50px] flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
          <MainIconDarkMode />
          <div className='flex flex-col md:flex-row gap-8 md:gap-48 text-[#E0E0E0]'>
            <div className='flex flex-col gap-4 text-sm'>
              <Link to={'/'}>About us</Link>
              <Link to={'/'}>Articles</Link>
              <Link to={'/postProperty'} target='_blank'>List with us</Link>
              <Link to={'/'}>Contact Us</Link>
            </div>
            <div className='flex flex-col gap-3 text-sm'>
              <Link to={'https://www.linkedin.com/company/gharsetu/'} target='_blank'>Linkedin</Link>
              <Link to={'https://x.com/gharsetu'} target='_blank'>X / Twitter</Link>
              <Link to={'https://www.facebook.com/profile.php?id=61563651175703'} target='_blank'>Facebook</Link>
              <Link to={'https://www.instagram.com/gharsetu/'} target='_blank'>Instagram</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
      <div className="mt-8 mb-6 w-full h-[1px] bg-[#515151]" />

        <div className='px-2 md:px-5 text-[#BDBDBD] flex flex-col gap-3 md:gap-5 pb-10 md:pb-20 text-xs'>
          <div className=''>
            <span className='font-bold'>Address:</span> KH-91, Kavi Nagar, Ghaziabad, Uttar Pradesh, India
          </div>
          <div className='-mt-2'>
            <span className='font-bold'>Phone:</span> 9717252292
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-6 text-[10px] md:text-xs'>
            <div><Link to="terms-of-use" target='_blank'>Terms of Use</Link></div>
            <div><Link to="/privacy-policy" target='_blank'>Privacy Policy</Link></div>
            <div>About Cookies</div>
          </div> 
          <div className='text-[8px] md:text-[9px]'>
            Copyright © 2024 Transparent. All rights reserved.
          </div>
          <div className='text-[9px] md:text-[9.5px] leading-4 md:leading-normal'>
            Making home-finding easy across India. GharSetu connects property buyers, sellers, and renters, simplifying your journey to finding the perfect home.
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeFooter;
