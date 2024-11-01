import React from 'react'
import { useDropzone } from 'react-dropzone'
import { CloudUpload } from 'lucide-react';



const DropZone = () => {
    const { getRootProps, getInputProps } = useDropzone()
    return (
        <div {...getRootProps()} className='w-full border-dashed border-2 rounded-md flex justify-center items-center cursor-pointer'>
            <input {...getInputProps()} />
            <div className='flex justify-center text-center flex-col items-center gap-8 py-20'>
                <CloudUpload size={50}/>
                <div className='flex flex-col'>
                    <div>
                        Select a file or drag and drop here (Minimum 5 images)
                    </div>
                    <div className='text-[#717171] text-sm'>
                        JPG, PNG or PDF, file size no more than 10MB
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DropZone