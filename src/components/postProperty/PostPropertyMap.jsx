import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const PostPropertyMap = ({ setLatitude, setLongitude, latitude, longitude }) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markerRef = useRef();

  // Initial map setup
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude || 77.279713, latitude || 28.639965],
      zoom: 9
    });

    // Initialize a draggable marker and save reference to it
    markerRef.current = new mapboxgl.Marker({ draggable: true })
      .setLngLat([longitude || 77.279713, latitude || 28.639965])
      .addTo(mapRef.current);

    // Log coordinates when marker is dragged
    markerRef.current.on('dragend', () => {
      const lngLat = markerRef.current.getLngLat();
      // Set the latitude and longitude
      setLongitude(lngLat.lng);
      setLatitude(lngLat.lat);
    });

    // Move marker to the clicked location and log new coordinates
    mapRef.current.on('click', (event) => {
      const { lng, lat } = event.lngLat;
      markerRef.current.setLngLat([lng, lat]);
      // Set the latitude and longitude
      setLongitude(lng);
      setLatitude(lat);
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Cleanup on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, []); // Empty dependency array since we handle updates in a separate useEffect

  // Update marker and map center when latitude/longitude props change
  useEffect(() => {
    if (mapRef.current && markerRef.current && latitude && longitude) {
      // Update marker position
      markerRef.current.setLngLat([longitude, latitude]);
      mapRef.current.setZoom(9);
      
      // Update map center
      mapRef.current.setCenter([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return (
    <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }}></div>
  );
};

export default PostPropertyMap;