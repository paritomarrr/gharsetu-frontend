import { useState } from "react";
import PropertyCard from "./common/PropertyCard";

const FeaturedProperties = () => {
  const [properties] = useState([
    {
      _id: "679f0e2ca199e19d0ac65f6e",
      title: "Oasis GrandStand",
      address: {
        locality: "Sector 153",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        pincode: "201308",
      },
      askedPrice: 3397000,
      images: [
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738477097/property_for_Sell_Sector153_1738477094992.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738477097/property_for_Sell_Sector153_1738477094996.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738477096/property_for_Sell_Sector153_1738477094997.webp" },
      ],
      bhkConfig: "3 BHK",
      furnishType: "Semi-furnished",
      propertyStatus: "Ready to Move",
    },
    {
      _id: "679f0d97a199e19d0ac65f6b",
      title: "Artha Mart",
      address: {
        locality: "Sector 153",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        pincode: "201308",
      },
      askedPrice: 11100000,
      images: [
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476377/property_for_Sell_Sector153_1738476371167.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476377/property_for_Sell_Sector153_1738476371170.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476376/property_for_Sell_Sector153_1738476371171.webp" },
      ],
      bhkConfig: "Commercial",
      furnishType: "Semi-furnished",
      propertyStatus: "Ready to Move",
    },
    {
      _id: "679f0d84a199e19d0ac65f68",
      title: "Artha Mart",
      address: {
        locality: "Sector 153",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        pincode: "201308",
      },
      askedPrice: 11500000,
      images: [
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476377/property_for_Sell_Sector153_1738476371167.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476377/property_for_Sell_Sector153_1738476371170.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476376/property_for_Sell_Sector153_1738476371171.webp" },
      ],
      bhkConfig: "Commercial",
      furnishType: "Semi-furnished",
      propertyStatus: "Ready to Move",
    },
    {
      _id: "679f0d6ca199e19d0ac65f65",
      title: "Artha Mart",
      address: {
        locality: "Sector 153",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        pincode: "201308",
      },
      askedPrice: 4603000,
      images: [
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476377/property_for_Sell_Sector153_1738476371167.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476377/property_for_Sell_Sector153_1738476371170.webp" },
        { cloudinaryUrl: "https://res.cloudinary.com/dzqgyl0wf/image/upload/v1738476376/property_for_Sell_Sector153_1738476371171.webp" },
      ],
      bhkConfig: "Commercial",
      furnishType: "Semi-furnished",
      propertyStatus: "Ready to Move",
    },
  ]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 m-4">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default FeaturedProperties;