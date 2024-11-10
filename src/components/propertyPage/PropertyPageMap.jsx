import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const PropertyPageMap = ({ coordinates }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Validate coordinates
    if (!coordinates?.latitude || !coordinates?.longitude) {
      console.warn('Invalid coordinates provided to PropertyPageMap');
      return;
    }

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 9
    });

    // Save map instance
    mapRef.current = map;

    // Add marker
    const marker = new mapboxgl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map);

    // Save marker instance
    markerRef.current = marker;

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [coordinates?.latitude, coordinates?.longitude]);

  // Update marker position when coordinates change
  useEffect(() => {
    if (markerRef.current && coordinates?.latitude && coordinates?.longitude) {
      markerRef.current.setLngLat([coordinates.longitude, coordinates.latitude]);
    }
    
    if (mapRef.current && coordinates?.latitude && coordinates?.longitude) {
      mapRef.current.flyTo({
        center: [coordinates.longitude, coordinates.latitude],
        zoom: 9
      });
    }
  }, [coordinates?.latitude, coordinates?.longitude]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full min-h-[400px]"
    />
  );
};

export default PropertyPageMap;