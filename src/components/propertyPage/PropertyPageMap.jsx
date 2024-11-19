import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyPageMap = ({
  coordinates,
  mapboxToken = "pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg",
  initialZoom = 17,
  style = "mapbox://styles/mapbox/streets-v12"
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  // Initialize map
  useEffect(() => {
    if (!coordinates?.latitude || !coordinates?.longitude) {
      console.warn('Invalid coordinates provided to PropertyPageMap');
      return;
    }

    if (!mapboxToken) {
      console.error('Mapbox access token is required');
      return;
    }

    mapboxgl.accessToken = mapboxToken;

    try {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style,
        center: [coordinates.longitude, coordinates.latitude],
        zoom: initialZoom,
        antialias: true,
        pitch: 45,
      });

      mapRef.current = map;

      // Add marker
      const marker = new mapboxgl.Marker({
        color: "#FF0000",
        draggable: false
      })
        .setLngLat([coordinates.longitude, coordinates.latitude])
        .addTo(map);

      markerRef.current = marker;

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('load', () => {
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
          (layer) => layer.type === 'symbol' && layer.layout['text-field']
        )?.id;

        if (labelLayerId) {
          map.addLayer(
            {
              id: 'add-3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 15,
              paint: {
                'fill-extrusion-color': '#aaa',
                'fill-extrusion-height': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'height']
                ],
                'fill-extrusion-base': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  15,
                  0,
                  15.05,
                  ['get', 'min_height']
                ],
                'fill-extrusion-opacity': 0.6
              }
            },
            labelLayerId
          );
        }
      });

      // Error handling
      map.on('error', (e) => {
        console.error('Mapbox error:', e);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      markerRef.current?.remove();
      mapRef.current?.remove();
    };
  }, [coordinates?.latitude, coordinates?.longitude, style, initialZoom, mapboxToken]);

  useEffect(() => {
    if (!coordinates?.latitude || !coordinates?.longitude) return;

    markerRef.current?.setLngLat([coordinates.longitude, coordinates.latitude]);

    mapRef.current?.flyTo({
      center: [coordinates.longitude, coordinates.latitude],
      zoom: initialZoom,
      duration: 2000,
      essential: true
    });
  }, [coordinates?.latitude, coordinates?.longitude, initialZoom]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
        aria-label="Map showing property location"
        role="region"
      />
    </div>
  );
};

export default PropertyPageMap;