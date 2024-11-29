import React from "react";
import { Grip } from "lucide-react";

const ImageGallery = ({ property }) => {
  
  const placeholderImages = [
    "/api/placeholder/800/600",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
    "/api/placeholder/400/300",
  ];

  const getImageUrl = (index) => {
    return property?.images?.[index]?.cloudinaryUrl || placeholderImages[index];
  };

  return (
    <div className="flex gap-2 w-full relative">
      <div className="w-1/2">
        <img
          className="w-full h-[428px] object-cover rounded-l-xl"
          src={getImageUrl(0)}
          alt="Property main view"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 w-1/2">
        <img
          className="h-[210px] w-full object-cover"
          src={getImageUrl(1)}
          alt="Property view 2"
        />
        <img
          className="h-[210px] w-full object-cover rounded-tr-xl"
          src={getImageUrl(2)}
          alt="Property view 3"
        />
        <img
          className="h-[210px] w-full object-cover"
          src={getImageUrl(3)}
          alt="Property view 4"
        />
        <img
          className="h-[210px] w-full object-cover rounded-br-xl"
          src={getImageUrl(4)}
          alt="Property view 5"
        />
      </div>

      <button
        className="absolute bottom-5 right-7 bg-white hover:bg-gray-50 flex gap-2 items-center px-4 py-2 rounded-lg shadow-sm transition-colors"
        onClick={() => console.log("Show all photos clicked")}
      >
        <Grip className="h-4 w-4" />
        <span className="text-sm font-medium">Show all photos</span>
      </button>
    </div>
  );
};

export default ImageGallery;
