import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import axios from "axios";
import OptionsBar from "../components/propertyViewPage/OptionsBar";
import PropertyViewPageMap from "../components/propertyViewPage/PropertyViewPageMap";
import PropertyCard from "../components/common/PropertyCard";
import Footer from "../components/common/Footer";
import {
  filterProperties,
  validatePriceRange,
} from "../helperFunctions/filterProperties";
import { backend_url } from "../config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PropertyView = () => {
  const { mode } = useParams();
  const [propertiesToShow, setPropertiesToShow] = useState([]);
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const propertyListRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const fetchPropertiesBySearch = async (searchTerms) => {
      const searchParts = searchTerms.split(",");
      const locality = searchParts[0]?.trim() || "";
      const city = searchParts[1]?.trim() || "";
      const state = searchParts[2]?.trim() || "";
  
      try {
        const res = await axios.post(
          `${backend_url}/api/v1/properties/filteredProperties`,
          {
            locality,
            city,
            state,
            mode,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
          }
        );
        setPropertiesToShow(res.data.properties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties by search:", error);
        setLoading(false);
      }
    };

    const fetchAllProperties = async () => {
      try {
        const res = await axios.post(
          `${backend_url}/api/v1/properties/getAllProperties`,
          {
            mode,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
          }
        );
        setPropertiesToShow(res.data.properties);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all properties:", error);
        setLoading(false);
      }
    };

    const applyPriceFilter = async () => {
      if (propertiesToShow) {
        const { minPrice: validatedMin, maxPrice: validatedMax } =
          validatePriceRange(minPrice, maxPrice);
        const filteredProps = filterProperties(
          propertiesToShow,
          validatedMin,
          validatedMax
        );
        setPropertiesToShow(filteredProps);
        setLoading(false);
      }
    };

    setLoading(true);
    if (search) {
      fetchPropertiesBySearch(search);
    } else if (minPrice || maxPrice) {
      applyPriceFilter();
    } else {
      fetchAllProperties();
    }
  }, [search, mode, minPrice, maxPrice]);

  useEffect(() => {
    const handleScroll = () => {
      if (propertyListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = propertyListRef.current;
        setIsFooterVisible(scrollTop + clientHeight >= scrollHeight - 10);
      }
    };

    const propertyListElement = propertyListRef.current;
    if (propertyListElement) {
      propertyListElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (propertyListElement) {
        propertyListElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const cityName = search ? search.split(",")[1]?.trim() : "Ghaziabad";

  useEffect(() => {
    document.title = `${
      mode === "rent" ? "Rent" : "Buy"
    } Properties in ${cityName} | Gharsetu`;
  }, [mode, cityName]);

  // For the desktop resizing logic
  const [isResizing, setIsResizing] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.body.style.cursor = "col-resize";
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const container = e.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const newPosition =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setSplitPosition(Math.min(Math.max(newPosition, 30), 70));
  };

  useEffect(() => {
    if (isResizing) {
      const handleMouseUp = () => {
        setIsResizing(false);
        document.body.style.cursor = "default";
      };

      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseUp);

      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mouseleave", handleMouseUp);
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
    document.addEventListener("touchmove", handleSheetMouseMove, {
      passive: false,
    });
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

  const [drawnShape, setDrawnShape] = useState(null);

  const handleDrawCreate = useCallback((features) => {
    if (features.length > 0) {
      const shape = features[0];
      console.log("Drawn shape:", shape); // Debugging log
      setDrawnShape(shape);
    }
  }, []);

  const handleDrawDelete = useCallback(() => {
    setDrawnShape(null); // Clear the drawn shape

    const fetchAllProperties = async () => {
      try {
        const res = await axios.post(
          `${backend_url}/api/v1/properties/getAllProperties`,
          {
            mode,
          }
        );
        setPropertiesToShow(res.data.properties); // Reset property list
      } catch (error) {
        console.error("Error fetching all properties:", error);
      }
    };

    fetchAllProperties(); // Fetch all properties when deleting shape
  }, [mode]);

  useEffect(() => {
    if (drawnShape) {
      const fetchPropertiesByShape = async (shape) => {
        try {
          const res = await axios.post(
            `${backend_url}/api/v1/properties/filteredPropertiesByShape`,
            {
              shape,
              mode,
            }
          );
          setPropertiesToShow(res.data.properties);
        } catch (error) {
          console.error("Error fetching properties by shape:", error);
        }
      };

      fetchPropertiesByShape(drawnShape);
    }
  }, [drawnShape, mode]);

  const handleStateSelect = useCallback(async (stateName) => {
    try {
      const res = await axios.post(`${backend_url}/api/v1/properties/filteredProperties`, {
        state: stateName,
        mode,
      });
      setPropertiesToShow(res.data.properties);
    } catch (error) {
      console.error("Error filtering properties by state:", error);
    }
  }, [mode]);

  return (
    <div className="min-h-[calc(100vh-100px)] flex flex-col">
      <OptionsBar mode={mode} />

      {/* Mobile View (Bottom Sheet) - visible on small screens */}
      <div className="block md:hidden relative flex-1">
        <div className="absolute inset-0 z-0">
          <PropertyViewPageMap
            propertiesToShow={propertiesToShow}
            onDrawCreate={handleDrawCreate}
            onDrawDelete={handleDrawDelete}
            onStateSelect={handleStateSelect} // Pass the handler
          />
        </div>

        <div
          className="absolute w-full bg-white rounded-t-3xl z-10 flex flex-col shadow-lg"
          style={{
            bottom: 0,
            height: `${sheetHeight}px`,
            transition: isDragging.current ? "none" : "height 0.2s ease",
            touchAction: "none",
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

          <div
            className="h-full overflow-y-auto px-4 pb-4"
            ref={propertyListRef}
          >
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} height={200} />
                ))}
              </div>
            ) : propertiesToShow.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3">
                  {propertiesToShow.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <div className="py-4 text-center text-gray-600">
                No Properties Found
              </div>
            )}
            <Footer />
          </div>
        </div>
      </div>

      {/* Desktop View (Original Side-by-Side) - visible on md+ screens */}
      <div
        className="hidden md:block relative flex-1"
        onMouseMove={handleMouseMove}
      >
        <div
          className="px-6 py-3 flex flex-col gap-3 overflow-hidden shadow-lg"
          style={{
            width: `${splitPosition}%`,
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 10,
            boxShadow: "-8px 0 15px -4px rgba(0, 0, 0, 0.4)", 
          }}
        >
          <div className="text-[#6B7280] font-light text-sm">
            {propertiesToShow.length} Properties found for{" "}
            <span className="font-bold text-black">
              {mode === "rent" ? "Rent" : "Sale"}
            </span>{" "}
            in <span className="font-bold text-black">{cityName}</span>
            {(minPrice || maxPrice) && (
              <span className="font-light">
                {" "}
                with price range{" "}
                {minPrice && (
                  <span className="font-bold text-black">
                    ₹{Number(minPrice).toLocaleString()}
                  </span>
                )}
                {minPrice && maxPrice && " - "}
                {maxPrice && (
                  <span className="font-bold text-black">
                    ₹{Number(maxPrice).toLocaleString()}
                  </span>
                )}
              </span>
            )}
          </div>
          <div className="w-full h-[1px] bg-[#d6d9df]" />
          <div
            className="h-[calc(100vh-200px)] overflow-y-auto"
            ref={propertyListRef}
          >
            {loading ? (
              <div className="grid grid-cols-2 gap-9 py-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} height={200} />
                ))}
              </div>
            ) : propertiesToShow.length > 0 ? (
              <>
                <div className="grid grid-cols-2 gap-9 py-3">
                  {propertiesToShow.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <div>No Properties Found</div>
            )}
            <div className="mt-4">
              <Footer />
            </div>
          </div>
        </div>

        <div
          className="hidden md:block w-1 bg-gray-200 hover:bg-gray-300 cursor-col-resize active:bg-gray-400 transition-colors absolute top-0 bottom-0"
          style={{ right: `${splitPosition}%` }}
          onMouseDown={handleMouseDown}
        />

        <div
          className="absolute left-0 top-0 bottom-0"
          style={{ width: `${100 - splitPosition}%` }}
        >
          <PropertyViewPageMap
            propertiesToShow={propertiesToShow}
            onDrawCreate={handleDrawCreate}
            onDrawDelete={handleDrawDelete}
            onStateSelect={handleStateSelect} // Pass the handler
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
