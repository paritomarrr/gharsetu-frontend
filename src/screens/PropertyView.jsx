import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import OptionsBar from "../components/propertyViewPage/OptionsBar";
import PropertyViewPageMap from "../components/propertyViewPage/PropertyViewPageMap";
import PropertyCard from "../components/common/PropertyCard";

const PropertyView = () => {
  const { mode } = useParams();
  const [propertiesToShow, setPropertiesToShow] = useState([]);
  const [isResizing, setIsResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  const fetchPropertiesBySearch = useCallback(async (searchTerms) => {
    const [locality, city, state] = searchTerms.split(' ');
    try {
      const res = await axios.post('http://localhost:8080/api/v1/properties/propertiesInArea', { 
        locality, city, state, mode 
      });
      setPropertiesToShow(res.data.properties);
    } catch (error) {
      console.error('Error fetching properties by search:', error);
    }
  }, [mode]);

  const fetchAllProperties = useCallback(async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/properties/getAllProperties",
        { mode }
      );
      setPropertiesToShow(res.data.properties);
    } catch (error) {
      console.error("Error fetching all properties:", error);
    }
  }, [mode]);

  useEffect(() => {
    if (search) {
      fetchPropertiesBySearch(search);
    } else {
      fetchAllProperties();
    }
  }, [search, fetchPropertiesBySearch, fetchAllProperties]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing) return;

    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;

    setSplitPosition(Math.min(Math.max(newPosition, 30), 70));
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = 'default';
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);
      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseUp]);

  return (
    <div className="min-h-[calc(100vh-100px)]">
      <OptionsBar mode={mode} />
      <div className="flex w-full relative" onMouseMove={handleMouseMove}>
        <div
          className="px-6 py-3 flex flex-col gap-3 overflow-hidden"
          style={{ width: `${splitPosition}%` }}
        >
          <div className="text-[#6B7280] font-light text-sm">
            {propertiesToShow.length} Properties found for{" "}
            <span className="font-bold text-black">
              {mode === "rent" ? "Rent" : "Sale"}
            </span>{" "}
            in <span className="font-bold text-black">
              {search?.split(' ')[1] || "Lagos"}
            </span>
          </div>

          <div className="w-full h-[1px] bg-[#d6d9df]" />

          <div className="h-[calc(100vh-200px)] overflow-y-auto">
            {propertiesToShow.length > 0 ? (
              <div className="grid grid-cols-2 gap-9 py-3">
                {propertiesToShow.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div>No Properties Found</div>
            )}
          </div>
        </div>

        <div
          className="w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize active:bg-gray-400 transition-colors"
          onMouseDown={handleMouseDown}
        />

        <div className="relative" style={{ width: `${100 - splitPosition}%` }}>
          <PropertyViewPageMap propertiesToShow={propertiesToShow} />
        </div>
      </div>
    </div>
  );
};

export default PropertyView;