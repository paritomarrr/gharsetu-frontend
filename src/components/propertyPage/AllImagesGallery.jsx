import React, { useState } from 'react';
import { XCircle } from 'lucide-react';

const AllImagesGallery = ({ setimagegallerypopup, property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = property?.images || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setimagegallerypopup(false)}
      />
      
      <div className="relative w-full max-w-6xl h-[90vh] p-6 mx-4 bg-white rounded-lg shadow-xl flex flex-col">
        <button 
          onClick={() => setimagegallerypopup(false)}
          className="absolute top-4 right-4 z-10"
        >
          <XCircle className="w-8 h-8 text-gray-500 hover:text-gray-700" />
        </button>

        <div className="flex flex-col h-full space-y-4">
          {/* Main active image */}
          <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-lg bg-gray-100">
            {images.length > 0 && (
              <img
                src={images[activeImageIndex].cloudinaryUrl}
                alt={`Property image ${activeImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Thumbnail navigation */}
          <div className="h-24 overflow-x-auto flex-shrink-0">
            <div className="flex gap-4">
              {images.map((image, index) => (
                <button
                  key={image.cloudinaryUrl}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden 
                    ${activeImageIndex === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-200'}`}
                >
                  <img
                    src={image.cloudinaryUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Image counter */}
          <div className="absolute bottom-8 right-8 bg-black/75 text-white px-4 py-2 rounded-full text-sm">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllImagesGallery;