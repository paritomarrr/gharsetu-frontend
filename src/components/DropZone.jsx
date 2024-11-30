import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload, Loader2, X } from 'lucide-react';

const DropZone = ({ setImages, images }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const uploadToCloudinary = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'GharSetu2'); // Replace with your upload preset

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
            const uploadPromises = acceptedFiles.map(async (file) => {
                const cloudinaryUrl = await uploadToCloudinary(file);
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
            setError('Failed to upload some images. Please try again.');
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
                window.alert(error)
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
                            JPG, PNG, or PDF, file size no more than 10MB
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <strong>Selected Images:</strong>
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