import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Loader2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const DropZone = ({ setImages, images }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const propertyForm = useSelector((state) => state.propertyForm);

  

    const MAX_FILE_SIZE = 5 * 1024 * 1024
    

    const uploadToCloudinary = async (file) => {
        const customName = `property_for_${propertyForm.availableFor}_${propertyForm.address.locality.replace(/\s+/g, '')}_${Date.now()}`;
        console.log(customName);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'GharSetu2'); // Replace with your upload preset
            formData.append('public_id', customName);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/dzqgyl0wf/image/upload`, // Replace with your cloud name
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            return data.secure_url;
        } catch (err) {
            console.error('Upload error:', err);
            throw err;
        }
    };

    const onDrop = async (acceptedFiles) => {
        setUploading(true);
        setError(null);

        try {
            const validFiles = acceptedFiles.filter((file) => {
                if (file.size > MAX_FILE_SIZE) {
                    toast.error(`File exceeds the 5MB limit.`);
                    return false;
                }
                return true;
            });

            const uploadPromises = validFiles.map(async (file) => {
                const cloudinaryUrl = await uploadToCloudinary(file, );
                return {
                    originalFile: file,
                    cloudinaryUrl,
                };
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            setImages((prevImages) => [
                ...prevImages,
                ...uploadedFiles.map(({ originalFile, cloudinaryUrl }) => ({
                    preview: URL.createObjectURL(originalFile),
                    cloudinaryUrl,
                }))
            ]);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.log(err);
        } finally {
            setUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        multiple: true,
    });

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    return (
        <div className="flex flex-col w-full gap-4">
            {error && (
                toast.error(error)
            )}

            <div
                {...getRootProps()}
                className={`w-full border-dashed border-2 rounded-md flex justify-center items-center cursor-pointer p-4 
                    ${isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500'}`}
            >
                <input {...getInputProps()} />
                <div className="flex justify-center text-center flex-col items-center gap-4 py-20">
                    {uploading ? (
                        <Loader2 size={50} className="animate-spin" />
                    ) : (
                        <CloudUpload size={50} />
                    )}
                    <div className="flex flex-col">
                        <div>
                            {uploading
                                ? 'Uploading...'
                                : 'Select a file or drag and drop here (Minimum 5 images)'}
                        </div>
                        <div className="text-[#717171] text-sm">
                            JPG, PNG, or PDF, file size no more than 5MB
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {images.length > 0 && (<strong>Selected Images:</strong>)}
                <div className="flex flex-wrap gap-2 mt-2">
                    {images?.map((file, index) => (
                        <div key={index} className="relative flex flex-col items-center">
                            <div className='absolute top-0 right-0'> <X size={20} onClick={() => removeImage(index)} className='text-white cursor-pointer p-[0.2px] rounded-full bg-red-500' /> </div>
                            <img
                                src={file.preview || file.cloudinaryUrl}
                                alt={file.name}
                                className="h-16 w-16 object-cover border rounded"
                            />
                            {file.cloudinaryUrl && (
                                <span className="text-xs text-green-600 mt-1">✓ Uploaded</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropZone;