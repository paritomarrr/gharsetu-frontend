import React, { useRef, useState, useEffect } from "react";
import "./TopAreas.css"; // Import custom CSS for scrollbar hiding

const TopAreas = () => {
  const areas = [
    { name: "Ghaziabad", properties: "100+", image: "/ghaziabad.jpg" },
    { name: "Noida", properties: "50+", image: "/noida.png" },
    { name: "Delhi / NCR", properties: "200+", image: "/delhi.jpg" },
    { name: "Gurgaon", properties: "150+", image: "/gurgaon.avif" },
  ];

  const isCentered = areas.length <= 4;

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowsVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateArrowsVisibility();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", updateArrowsVisibility);
      window.addEventListener("resize", updateArrowsVisibility);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", updateArrowsVisibility);
      }
      window.removeEventListener("resize", updateArrowsVisibility);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-7">
      <h1 className="font-bold text-xl sm:text-2xl text-[#222]">Explore Top Areas</h1>
      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg z-10"
          >
            ◀
          </button>
        )}
        <div
          ref={scrollContainerRef}
          className={`flex gap-6 overflow-x-auto scrollbar-hide no-scrollbar ${isCentered ? "justify-center" : ""}`}
        >
          {areas.map((area) => (
            <div
              key={area.name}
              className="flex min-w-[300px] flex-shrink-0 items-center gap-4 rounded-lg shadow-lg bg-white p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={area.image}
                alt={area.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-lg text-[#222]">{area.name}</h2>
                <p className="text-sm text-gray-600">{area.properties} Properties</p>
              </div>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:shadow-lg z-10"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default TopAreas;