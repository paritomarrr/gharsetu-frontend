import {
  Share,
  Heart,
  House,
  Calendar,
  DoorClosed,
  BadgeCheck,
  Flag,
} from "lucide-react";
import Separator from "../components/Separator";
import PropertyCard from "../components/common/PropertyCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/propertyPage/ImageGallery";
import PropertyPageMap from "../components/propertyPage/PropertyPageMap";
import Amenities from "../components/propertyPage/Amenities";
import { convertPriceToWords } from "../helperFunctions/basicHelpers";
import PropertyInfo from "../components/propertyPage/PropertyInfo";
import SellerProfile from "../components/propertyPage/SellerProfile";
import { useToast } from "@chakra-ui/react";
import { backend_url } from "../config";
import AllImagesGallery from "../components/propertyPage/AllImagesGallery";
import { ImageGallerySkeleton } from '../components/common/Skeleton'

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [ownerData, setOwnerData] = useState();
  const toast = useToast();
  const [ImageGalleryPopup, setimagegallerypopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The URL has been copied to your clipboard.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Failed to copy the URL. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        console.error("Failed to copy: ", err);
      });
  };

  useEffect(() => {
    const getSingleProperty = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${backend_url}/api/v1/properties/getSingleProperty`,
          { propertyId: id }
        );
        if (res.data.success) {
          setProperty(res.data.property);
        }
      } catch (error) {
        console.error("Error fetching single property:", error);
      }
      setIsLoading(false);
    };
    getSingleProperty();
  }, [id]);

  useEffect(() => {
    if (property?._id) {
      const getSellerProfile = async () => {
        try {
          const res = await axios.post(
            `${backend_url}/api/v1/properties/sellerProfile`,
            { propertyId: property._id }
          );
          setOwnerData(res.data.ownerData);
        } catch (error) {
          console.error("Error fetching seller profile:", error);
        }
      };
      getSellerProfile();
    }
  }, [property]);

  const generateWhatsAppLink = (phoneNumber) => {
    const propertyAddress = property?.address || "the listed property";
    const price = convertPriceToWords(property?.askedPrice);
    const pageLink = window.location.href;
    const message = encodeURIComponent(
      `Hello, I saw this property on your website and would like to know more about it. Details:\n\n` +
      `Address: ${propertyAddress.locality}, ${propertyAddress.city}\n` +
      `Price: ₹${price}\n\n` +
      `Here is the link to the property: ${pageLink}\n\n` +
      `Please provide more information.`
    );
    return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
  };

  return (
    <div className="flex flex-col gap-4 px-4 md:px-10 lg:px-20 xl:px-36 py-5">
      <div className="flex justify-end gap-4 cursor-pointer">
        <div className="flex gap-2 items-center" onClick={handleShare}>
          <Share size={16} />
          <div className="text-sm">Share</div>
        </div>
        <div className="flex gap-2 items-center cursor-pointer">
          <Heart size={16} />
          <div className="text-sm">Save</div>
        </div>
      </div>

      {isLoading ? (
        <ImageGallerySkeleton />
      ) : (
        <ImageGallery property={property} setimagegallerypopup={setimagegallerypopup} />
      )}

      {/* Price Card Below the Images */}
      <div className="p-[25px] rounded-lg border border-[#E5E7EB] flex gap-[14px] flex-col shadow-lg w-full md:w-2/3 lg:w-1/2">
        <div className="text-3xl font-medium">
          ₹{convertPriceToWords(property?.askedPrice)}
        </div>
        <div className="bg-[#1D4CBE] rounded-lg py-3 px-4 text-white text-sm font-medium text-center cursor-pointer">
          Seller Details
        </div>
        <a
          href={generateWhatsAppLink(property?.phoneNumber)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg py-3 px-4 text-sm font-medium text-center cursor-pointer text-[#1D4CBE] border-[#1D4CBE] border"
        >
          Chat on WhatsApp
        </a>
      </div>

      <PropertyInfo
        address={property?.address}
        propertyStatus={property?.propertyStatus}
        propertySubType={property?.propertySubType}
      />

      <Separator />

      <SellerProfile property={property} />

      <Separator />

      <div className="flex flex-col gap-[14px]">
        <div className="flex gap-3">
          <House size={20} />
          <div>
            <div className="text-sm md:text-base">Entire home</div>
            <div className="text-xs md:text-sm text-[#6B7280]">
              You’ll have the house/apartment all to yourself.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <BadgeCheck size={20} />
          <div>
            <div className="text-sm md:text-base">Verified Listing</div>
            <div className="text-xs md:text-sm text-[#6B7280]">
              This property has undergone Gharsetu’s comprehensive verification process.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <DoorClosed size={20} />
          <div>
            <div className="text-sm md:text-base">Self check-in</div>
            <div className="text-xs md:text-sm text-[#6B7280]">
              Check-in at your convenience using the secure access code.
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Calendar size={20} />
          <div>
            <div className="text-sm md:text-base">Flexible cancellation policy</div>
            <div className="text-xs md:text-sm text-[#6B7280]">
              Free cancellation up to December 2024 or flexible terms available.
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-sm md:text-base leading-relaxed">
        <div>
          {showFullDescription
            ? property?.description
            : property?.description?.slice(0, 400)}
          {!showFullDescription && property?.description?.length > 400 && <div> ....... </div>}
        </div>

        {property?.description?.length > 400 && (
          <div
            className="text-[#1D4CBE] cursor-pointer"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Show less" : "Show more"}
          </div>
        )}
      </div>

      <Separator />

      <Amenities data={property.societyAmenities} />

      <Separator />

      <div className="flex flex-col gap-6">
        <div className="text-xl font-medium">Property Location</div>
        {property.coordinates && (
          <PropertyPageMap coordinates={property?.coordinates} />
        )}
      </div>

      <Separator />

      <div className="flex flex-col gap-6">
        <div className="text-xl font-medium">Similar nearby houses for sale</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
          <PropertyCard />
        </div>

        <div className="flex justify-center">
          <div className="py-[11px] px-[14px] text-white bg-black rounded-lg cursor-pointer text-sm md:text-base">
            View More
          </div>
        </div>
      </div>

      <div className="flex gap-2 text-xs underline justify-center items-center cursor-pointer mt-4">
        <Flag size={14} /> Report this listing
      </div>

      {ImageGalleryPopup && (
        <AllImagesGallery setimagegallerypopup={setimagegallerypopup} property={property} />
      )}
    </div>
  );
};

export default PropertyPage;
