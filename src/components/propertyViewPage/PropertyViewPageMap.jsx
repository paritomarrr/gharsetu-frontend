import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const PropertyViewPageMap = () => {
  const [latitude, setLatitude] = useState(28.639965);
  const [longitude, setLongitude] = useState(77.279713);
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg";

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.279713, 28.639965],
      zoom: 9,
    });

    // Initialize a draggable marker and save reference to it
    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([77.279713, 28.639965])
      .addTo(mapRef.current);

    // Log coordinates when marker is dragged
    markerRef.current.on("dragend", () => {
      const lngLat = markerRef.current.getLngLat();
      console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
      // Set the latitude and longitude
      setLongitude(lngLat.lng);
      setLatitude(lngLat.lat);
    });

    // Move marker to the clicked location and log new coordinates
    mapRef.current.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      markerRef.current.setLngLat([lng, lat]);
      console.log(`Longitude: ${lng}, Latitude: ${lat}`);
      // Set the latitude and longitude
      setLongitude(lng);
      setLatitude(lat);
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Cleanup on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, [setLatitude, setLongitude]); // Add setLatitude and setLongitude to dependencies

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }}></div>
  );
};

export default PropertyViewPageMap;
