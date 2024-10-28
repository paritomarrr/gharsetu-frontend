import { useParams } from 'react-router-dom';
import OptionsBar from '../components/propertyViewPage/OptionsBar';
import PropertyViewPageMap from '../components/propertyViewPage/PropertyViewPageMap';
import PropertyCard from '../components/common/PropertyCard';

const PropertyView = () => {
    const { mode } = useParams();

    return (
        <div className='min-h-[calc(100vh-100px)]'>
            <OptionsBar />
            <div className='flex w-full'>
                {/* Property list section */}
                <div className='w-1/2 px-6 py-3 flex flex-col gap-3'>
                    <div className='text-[#6B7280] font-bold text-sm'>
                        200+ Properties found
                    </div>
                    
                    <div className='w-full h-[1px] bg-[#d6d9df]'></div>

                    {/* Scrollable PropertyCard grid */}
                    <div className='grid grid-cols-2 gap-9 py-3 overflow-y-auto h-[calc(100vh-200px)]'>
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                        <PropertyCard />
                    </div>
                </div>

                {/* Map section */}
                <div className='w-1/2'>
                    <PropertyViewPageMap />
                </div>
            </div>
        </div>
    )
}

export default PropertyView;
