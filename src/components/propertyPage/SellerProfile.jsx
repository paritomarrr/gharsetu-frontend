import axios from 'axios';
import { Dot } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { backend_url } from '../../config';

const SellerProfile = ({ property }) => {

    const [ownerData, setOwnerData] = useState()

    useEffect(() => {
        if (property?.ownerId) {
            const getSellerName = async () => {
                try {
                    const res = await axios.post(`${backend_url}/api/v1/users/getSellerName`, {
                        sellerId: property.ownerId,
                    });
                    console.log('res', res);
                    setOwnerData(res.data.seller);
                } catch (error) {
                    console.error('Error fetching seller data:', error);
                }
            };
            getSellerName();
        }
    }, [property]);
    
    const createdOn = property?.createdAt;

    const timeElapsed = (date) => {
        const now = new Date();
        const createdDate = new Date(date);
        const diff = now - createdDate;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
        if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    };

    console.log('property from DF', property)

    return (
        <Link to={`/seller/${property.ownerId}`} target='_blank' className='flex gap-5 items-center'>
            <img
                className='w-10 h-10 rounded-full'
                // src='https://media.licdn.com/dms/image/v2/D5603AQEvhR-oclWlDw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1725570376005?e=1736380800&v=beta&t=8AvIwEEfanwKjsvLwfbM7bSN55COnJaSmpyDrPOw0tQ'
                src={'/logo.png'}
                alt='Seller profile'
            />
            <div className='flex flex-col gap-[3px]'>
                <div className='text-sm font-semibold'>
                    Listed by {ownerData?.firstName} {ownerData?.lastName}
                </div>
                <div className='flex text-xs text-[#6A6A6A] items-center'>
                    <div>{property?.listedBy}</div>
                    <Dot size={14} />
                    <div>{timeElapsed(createdOn)}</div>
                </div>
            </div>
        </Link>
    );
};

export default SellerProfile;
