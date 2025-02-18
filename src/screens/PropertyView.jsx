import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import OptionsBar from "../components/propertyViewPage/OptionsBar";
import PropertyViewPageMap from "../components/propertyViewPage/PropertyViewPageMap";
import PropertyCard from "../components/common/PropertyCard";
import { filterProperties, validatePriceRange } from "../helperFunctions/filterProperties";
import { backend_url } from "../config";

const PropertyView = () => {
  const { mode } = useParams();
  const [propertiesToShow, setPropertiesToShow] = useState([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  const totalPages = Math.ceil(propertiesToShow.length / propertiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedProperties = propertiesToShow.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset page number when mode changes
  }, [mode]);

  useEffect(() => {
    const fetchPropertiesBySearch = async (searchTerms) => {
      const [locality, city, state] = searchTerms.split(' ');
      try {
        const res = await axios.post(`${backend_url}/api/v1/properties/filteredProperties`, {
          locality,
          city,
          state,
          mode,
        });
        setPropertiesToShow(res.data.properties);
      } catch (error) {
        console.error('Error fetching properties by search:', error);
      }
    };

    const fetchAllProperties = async () => {
      try {
        const res = await axios.post(
          `${backend_url}/api/v1/properties/getAllProperties`,
          {
            mode,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined
          }
        );
        setPropertiesToShow(res.data.properties);
      } catch (error) {
        console.error("Error fetching all properties:", error);
      }
    };

    const applyPriceFilter = async () => {
      if (propertiesToShow) {
        const { minPrice: validatedMin, maxPrice: validatedMax } = validatePriceRange(minPrice, maxPrice);
        const filteredProps = filterProperties(propertiesToShow, validatedMin, validatedMax);
        setPropertiesToShow(filteredProps);
      }
    };

    if (search) {
      fetchPropertiesBySearch(search);
    } else if (minPrice || maxPrice) {
      applyPriceFilter();
    } else {
      fetchAllProperties();
    }
  }, [search, mode, minPrice, maxPrice]);

  const cityName = search?.split(' ')[1] || "Ghaziabad";

  // For the desktop resizing logic
  const [isResizing, setIsResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setSplitPosition(Math.min(Math.max(newPosition, 30), 70));
  };

  useEffect(() => {
    if (isResizing) {
      const handleMouseUp = () => {
        setIsResizing(false);
        document.body.style.cursor = 'default';
      };

      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);

      return () => {
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isResizing]);

  // For the mobile bottom sheet logic
  const [sheetHeight, setSheetHeight] = useState(300);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const handleSheetMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY || e.touches?.[0]?.clientY;
    startHeight.current = sheetHeight;
    document.addEventListener("mousemove", handleSheetMouseMove);
    document.addEventListener("mouseup", handleSheetMouseUp);
    document.addEventListener("touchmove", handleSheetMouseMove, { passive: false });
    document.addEventListener("touchend", handleSheetMouseUp);
  };

  const handleSheetMouseMove = (e) => {
    if (!isDragging.current) return;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    const diff = startY.current - clientY;
    let newHeight = startHeight.current + diff;
    newHeight = Math.max(150, Math.min(newHeight, window.innerHeight - 100)); 
    setSheetHeight(newHeight);
  };

  const handleSheetMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleSheetMouseMove);
    document.removeEventListener("mouseup", handleSheetMouseUp);
    document.removeEventListener("touchmove", handleSheetMouseMove);
    document.removeEventListener("touchend", handleSheetMouseUp);
  };

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col">
      <OptionsBar mode={mode} />

      {/* Mobile View (Bottom Sheet) - visible on small screens */}
      <div className="block md:hidden relative flex-1">
        <div className="absolute inset-0 z-0">
          <PropertyViewPageMap propertiesToShow={propertiesToShow} />
        </div>

        <div
          className="absolute w-full bg-white rounded-t-3xl z-10 flex flex-col shadow-lg"
          style={{
            bottom: 0,
            height: `${sheetHeight}px`,
            transition: isDragging.current ? "none" : "height 0.2s ease",
            touchAction: "none"
          }}
        >
          <div
            className="mx-auto w-12 h-1 bg-gray-300 rounded-full mt-2 cursor-grab active:cursor-grabbing"
            onMouseDown={handleSheetMouseDown}
            onTouchStart={handleSheetMouseDown}
          ></div>

          <div className="px-4 py-2">
            <div className="text-base font-semibold">
              {propertiesToShow.length}+ houses in {cityName}
            </div>
          </div>

          <div className="h-full overflow-y-auto px-4 pb-4">
            {paginatedProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div className="py-4 text-center text-gray-600">No Properties Found</div>
            )}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm font-medium">{currentPage}/{totalPages}</span>
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View (Original Side-by-Side) - visible on md+ screens */}
      <div className="hidden md:block relative flex-1" onMouseMove={handleMouseMove}>
        <div
          className="px-6 py-3 flex flex-col gap-3 overflow-hidden"
          style={{ width: `${splitPosition}%`, position: 'absolute', left: 0, top: 0, bottom: 0 }}
        >
          <div className="text-[#6B7280] font-light text-sm">
            {propertiesToShow.length} Properties found for{" "}
            <span className="font-bold text-black">
              {mode === "rent" ? "Rent" : "Sale"}
            </span>{" "}
            in <span className="font-bold text-black">
              {cityName}
            </span>
            {(minPrice || maxPrice) && (
              <span className="font-light">
                {" "}with price range{" "}
                {minPrice && <span className="font-bold text-black">₹{Number(minPrice).toLocaleString()}</span>}
                {minPrice && maxPrice && " - "}
                {maxPrice && <span className="font-bold text-black">₹{Number(maxPrice).toLocaleString()}</span>}
              </span>
            )}
          </div>
          <div className="w-full h-[1px] bg-[#d6d9df]" />
          <div className="h-[calc(100vh-200px)] overflow-y-auto">
            {paginatedProperties.length > 0 ? (
              <div className="grid grid-cols-2 gap-9 py-3">
                {paginatedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <div>No Properties Found</div>
            )}
            <div className="flex justify-center items-center mt-4 space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm font-medium">{currentPage}/{totalPages}</span>
              <button
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div
          className="hidden md:block w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize active:bg-gray-400 transition-colors absolute top-0 bottom-0"
          style={{ left: `${splitPosition}%` }}
          onMouseDown={handleMouseDown}
        />

        <div className="absolute right-0 top-0 bottom-0" style={{ width: `${100 - splitPosition}%` }}>
          <PropertyViewPageMap propertiesToShow={propertiesToShow} />
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
