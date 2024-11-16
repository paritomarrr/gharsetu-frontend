import { TriangleAlert, X } from 'lucide-react'
import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { DeleteProperty } from '../../helperFunctions/propertyHelpers/deleteProperty'

const DeleteConfirmation = ({ setDeletePropertyModel, propertyId }) => {
    const { user } = useContext(UserContext)

    const handleDelete = async () => {
        const res = await DeleteProperty({ propertyId, userId: user?._id });

        console.log('res', res)

        if (res.data.success) {
            setDeletePropertyModel(false);
        }
    }



    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-fit flex flex-col gap-5">
                {/* <div className='flex justify-end'>
                    <X size={20} className="cursor-pointer" onClick={() => setDeletePropertyModel(false)} />
                </div> */}
                <div>
                    <div className='text-sm'> Are you sure you want to delete this property?</div>
                    <span className='text-xs text-red-500 flex flex-row gap-1'>
                        <TriangleAlert size={14} /> This action cannot be undone.
                    </span>
                </div>


                <div className='flex justify-between text-sm'>
                    <button onClick={() => setDeletePropertyModel(false)} className="bg-[#d1d1d1] text-[#6A6A6A] px-4 py-2 rounded-md w-full">Cancel</button>
                    <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-md ml-2 w-full">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation