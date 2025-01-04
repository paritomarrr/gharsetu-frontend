import React from "react";
import { Grip } from "lucide-react";

const ImageGallery = ({ property, setimagegallerypopup }) => {

  const customAlt = `${property?.address?.locality}-${property?.address?.city}-${property?.address?.state}`.replace(/\s+/g, "");

  const placeholderImages = [
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
  ];

  const getImageUrl = (index) => {
    if (property?.images && property.images.length > index) {
      return property.images[index]?.cloudinaryUrl || "/logo.png";
    }
    return placeholderImages[index];
  };

  const renderMainImage = () => (
    <div className="w-1/2" onClick={() => setimagegallerypopup(true)}>
      <img
        className="w-full h-[428px] object-cover rounded-l-xl"
        src={getImageUrl(0)}
        alt="Property main view"
      />
    </div>
  );

  const renderThumbnails = () => (
    <div onClick={() => setimagegallerypopup(true)} className="grid grid-cols-2 gap-2 w-1/2">
      {[1, 2, 3, 4].map((index) => (
        <img
          key={index}
          className={`h-[210px] w-full object-cover ${index === 2 ? "rounded-tr-xl" : index === 4 ? "rounded-br-xl" : ""
            }`}
          src={getImageUrl(index)}
          alt={`${customAlt}-${index + 1}`}
        />
      ))}
    </div>
  );

  return (
    <div className="flex gap-2 w-full relative">
      {renderMainImage()}
      {renderThumbnails()}

      <button
        onClick={() => setimagegallerypopup(true)}
        className="absolute bottom-5 right-7 bg-white hover:bg-gray-50 flex gap-2 items-center px-4 py-2 rounded-lg shadow-sm transition-colors"
      >
        <Grip className="h-4 w-4" />
        <span className="text-sm font-medium">Show all photos</span>
      </button>
    </div>
  );
};

export default ImageGallery;
