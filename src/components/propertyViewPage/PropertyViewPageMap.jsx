import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import axios from "axios";
import { Button } from "reactstrap";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const PropertyViewPageMap = ({ propertiesToShow = [], onDrawCreate, onDrawDelete, onStateSelect }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapType, setMapType] = useState("street"); // "street" or "satellite"
  const [activeLayers, setActiveLayers] = useState({
    flood: false,
    fire: false,
    wind: false,
    air: false,
    heat: false,
  });
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const toggleOptions = () => setIsOptionsVisible((prev) => !prev);

  const handleMapTypeChange = (type) => {
    setMapType(type);
    if (mapRef.current) {
      mapRef.current.setStyle(
        type === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : "mapbox://styles/mapbox/streets-v12"
      );
    }
    setIsOptionsVisible(false); // Close options after selection
  };

  const toggleLayer = (layerId) => {
    if (mapRef.current) {
      const isLayerVisible = activeLayers[layerId];
      if (isLayerVisible) {
        mapRef.current.setLayoutProperty(layerId, "visibility", "none");
      } else {
        mapRef.current.setLayoutProperty(layerId, "visibility", "visible");
      }
      setActiveLayers((prev) => ({ ...prev, [layerId]: !isLayerVisible }));
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg";

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapType === "satellite"
        ? "mapbox://styles/mapbox/satellite-streets-v12"
        : "mapbox://styles/mapbox/streets-v12",
      center: [77.279713, 28.639965], // Default to a central location
      zoom: 20,
      pitch: 0,
      bearing: 0,
      maxBounds: [
        [68.1766451354, 6.747139], // Southwest coordinates of India
        [97.4025614766, 35.508700] // Northeast coordinates of India
      ]
    });

    mapRef.current = map;

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add 3D building layer if the style supports it
    map.on("load", () => {
      const layers = map.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      )?.id;

      if (labelLayerId) {
        map.addLayer(
          {
            id: "add-3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 15,
            paint: {
              "fill-extrusion-color": "#aaa",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.6,
            },
          },
          labelLayerId
        );
      }

      // Add climate risk layers
      const climateRiskLayers = [
        {
          id: "flood-risk",
          source: {
            type: "raster",
            tiles: ["https://example.com/flood-risk/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
          paint: {
            "raster-opacity": 0.6,
          },
        },
        {
          id: "fire-risk",
          source: {
            type: "raster",
            tiles: ["https://example.com/fire-risk/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
          paint: {
            "raster-opacity": 0.6,
          },
        },
        {
          id: "wind-risk",
          source: {
            type: "raster",
            tiles: ["https://example.com/wind-risk/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
          paint: {
            "raster-opacity": 0.6,
          },
        },
        {
          id: "air-quality",
          source: {
            type: "raster",
            tiles: ["https://example.com/air-quality/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
          paint: {
            "raster-opacity": 0.6,
          },
        },
        {
          id: "heat-risk",
          source: {
            type: "raster",
            tiles: ["https://example.com/heat-risk/{z}/{x}/{y}.png"],
            tileSize: 256,
          },
          paint: {
            "raster-opacity": 0.6,
          },
        },
      ];

      climateRiskLayers.forEach((layer) => {
        map.addSource(layer.id, layer.source);
        map.addLayer({
          id: layer.id,
          type: "raster",
          source: layer.id,
          paint: layer.paint,
        });
      });
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      userProperties: true,
      styles: [
        // Active (being drawn)
        {
          "id": "gl-draw-polygon-fill",
          "type": "fill",
          "filter": ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          "paint": {
            "fill-color": "#D20C0C",
            "fill-outline-color": "#D20C0C",
            "fill-opacity": 0.1
          }
        },
        {
          "id": "gl-draw-polygon-stroke-active",
          "type": "line",
          "filter": ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#D20C0C",
            "line-dasharray": [0.2, 2],
            "line-width": 2
          }
        },
        // Inactive (already drawn)
        {
          "id": "gl-draw-polygon-fill-inactive",
          "type": "fill",
          "filter": ["all", ["==", "active", "false"], ["==", "$type", "Polygon"]],
          "paint": {
            "fill-color": "#3bb2d0",
            "fill-outline-color": "#3bb2d0",
            "fill-opacity": 0.1
          }
        },
        {
          "id": "gl-draw-polygon-stroke-inactive",
          "type": "line",
          "filter": ["all", ["==", "active", "false"], ["==", "$type", "Polygon"]],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#3bb2d0",
            "line-width": 2
          }
        }
      ]
    });

    map.addControl(draw, 'top-right');

    map.on('draw.create', (e) => onDrawCreate(e.features));
    map.on('draw.delete', onDrawDelete);

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
          {
            params: {
              access_token: mapboxgl.accessToken,
            },
          }
        );

        const features = response.data.features;
        const stateFeature = features.find((feature) =>
          feature.place_type.includes("region")
        );

        if (stateFeature) {
          const stateName = stateFeature.text;

          // Fetch state boundaries
          const boundaryResponse = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${stateName}.json`,
            {
              params: {
                access_token: mapboxgl.accessToken,
                types: "region",
              },
            }
          );

          const boundaryFeature = boundaryResponse.data.features[0];
          if (boundaryFeature && boundaryFeature.bbox) {
            const [minLng, minLat, maxLng, maxLat] = boundaryFeature.bbox;

            // Fit map to the state boundary
            map.fitBounds(
              [
                [minLng, minLat],
                [maxLng, maxLat],
              ],
              { padding: 20 }
            );

            // Prevent property markers from overriding the state boundary zoom
            map.once("moveend", () => {
              console.log("Zoomed to state boundary:", stateName);
            });
          }

          onStateSelect(stateName); // Pass the state name to the callback
        } else {
          console.warn("State not found for the clicked location.");
        }
      } catch (error) {
        console.error("Error fetching state boundaries from Mapbox Geocoding API:", error);
      }
    });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }

      if (mapRef.current) {
        mapRef.current.off('draw.create', onDrawCreate);
        mapRef.current.off('draw.delete', onDrawDelete);
      }
    };
  }, [mapType, onDrawCreate, onDrawDelete, onStateSelect]);

  useEffect(() => {
    if (mapRef.current) {
      // Update the map style when toggling views
      mapRef.current.setStyle(
        mapType === "satellite"
          ? "mapbox://styles/mapbox/satellite-v9"
          : "mapbox://styles/mapbox/streets-v12"
      );

      // Reapply markers and other functionalities after style change
      mapRef.current.once("styledata", () => {
        // Re-add 3D buildings if applicable
        const layers = mapRef.current.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        )?.id;

        if (labelLayerId) {
          mapRef.current.addLayer(
            {
              id: "add-3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 15,
              paint: {
                "fill-extrusion-color": "#aaa",
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "height"],
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.6,
              },
            },
            labelLayerId
          );
        }

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        // Re-add property markers
        propertiesToShow.forEach((property) => {
          const { coordinates } = property;
          if (coordinates?.longitude && coordinates?.latitude) {
            const el = document.createElement("div");
            el.className = "marker";

            const formattedPrice = new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            }).format(property.askedPrice || 0);

            Object.assign(el.style, {
              backgroundColor: "white",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "60px",
              textAlign: "center",
              transition: "all 0.2s ease",
              transform: "scale(1)",
            });

            el.textContent = formattedPrice;

            el.addEventListener("mouseenter", () => {
              el.style.backgroundColor = "#f0f0f0";
            });

            el.addEventListener("mouseleave", () => {
              el.style.backgroundColor = "white";
            });

            const marker = new mapboxgl.Marker(el)
              .setLngLat([coordinates.longitude, coordinates.latitude])
              .addTo(mapRef.current);

            markersRef.current.push(marker);
          }
        });

        // Reapply zoom to property bounds if properties are available
        if (propertiesToShow.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          propertiesToShow.forEach((property) => {
            const { coordinates } = property;
            if (coordinates?.longitude && coordinates?.latitude) {
              bounds.extend([coordinates.longitude, coordinates.latitude]);
            }
          });
          mapRef.current.fitBounds(bounds, { padding: 20 });
        }
      });
    }
  }, [mapType, propertiesToShow]);

  // Ensure property markers do not override state boundary zoom
  useEffect(() => {
    if (propertiesToShow.length > 0 && !mapRef.current.isMoving()) {
      const bounds = new mapboxgl.LngLatBounds();

      propertiesToShow.forEach((property) => {
        const { coordinates } = property;
        if (coordinates?.longitude && coordinates?.latitude) {
          bounds.extend([coordinates.longitude, coordinates.latitude]);
        }
      });

      mapRef.current.fitBounds(bounds, {
        padding: 20,
      });
    }
  }, [propertiesToShow]);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add property markers
    propertiesToShow.forEach((property) => {
      try {
        const { coordinates } = property;

        if (!coordinates?.latitude || !coordinates?.longitude) {
          console.warn("Invalid coordinates for property:", property);
          return;
        }

        // Create marker element
        const el = document.createElement("div");
        el.className = "marker";

        const formattedPrice = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(property.askedPrice || 0);

        Object.assign(el.style, {
          backgroundColor: "white",
          padding: "4px 8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "60px",
          textAlign: "center",
          transition: "all 0.2s ease",
          transform: "scale(1)",
        });

        el.textContent = formattedPrice;

        el.addEventListener("mouseenter", () => {
          el.style.backgroundColor = "#f0f0f0";
        });

        el.addEventListener("mouseleave", () => {
          el.style.backgroundColor = "white";
        });

        const marker = new mapboxgl.Marker(el)
          .setLngLat([coordinates.longitude, coordinates.latitude])
          .addTo(mapRef.current);

        const popup = new mapboxgl.Popup({
          offset: 25,
          maxWidth: "300px",
        }).setHTML(`
          <div 
            style="font-family: system-ui, -apple-system, sans-serif; cursor: pointer;"
            onclick="window.location.href='/property/${property._id}'"
          >
            ${property.images?.[0]?.cloudinaryUrl ? `
              <img 
                src="${property.images[0].cloudinaryUrl}" 
                alt="Property"
                style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;"
              />
            ` : ""}
            <div style="padding: 12px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1a1a1a;">
                ${property.propertySubType} in ${property.address?.locality || ""}
              </h3>
              <div style="font-size: 14px; color: #666; margin-bottom: 4px;">
                ${property.address?.buildingProjectSociety ? 
                  `${property.address.buildingProjectSociety}, ` : ""}
                ${property.address?.locality || ""}, ${property.address?.city || ""}
              </div>
              <div style="font-size: 16px; font-weight: bold; color: #2563eb; margin: 8px 0;">
                ${formattedPrice}
              </div>
            </div>
          </div>
        `);

        marker.setPopup(popup);

        markersRef.current.push(marker);
      } catch (error) {
        console.error("Error adding marker for property:", error);
      }
    });

    // Fit map to the bounding box of all properties only if onStateSelect is not active
    if (propertiesToShow.length > 0 && !mapRef.current.isMoving()) {
      const bounds = new mapboxgl.LngLatBounds();

      propertiesToShow.forEach((property) => {
        const { coordinates } = property;
        if (coordinates?.longitude && coordinates?.latitude) {
          bounds.extend([coordinates.longitude, coordinates.latitude]);
        }
      });

      mapRef.current.fitBounds(bounds, {
        padding: 20,
      });
    }
  }, [propertiesToShow]);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <Button
        onClick={toggleOptions}
        style={{
          position: "absolute",
          bottom: "30px",
          right: "10px",
          zIndex: 2,
          backgroundColor: "white",
          color: "black",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          borderRadius: "4px",
          padding: "8px 12px",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        Map
      </Button>

      {isOptionsVisible && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: "10px",
            zIndex: 3,
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "16px",
            width: "280px",
          }}
        >
          <h5 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>
            Map Options
          </h5>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "14px" }}>
                <input
                  type="radio"
                  name="mapType"
                  value="street"
                  checked={mapType === "street"}
                  onChange={() => handleMapTypeChange("street")}
                  style={{ marginRight: "10px" }}
                />
                Street View
              </label>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer", fontSize: "14px" }}>
                <input
                  type="radio"
                  name="mapType"
                  value="satellite"
                  checked={mapType === "satellite"}
                  onChange={() => handleMapTypeChange("satellite")}
                  style={{ marginRight: "10px" }}
                />
                Satellite View
              </label>
            </div>
          </div>
          <div>
            <h6 style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "bold" }}>Climate Risks</h6>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {["None selected", "Flood", "Fire", "Wind", "Air", "Heat"].map((layer, index) => (
                <label
                  key={layer}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: index === 0 ? "100%" : "45%",
                  }}
                >
                  <input
                    type="radio"
                    name="climateRisk"
                    value={layer.toLowerCase()}
                    checked={activeLayers[layer.toLowerCase()] || (layer === "None selected" && !Object.values(activeLayers).includes(true))}
                    onChange={() => {
                      const updatedLayers = Object.keys(activeLayers).reduce((acc, key) => {
                        acc[key] = layer.toLowerCase() === key;
                        return acc;
                      }, {});
                      setActiveLayers(updatedLayers);
                    }}
                    style={{ marginRight: "10px" }}
                  />
                  {layer}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default PropertyViewPageMap;
