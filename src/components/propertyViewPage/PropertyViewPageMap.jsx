import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const PropertyViewPageMap = ({ propertiesToShow = [] }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    
    mapboxgl.accessToken = "pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg"

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.279713, 28.639965],
      zoom: 3,
    });
    
    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    // Add markers for properties
    markersRef.current = new mapboxgl.Marker({ draggable: true })
    .setLngLat([77.279713, 28.639965])
    .setPopup(new mapboxgl.Popup().setHTML("<h1>TO be Removed baad me</h1>"))
    .addTo(mapRef.current);


    propertiesToShow.forEach((property) => {
      try {
        const { coordinates } = property;

        console.log('coordinates', coordinates)
        
        if (!coordinates?.latitude || !coordinates?.longitude) {
          console.warn(`Invalid coordinates for property:`, property);
          return;
        }

        // Create marker element
        const el = document.createElement("div");
        el.className = "marker";
        
        // Style the marker
        Object.assign(el.style, {
          backgroundColor: "#FF0000",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: "2px solid white",
          boxShadow: "0 0 4px rgba(0,0,0,0.3)",
          cursor: "pointer"
        });

        // Create and add the marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([coordinates.latitude, coordinates.longitude])
          .addTo(map);

        // Add popup with property info
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <strong> Asked price ${property.askedPrice || 'Property'}</strong>`);

        marker.setPopup(popup);

        // Store marker reference for cleanup
        markersRef.current.push(marker);
      } catch (error) {
        console.error(`Error adding marker for property:`, error);
      }
    });

    if (markersRef.current.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      propertiesToShow.forEach((property) => {
        if (property?.coordinates?.latitude && property?.coordinates?.longitude) {
          bounds.extend([property.coordinates.longitude, property.coordinates.latitude]);
        }
      });
      map.fitBounds(bounds, { padding: 50 });
    }

    return () => {
      // markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [propertiesToShow]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        height: "100%", 
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden"
      }} 
    />
  );
};

export default PropertyViewPageMap;