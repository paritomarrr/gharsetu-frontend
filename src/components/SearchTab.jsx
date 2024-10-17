import { Search } from 'lucide-react';


const SearchTab = () => {
  return (
    <div className="py-2 flex border-[1px] border-[#DDD] shadow-custom pl-8 pr-2 rounded-full items-center">
      <div>
        <div className="text-xs font-semibold"> Where </div>
        <input type="text" placeholder="Find your dream home" className="text-sm focus:outline-none" />
      </div>
      <div className='bg-[#DDD] h-full w-[1px] mx-6'></div>
      <div>
        <div className="text-xs font-semibold"> Price Range </div>
        <input type="text" placeholder="Set your budget" className="text-sm focus:outline-none"/>
      </div>
      <div className='bg-[#DDD] h-full w-[1px] mx-6'></div>
      <div>
        <div className="text-xs font-semibold"> Property Type </div>
        <input type="text" placeholder="Choose property type" className="text-sm focus:outline-none" />
      </div>
      <div className='bg-gradient-to-r from-[#1D4CBE] to-[#6398FF] p-4 rounded-full'>
        <Search size={16} className='text-white cursor-pointer'/>
      </div>
    </div>
  )
}

export default SearchTab