import React from 'react'

const Bookmarks = () => {
    return (
        <div className='px-[70px] flex flex-col py-10 h-[calc(100vh-100px)]'>
            <div className="font-bold text-2xl text-[#222]"> Bookmarked Properties </div>

            <div className='w-full flex h-full justify-center items-center'>
                No Bookmarked Properties
            </div>
        </div>
    )
}

export default Bookmarks