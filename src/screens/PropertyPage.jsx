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
import { ImageGallerySkeleton } from '../components/common/Skeleton';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const PropertyPage = () => {
  const { user } = useContext(UserContext);
  let { id } = useParams();
  const [property, setProperty] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [ownerData, setOwnerData] = useState();
  const toast = useToast();
  const [ImageGalleryPopup, setimagegallerypopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSellerDetails, setShowSellerDetails] = useState(false); // toggle for seller details
  const [bookmarked, setBookmarked] = useState(false);


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
    const parts = id.split("-");
    id = parts[parts.length - 1];
    
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

  const bookmarkProperty = async () => {
    const res = await axios.post(`${backend_url}/api/v1/users/saveProperty`, {
      userId: user._id,
      propertyId: id
    })
    if (res.data.success) {
      toast({
        title: res.data.msg,
        description: "The property has been Bookmarked",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setBookmarked(true);
    }
  }

  if (isLoading) {
    return <ImageGallerySkeleton />;
  }

  return (
    <div>
      {/* Mobile View (Simplified Layout) */}
      <div className="block md:hidden px-4 py-5">
        <div className="flex justify-end gap-4 cursor-pointer mb-4">
          <div className="flex gap-2 items-center" onClick={handleShare}>
            <Share size={16} />
            <div className="text-sm">Share</div>
          </div>

          <div
      className={`flex items-center gap-3 cursor-pointer p-1 rounded-lg transition-all duration-300 ease-in-out ${bookmarked ? 'bg-red-500 scale-105 shadow-lg' : 'bg-gray-100 hover:bg-gray-200'}`}
      onClick={bookmarkProperty}
    >
      <Heart
        size={16}
        className={`transition-transform duration-300 ${bookmarked ? 'text-white' : 'text-gray-600'}`}
      />
      <div className={`text-sm font-semibold ${bookmarked ? 'text-white' : 'text-gray-800'}`}>
        {bookmarked ? 'Bookmarked' : 'Save'}
      </div>
    </div>
        </div>

        {property?.images && (
          <div className="mb-4">
            <ImageGallery property={property} setimagegallerypopup={setimagegallerypopup} />
          </div>
        )}

        {/* Price Card with Seller Details Toggle */}
        {property?.askedPrice && (
          <div className="p-4 rounded-lg border border-[#E5E7EB] flex flex-col gap-[14px] shadow-lg w-full max-w-md mb-4">
            <div className="text-2xl font-medium">
              ₹{convertPriceToWords(property?.askedPrice)}
            </div>

            {!showSellerDetails ? (
              <div
                onClick={() => setShowSellerDetails(true)}
                className="bg-[#1D4CBE] rounded-lg py-3 px-4 text-white text-sm font-medium text-center cursor-pointer"
              >
                Seller Details
              </div>
            ) : (
              // Show the seller's contact details once toggled
              <div className="flex flex-col gap-2 text-sm">
                <div className="font-semibold">
                  {property?.firstName} {property?.lastName}
                </div>
                <div className="text-gray-700">Phone: {property?.phoneNumber}</div>
                <div className="text-gray-700">Email: {property?.email}</div>
              </div>
            )}

            <a
              href={generateWhatsAppLink(property?.phoneNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg py-3 px-4 text-sm font-medium text-center cursor-pointer text-[#1D4CBE] border-[#1D4CBE] border"
            >
              Chat on WhatsApp
            </a>
          </div>
        )}

        <PropertyInfo
          address={property?.address}
          propertyStatus={property?.propertyStatus}
          propertySubType={property?.propertySubType}
          area={property?.area}
          furnishTypes={property?.furnishType}
        />

        <Separator />

        <SellerProfile property={property} />

        <Separator />

        <div className="flex flex-col gap-[14px]">
          <div className="flex gap-3">
            <House size={20} />
            <div>
              <div className="text-sm">Entire home</div>
              <div className="text-xs text-[#6B7280]">
                You’ll have the house/apartment all to yourself.
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <BadgeCheck size={20} />
            <div>
              <div className="text-sm">Verified Listing</div>
              <div className="text-xs text-[#6B7280]">
                This property has undergone Gharsetu’s comprehensive verification process.
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <DoorClosed size={20} />
            <div>
              <div className="text-sm">Self check-in</div>
              <div className="text-xs text-[#6B7280]">
                Check-in at your convenience using the secure access code.
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Calendar size={20} />
            <div>
              <div className="text-sm">Flexible cancellation policy</div>
              <div className="text-xs text-[#6B7280]">
                Free cancellation up to December 2024 or flexible terms available.
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="text-sm leading-relaxed">
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

        {/* <div className="flex flex-col gap-6">
          <div className="text-xl font-medium">
            Similar nearby houses for sale
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
            <PropertyCard />
          </div>
          <div className="flex justify-center">
            <div className="py-[11px] px-[14px] text-white bg-black rounded-lg cursor-pointer text-sm">
              View More
            </div>
          </div>
        </div> */}

        <div className="flex gap-2 text-xs underline justify-center items-center cursor-pointer mt-4">
          <Flag size={14} /> Report this listing
        </div>
      </div>

      {/* Desktop View (Old Code + Seller Details Toggle) */}
      <div className="hidden md:block">
        <div className="px-36 py-5 flex flex-col gap-4">
          <div className="flex justify-end gap-4 cursor-pointer">
            <div className="flex gap-2 items-center" onClick={handleShare}>
              <Share size={16} />
              <div className="text-sm"> Share </div>
            </div>
            <div
              className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-all duration-300 ease-in-out ${bookmarked ? 'bg-red-500 scale-105 shadow-lg' : 'bg-gray-100 hover:bg-gray-200'}`}
              onClick={bookmarkProperty}
            >
              <Heart
                size={18}
                className={`transition-transform duration-300 ${bookmarked ? 'text-white' : 'text-gray-600'}`}
              />
              <div className={`text-sm font-semibold ${bookmarked ? 'text-white' : 'text-gray-800'}`}>
                {bookmarked ? 'Bookmarked' : 'Save'}
              </div>
            </div>
          </div>{" "}
          {isLoading ? (
            <ImageGallerySkeleton />
          ) : (
            <ImageGallery
              property={property}
              setimagegallerypopup={setimagegallerypopup}
            />
          )}
          <div className="flex justify-between w-full">
            <div className="w-[580px]">
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
                    <div className="text-sm"> Entire home </div>
                    <div className="text-xs text-[#6B7280]">
                      You’ll have the house/apartment all to yourself.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <BadgeCheck size={20} />
                  <div>
                    <div className="text-sm"> Verified Listing </div>
                    <div className="text-xs text-[#6B7280]">
                      This property has undergone Gharsetu’s comprehensive
                      verification process.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <DoorClosed size={20} />
                  <div>
                    <div className="text-sm"> Self check-in </div>
                    <div className="text-xs text-[#6B7280]">
                      Check-in at your convenience using the secure access code.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar size={20} />
                  <div>
                    <div className="text-sm"> Flexible cancellation policy </div>
                    <div className="text-xs text-[#6B7280]">
                      Free cancellation up to December 2024 or flexible terms
                      available.
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-sm">
                <div>
                  {showFullDescription
                    ? property?.description
                    : property?.description?.slice(0, 400)}
                  {!showFullDescription && property?.description?.length > 400 && (
                    <div> ....... </div>
                  )}
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
                <div className="text-xl font-medium"> Property Location </div>

                {property.coordinates && (
                  <PropertyPageMap coordinates={property?.coordinates} />
                )}
              </div>

              <Separator />

              {/* <div className="flex flex-col gap-6">
                <div className="text-xl font-medium">
                  Similar nearby houses for sale{" "}
                </div>
                <div className="grid grid-cols-2 gap-11">
                  <PropertyCard />
                  <PropertyCard />
                  <PropertyCard />
                  <PropertyCard />
                </div>

                <div className="flex justify-center">
                  <div className="py-[11px] px-[14px] text-white bg-black rounded-lg">
                    {" "}
                    View More{" "}
                  </div>
                </div>
              </div> */}
            </div>

            <div className="w-1/3 flex flex-col gap-[21px]">
              <div className="p-[21px] rounded-lg border-[1px] border-[#E5E7EB] flex gap-[14px] flex-col shadow-lg">
                <div className="text-3xl font-medium">
                  ₹{convertPriceToWords(property?.askedPrice)}
                </div>

                {!showSellerDetails ? (
                  <div
                    onClick={() => setShowSellerDetails(true)}
                    className="bg-[#1D4CBE] rounded-lg py-3 px-4 text-white text-sm font-medium text-center cursor-pointer"
                  >
                    Seller Details
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="font-semibold">
                      {property?.firstName} {property?.lastName}
                    </div>
                    <div className="text-gray-700">Phone: {property?.phoneNumber}</div>
                    <div className="text-gray-700">Email: {property?.email}</div>
                  </div>
                )}

                <a
                  href={generateWhatsAppLink(property?.phoneNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg py-3 px-4 text-sm font-medium text-center cursor-pointer text-[#1D4CBE] border-[#1D4CBE] border-[1px]"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="flex gap-2 text-xs underline justify-center items-center cursor-pointer">
                <Flag size={14} /> Report this listing
              </div>
            </div>
          </div>
        </div>
      </div>

      {ImageGalleryPopup && (
        <AllImagesGallery
          setimagegallerypopup={setimagegallerypopup}
          property={property}
        />
      )}
    </div>
  );
};

export default PropertyPage;
