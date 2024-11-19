import { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken="pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg"

// Ensure access token is provided
if (!mapboxgl.accessToken) {
  throw new Error("Mapbox access token is required");
}

const useUserAddress = (options = {}) => {
  const [state, setState] = useState({
    location: null,
    address: null,
    isLoading: true,
    error: null
  });

  // Fetch user's geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: "Geolocation is not supported by your browser"
      }));
      return;
    }

    const getLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            ...options
          });
        });

        setState(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message || "Failed to get location"
        }));
      }
    };

    getLocation();
  }, []);

  // Fetch address when location is available
  useEffect(() => {
    if (!state.location) return;

    const fetchAddress = async () => {
      try {
        const { lat, lng } = state.location;
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}&types=address,place,region,country`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.features?.length) {
          throw new Error("No address found");
        }

        const place = data.features[0];
        const addressComponents = {
          street: place.text || "",
          city: place.context?.find(ctx => ctx.id.includes("place"))?.text || "",
          state: place.context?.find(ctx => ctx.id.includes("region"))?.text || "",
          country: place.context?.find(ctx => ctx.id.includes("country"))?.text || ""
        };

        const formattedAddress = [
          addressComponents.street,
          addressComponents.city,
          addressComponents.state,
          addressComponents.country
        ]
          .filter(Boolean)
          .join(", ");

        setState(prev => ({
          ...prev,
          address: formattedAddress,
          addressComponents,
          isLoading: false,
          error: null
        }));
      } catch (err) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message || "Failed to fetch address"
        }));
      }
    };

    fetchAddress();
  }, [state.location]);

  const refresh = () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState(prev => ({
          ...prev,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      },
      (err) => {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: err.message
        }));
      }
    );
  };

  return {
    ...state,
    refresh
  };
};

export default useUserAddress;