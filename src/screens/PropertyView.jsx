import { useParams } from "react-router-dom";
import OptionsBar from "../components/propertyViewPage/OptionsBar";
import PropertyViewPageMap from "../components/propertyViewPage/PropertyViewPageMap";
import PropertyCard from "../components/common/PropertyCard";
import { useEffect, useState } from "react";
import axios from "axios";

const PropertyView = () => {
  const { mode } = useParams();
  const [propertiesToShow, setPropertiesToShow] = useState([]);

  useEffect(() => {
    const getProperties = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/properties/getAllProperties",
          {
            mode: mode,
          }
        );

        setPropertiesToShow(res.data.properties);
      } catch (error) {
        console.log("Error in Get properties", error);
      }
    };
    getProperties();
  }, [mode]);

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <OptionsBar mode={mode} />
      <div className="flex w-full">
        {/* Property list section */}
        <div className="w-1/2 px-6 py-3 flex flex-col gap-3">
          <div className="text-[#6B7280] font-light text-sm">
            {propertiesToShow.length} Properties found for{" "}
            <span className="font-bold text-black">
              {mode === "rent" ? "Rent" : "Sale"}
            </span>{" "}
            in <span className="font-bold text-black">Lagos</span>
          </div>

          <div className="w-full h-[1px] bg-[#d6d9df]"></div>

          {/* Scrollable PropertyCard grid */}
          <div className="h-[calc(100vh-200px)] overflow-scroll">
            {propertiesToShow.length > 0 ? (
              <div className="grid grid-cols-2 gap-9 py-3 overflow-y-auto">
                {propertiesToShow.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div> No Prop </div>
            )}
          </div>
        </div>

        {/* Map section */}
        <div className="w-1/2">
          <PropertyViewPageMap propertiesToShow={propertiesToShow}/>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
