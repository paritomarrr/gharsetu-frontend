import { Input } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react';


const OptionsBar = () => {
    return (
        <div className='p-5 border-b-[1px] flex gap-4'>
            <Input placeholder="Search address, Pin Code" size="lg" />
            <div className='p-4 items-center flex gap-2 border-[1px] rounded-lg'>
                <ChevronDown size={16} />
                <div className='whitespace-nowrap text-xs font-semibold'>Price Range</div>
            </div>
            <div className='p-4 items-center flex gap-2 border-[1px] rounded-lg'>
                <ChevronDown size={16} />
                <div className='whitespace-nowrap text-xs font-semibold'>Property Type</div>
            </div>
            <div className='p-4 items-center flex gap-2 border-[1px] rounded-lg'>
                <ChevronDown size={16} />
                <div className='whitespace-nowrap text-xs font-semibold'>Age of Property</div>
            </div>
            <div className='p-4 items-center flex gap-2 border-[1px] rounded-lg'>
                <ChevronDown size={16} />
                <div className='whitespace-nowrap text-xs font-semibold'>Amenities</div>
            </div>
            <div className='p-4 items-center flex gap-2 border-[1px] rounded-lg'>
                <ChevronDown size={16} />
                <div className='whitespace-nowrap text-xs font-semibold'>Bed & Bathroom</div>
            </div>
        </div>
    )
}

export default OptionsBar