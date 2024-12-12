import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { ChevronLeft, Heart, ArrowLeft } from 'lucide-react'; // For icons
import axios from 'axios';

import { useToast } from '@chakra-ui/react';

import Separator from '../components/Separator';
import PropertyPageMap from '../components/propertyPage/PropertyPageMap';
import Amenities from '../components/propertyPage/Amenities';
import PropertyInfo from '../components/propertyPage/PropertyInfo';
import SellerProfile from '../components/propertyPage/SellerProfile';
import { convertPriceToWords } from '../helperFunctions/basicHelpers';
import { backend_url } from '../config';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const toast = useToast();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.post(`${backend_url}/api/v1/properties/getSingleProperty`, { propertyId: id });
        if (res.data.success) {
          setProperty(res.data.property);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "The URL has been copied to your clipboard.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy the URL. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const images = property?.images || [];
  const totalImages = images.length;

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[600px] mx-auto text-[#222] relative font-sans">
      {/* Top bar overlay on image */}
      {images.length > 0 && (
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
          <div className="absolute top-0 left-0 z-10 p-4 flex items-center">
            <button onClick={() => window.history.back()} className="bg-white p-2 rounded-full shadow-md">
              <ArrowLeft size={18} />
            </button>
          </div>

          <div className="absolute top-0 right-0 z-10 p-4 flex items-center gap-2">
            <button onClick={handleShare} className="bg-white p-2 rounded-full shadow-md">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M4 12v-3a9 9 0 0118 0v3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 12l-4 4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="bg-white p-2 rounded-full shadow-md">
              <Heart size={18} />
            </button>
          </div>

          {/* Carousel */}
          <Slider {...sliderSettings}>
            {images.map((img, i) => (
              <div key={i} className="relative w-full h-[300px] md:h-[400px]">
                <img src={img.cloudinaryUrl} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </Slider>

          {/* Slide counter */}
          {totalImages > 0 && (
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
              {currentSlide + 1}/{totalImages}
            </div>
          )}
        </div>
      )}

      {/* Property Title and Info */}
      <div className="px-4 py-4 flex flex-col gap-2">
        <div className="text-xl font-semibold">{property?.title || "Property Title"}</div>
        <div className="text-sm text-gray-700">
          {property?.address?.houseNumber}, {property?.address?.locality}, {property?.address?.city}, {property?.address?.state}, {property?.address?.pincode}
        </div>
        <div className="text-sm text-gray-600">
          {property?.area} sq ft • {property?.bhkConfig} • {property?.furnishType} • {property?.propertyStatus}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            ★ {property?.rating || "4.90"}
          </span>
          <span className="text-sm underline">{property?.reviewsCount || "366"} reviews</span>
        </div>
      </div>

      <Separator />

      {/* Seller Profile */}
      <div className="px-4">
        <SellerProfile property={property} />
      </div>

      <Separator />

      {/* Highlights */}
      <div className="px-4 flex flex-col gap-4">
        <div className="flex gap-3 items-start">
          <House size={20} />
          <div>
            <div className="text-sm font-semibold">Entire home</div>
            <div className="text-xs text-gray-600">You’ll have the house/apartment all to yourself.</div>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <BadgeCheck size={20} />
          <div>
            <div className="text-sm font-semibold">Verified Listing</div>
            <div className="text-xs text-gray-600">This property has undergone Gharsetu’s comprehensive verification process.</div>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <DoorClosed size={20} />
          <div>
            <div className="text-sm font-semibold">Self check-in</div>
            <div className="text-xs text-gray-600">Check-in at your convenience using the secure access code.</div>
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <Calendar size={20} />
          <div>
            <div className="text-sm font-semibold">Flexible cancellation policy</div>
            <div className="text-xs text-gray-600">Free cancellation up to December 2024 or flexible terms available.</div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div className="px-4 text-sm leading-relaxed">
        {showFullDescription
          ? property?.description
          : property?.description?.slice(0, 400)}
        {property?.description?.length > 400 && (
          <>
            {!showFullDescription && <span> ....... </span>}
            <div
              className="text-[#1D4CBE] cursor-pointer font-medium mt-1"
              onClick={() => setShowFullDescription(!showFullDescription)}
            >
              {showFullDescription ? "Show less" : "Show more"}
            </div>
          </>
        )}
      </div>

      <Separator />

      {/* Amenities */}
      <div className="px-4">
        <Amenities data={property.societyAmenities} />
      </div>

      <Separator />

      {/* Map Section */}
      <div className="px-4 flex flex-col gap-4">
        <div className="text-lg font-medium">Where you’ll be</div>
        {property.coordinates && (
          <PropertyPageMap coordinates={property.coordinates} />
        )}
        <div className="text-sm text-gray-700 leading-relaxed">
          Located in the prime area of {property?.address?.locality}, {property?.address?.city}, this property offers ...
          {/* Add more location details as needed */}
        </div>
      </div>

      <Separator />

      {/* Similar Houses */}
      <div className="px-4 flex flex-col gap-4">
        <div className="text-lg font-medium">Similar nearby houses</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Replace with dynamic data */}
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>
        <div className="flex justify-center">
          <div className="py-2 px-4 text-white bg-black rounded-lg cursor-pointer text-sm">
            View More
          </div>
        </div>
      </div>

      <div className="flex gap-2 text-xs underline justify-center items-center cursor-pointer my-4">
        <Flag size={14} /> Report this listing
      </div>

      {ImageGalleryPopup && (
        <AllImagesGallery setimagegallerypopup={setimagegallerypopup} property={property} />
      )}
    </div>
  );
};

export default PropertyPage;
