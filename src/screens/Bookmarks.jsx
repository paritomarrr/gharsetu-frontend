import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext.jsx';
import PropertyCard from '../components/common/PropertyCard.jsx';
import { backend_url } from '../config/index.js';

const Bookmarks = () => {
    const { user } = useContext(UserContext);
    const [bookmarkedProperties, setBookmarkedProperties] = useState([]);

    useEffect(() => {
        const getBookmarkedProperties = async () => {
            const res = await axios.post(`${backend_url}/api/v1/users/getBookmarkedProperties`, {
                userId: user?._id
            });
            if (res.data.success) {
                setBookmarkedProperties(res.data.bookmarks);
            }
        };
        if (user?._id) getBookmarkedProperties();
    }, [user]);

    return (
        <div className='md:px-[70px] px-5 flex flex-col md:py-10 py-8 min-h-[calc(100vh-100px)]'>
            <div className="font-bold text-2xl text-[#222] mb-6">Bookmarked Properties</div>

            <div className='w-full flex h-full justify-center '>
                <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
                    {bookmarkedProperties?.length > 0 ? (
                        bookmarkedProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))
                    ) : (
                        <div className='text-[#222] text-lg font-medium'>
                            No bookmarked properties
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookmarks;
