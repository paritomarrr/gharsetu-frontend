import React from 'react';
import CTA from '../../assets/cta.png';
import { MoveRight } from 'lucide-react';

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
            <MoveRight className='text-gray-500 hover:text-white'/>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-[#141415] rounded-b-[50px] h-[480px]'></div>
    </div>
  );
};

export default HomeFooter;
