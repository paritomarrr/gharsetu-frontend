import {
  Share,
  Heart,
  Grip,
  Verified,
  Dot,
  Home,
  House,
  Calendar,
  DoorClosed,
  BadgeCheck,
  ChevronRight,
  Flag,
  Leaf,
  Wifi,
  Orbit,
  Wind,
  Refrigerator,
} from "lucide-react";
import Star from "../assets/icons/Star";
import Separator from "../components/Separator";
import PropertyCard from "../components/common/PropertyCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageGallery from "../components/propertyPage/ImageGallery";
import PropertyPageMap from "../components/propertyPage/PropertyPageMap";
import Amenities from "../components/propertyPage/Amenities";
import { addCommaToNumber } from "../helperFunctions/basicHelpers";
import PropertyInfo from "../components/propertyPage/PropertyInfo";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    const getSingleProperty = async () => {
      const res = await axios.post(
        `http://localhost:8080/api/v1/properties/getSingleProperty`,
        {
          propertyId: id,
        }
      );
      if (res.data.success) {
        setProperty(res.data.property);
      }
    };
    getSingleProperty();
  }, []);

  console.log("property", property);

  return (
    <div>
      {property && (
        <div className="px-36 py-5 flex flex-col gap-4">
          <div className="flex justify-end gap-4 cursor-pointer">
            <div className="flex gap-2 items-center">
              <Share size={16} />
              <div className="text-sm"> Share </div>
            </div>
            <div className="flex gap-2 items-center cursor-pointer">
              <Heart size={16} />
              <div className="text-sm"> Save </div>
            </div>
          </div>{" "}
          <ImageGallery property={property} />
          <div className="flex justify-between w-full">
            <div className="w-[580px]">

              <PropertyInfo address={property?.address} propertyStatus={property?.propertyStatus} propertySubType={property?.propertySubType}/>

              <Separator />

              <div>Profile</div>

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
                    <div className="text-sm">
                      {" "}
                      Flexible cancellation policy{" "}
                    </div>
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
                  <div>
                    Come and stay in this beautiful 3BHK duplex in the heart of
                    South Delhi. Spacious and full of natural light, this home
                    is nestled in a well-maintained building with modern
                    interiors. You’ll enjoy the vibrancy of the neighborhood,
                    with its proximity to local markets, cafes, and parks.
                    Conveniently located near metro stations and major bus
                    routes, this property provides easy access to all parts of
                    the city, making it perfect for families or professionals
                    seeking a blend of comfort and connectivity.
                  </div>
                  <div>.....</div>
                </div>

                <div className="flex gap-1 items-center font-semibold underline cursor-pointer">
                  {" "}
                  Show More <ChevronRight size={14} />{" "}
                </div>
              </div>

              <Separator />

             <Amenities/>

              <Separator />

              <div className="flex flex-col gap-6">
                <div className="text-xl font-medium"> Where you’ll be </div>

                {property.coordinates && (
                  <PropertyPageMap coordinates={property?.coordinates} />
                )}

                <div className="flex flex-col gap-4">
                  <div className="text-[18px] font-medium">
                    {" "}
                    Green Park, South Delhi, India{" "}
                  </div>
                  <div className="text-base">
                    Located in the prime area of South Delhi, this property
                    offers the perfect blend of convenience and tranquility.
                    Situated near popular markets like Sarojini Nagar and Lajpat
                    Nagar, and within easy reach of top schools, hospitals, and
                    parks, it provides everything you need just a short distance
                    away. With excellent connectivity through the nearby metro
                    station and public transport routes, you'll have seamless
                    access to major business hubs and leisure spots across the
                    city.
                  </div>
                  <div className="text-sm flex gap-1 items-center underline cursor-pointer">
                    {" "}
                    Show more <ChevronRight size={14} />{" "}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-6">
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
              </div>
            </div>


            <div className="w-1/3 flex flex-col gap-[21px]">
              <div className="p-[21px] rounded-lg border-[1px] border-[#E5E7EB] flex gap-[14px] flex-col shadow-lg">
                <div className="text-3xl font-medium">₹{addCommaToNumber(property?.askedPrice)}</div>
                <div className="bg-[#1D4CBE] rounded-lg py-3 px-4 text-white text-sm font-medium text-center cursor-pointer">
                  Seller Details
                </div>
                <div className="rounded-lg py-3 px-4 text-sm font-medium text-center cursor-pointer text-[#1D4CBE] border-[#1D4CBE] border-[1px]">
                  Chat on WhatsApp
                </div>
              </div>

              <div className="flex gap-2 text-xs underline justify-center items-center cursor-pointer">
                <Flag size={14} /> Report this listing
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyPage;
