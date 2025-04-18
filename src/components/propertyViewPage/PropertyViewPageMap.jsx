import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import axios from "axios";
import { Button } from "reactstrap";
import { X, ChevronDown, Edit3, Trash2 } from "lucide-react"; // Import icons

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const OPENWEATHER_API_KEY = "cc2e2c1c547da37d8d5763d5e8d4fa29";

const PropertyViewPageMap = ({
  propertiesToShow = [],
  onDrawCreate,
  onDrawDelete,
  onStateSelect,
}) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapType, setMapType] = useState("street");
  const [activeLayers, setActiveLayers] = useState({
    temperature: false,
    precipitation: false,
    clouds: false,
    wind: false,
    pressure: false,
  });
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [shouldZoomOut, setShouldZoomOut] = useState(false);
  const [activeMode, setActiveMode] = useState("stateSelection");
  const [markersLoaded, setMarkersLoaded] = useState(false);

  const isMobile = window.innerWidth <= 768; // Check if the device is mobile

  const toggleOptions = () => setIsOptionsVisible((prev) => !prev);

  const handleMapTypeChange = (type) => {
    setMapType(type);
    if (mapRef.current) {
      const newStyle =
        type === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : "mapbox://styles/mapbox/streets-v12";

      mapRef.current.setStyle(newStyle);
      mapRef.current.once("styledata", () => {
        mapRef.current.fitBounds(
          [
            [68.1766451354, 6.747139], 
            [97.4025614766, 35.5087], 
          ],
          { padding: 20, animate: false }
        );
      });
    }
    setIsOptionsVisible(false); // Close options after selection
  };

  const initializeClimateLayers = (map) => {
    const layerConfig = {
      temperature: {
        source: {
          type: "raster",
          tiles: [
            `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
          ],
          tileSize: 256,
        },
        paint: {
          "raster-opacity": 0.6, // Adjust transparency
        },
      },
      precipitation: {
        source: {
          type: "raster",
          tiles: [
            `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
          ],
          tileSize: 256,
        },
        paint: {
          "raster-opacity": 0.6, // Adjust transparency
        },
      },
      clouds: {
        source: {
          type: "raster",
          tiles: [
            `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
          ],
          tileSize: 256,
        },
        paint: {
          "raster-opacity": 0.6, // Adjust transparency
        },
      },
      wind: {
        source: {
          type: "raster",
          tiles: [
            `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
          ],
          tileSize: 256,
        },
        paint: {
          "raster-opacity": 0.6, // Adjust transparency
        },
      },
      pressure: {
        source: {
          type: "raster",
          tiles: [
            `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OPENWEATHER_API_KEY}`,
          ],
          tileSize: 256,
        },
        paint: {
          "raster-opacity": 0.6, // Adjust transparency
        },
      },
    };

    Object.entries(layerConfig).forEach(([layerId, config]) => {
      if (!map.getSource(layerId)) {
        map.addSource(layerId, config.source);
      }
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "raster",
          source: layerId,
          paint: config.paint,
          layout: { visibility: "none" }, // Initially hidden
        });
      }
    });
  };

  const toggleLayer = (layerId) => {
    if (mapRef.current) {
      const layerMapping = {
        temperature: "temperature",
        precipitation: "precipitation",
        clouds: "clouds",
        wind: "wind",
        pressure: "pressure",
      };

      const mappedLayerId = layerMapping[layerId];
      if (!mappedLayerId) {
        console.warn(`No mapping found for layerId: ${layerId}`);
        return;
      }

      // Hide all layers
      Object.keys(layerMapping).forEach((key) => {
        const layer = layerMapping[key];
        if (mapRef.current.getLayer(layer)) {
          mapRef.current.setLayoutProperty(layer, "visibility", "none");
        }
      });

      // Show the selected layer
      if (mapRef.current.getLayer(mappedLayerId)) {
        mapRef.current.setLayoutProperty(mappedLayerId, "visibility", "visible");
      }

      // Update active layers state
      setActiveLayers((prev) =>
        Object.keys(prev).reduce((acc, key) => {
          acc[key] = key === layerId; // Only the selected layer is active
          return acc;
        }, {})
      );
    }
  };

  const handleRemoveBoundary = () => {
    setSelectedState(null);
    onStateSelect(null);

    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [68.1766451354, 6.747139], 
          [97.4025614766, 35.5087], 
        ],
        { padding: 20, animate: false } 
      );
    }
  };

  const handleModeToggle = () => {
    const newMode = activeMode === "stateSelection" ? "draw" : "stateSelection";
    setActiveMode(newMode);

    if (newMode === "stateSelection") {
        // Reset filtered properties to show all properties
        setSelectedState(null);
        onStateSelect(null);
    }

    if (mapRef.current && mapRef.current.drawControl) {
        const drawControl = mapRef.current.drawControl;

        // Update draw controls without affecting the map's position or bounds
        drawControl.options.controls = newMode === "draw" ? { polygon: true, trash: true } : {};
        mapRef.current.removeControl(drawControl);
        mapRef.current.addControl(drawControl, "bottom-right");
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        mapType === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : "mapbox://styles/mapbox/streets-v12",
      maxBounds: [
        [68.1766451354, 6.747139], 
        [97.4025614766, 35.5087], 
      ],
    });

    mapRef.current = map;

    map.on("load", () => {

      map.fitBounds(
        [
          [68.1766451354, 6.747139],
          [97.4025614766, 35.5087], 
        ],
        { padding: 20, animate: false }
      );
      initializeClimateLayers(map);
    });

    // Custom zoom controls
    const zoomInButton = document.createElement("button");
    zoomInButton.innerHTML = "+";
    Object.assign(zoomInButton.style, {
      backgroundColor: "white",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "50%",
      width: "35px", 
      height: "35px", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px", 
      fontWeight: "bold",
      cursor: "pointer",
      marginBottom: "8px", 
    });
    zoomInButton.onclick = () => map.zoomIn();

    const zoomOutButton = document.createElement("button");
    zoomOutButton.innerHTML = "−";
    Object.assign(zoomOutButton.style, {
      backgroundColor: "white",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "50%",
      width: "35px", 
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px", 
      fontWeight: "bold",
      cursor: "pointer",
    });
    zoomOutButton.onclick = () => map.zoomOut();

    const customControls = document.createElement("div");
    customControls.style.position = "absolute";
    customControls.style.bottom = "40px"; 
    customControls.style.right = "10px";
    customControls.style.display = "flex";
    customControls.style.flexDirection = "column";
    customControls.style.zIndex = "2";

    customControls.appendChild(zoomInButton);
    customControls.appendChild(zoomOutButton);

    map.getContainer().appendChild(customControls);

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {},
      userProperties: true,
      styles: [
        // Active (being drawn)
        {
          id: "gl-draw-polygon-fill",
          type: "fill",
          filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          paint: {
            "fill-color": "#D20C0C",
            "fill-outline-color": "#D20C0C",
            "fill-opacity": 0.1,
          },
        },
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#D20C0C",
            "line-dasharray": [0.2, 2],
            "line-width": 2,
          },
        },
        // Inactive (already drawn)
        {
          id: "gl-draw-polygon-fill-inactive",
          type: "fill",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
          ],
          paint: {
            "fill-color": "#3bb2d0",
            "fill-outline-color": "#3bb2d0",
            "fill-opacity": 0.1,
          },
        },
        {
          id: "gl-draw-polygon-stroke-inactive",
          type: "line",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#3bb2d0",
            "line-width": 2,
          },
        },
      ],
    });

    // Add draw tools to the map
    map.addControl(draw, "bottom-right");
    mapRef.current.drawControl = draw; // Store reference for toggling controls

    map.on("draw.create", (e) => {
      onDrawCreate(e.features);

      if (e.features.length > 0) {
        const feature = e.features[0];
        const geometry = feature.geometry;

        if (geometry.type === "Polygon" && geometry.coordinates.length > 0) {
          const bounds = geometry.coordinates[0].reduce((bounds, coord) => {
            return bounds.extend(coord);
          }, new mapboxgl.LngLatBounds());
          map.fitBounds(bounds, { padding: 20, animate: true });

          // Force map to refresh
          setTimeout(() => {
            map.resize();
          }, 100);
        } else {
          console.warn("Unsupported geometry type or empty coordinates.");
        }
      } else {
        console.warn("No features found in draw event.");
      }
    });

    map.on("draw.delete", onDrawDelete);

    map.on("click", async (e) => {
      if (activeMode === "draw") {
        return;
      }

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
          setSelectedState(stateName);

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

            map.once("moveend", () => {
              console.log("Zoomed to state boundary:", stateName);
            });
          } else {
            console.warn("No bounding box found for the selected state.");
          }

          onStateSelect(stateName); // Pass the state name to the callback
        } else {
          console.warn("State not found for the clicked location.");
        }
      } catch (error) {
        console.error(
          "Error fetching state boundaries from Mapbox Geocoding API:",
          error
        );
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
        mapRef.current.off("draw.create", onDrawCreate);
        mapRef.current.off("draw.delete", onDrawDelete);
      }
    };
  }, [mapType, onDrawCreate, onDrawDelete, onStateSelect, activeMode]);

  useEffect(() => {
    if (mapRef.current && mapRef.current.drawControl) {
      const drawControl = mapRef.current.drawControl;
      if (activeMode === "draw" && isMobile) {
        drawControl.options.controls = { polygon: true, trash: true };
      } else {
        drawControl.options.controls = {};
      }

      mapRef.current.removeControl(drawControl);
      mapRef.current.addControl(drawControl, "bottom-right");
    }
  }, [activeMode, isMobile]);

  const renderDrawTools = () => {
    if (activeMode === "draw") {
      return (
        <div
          style={{
            position: "absolute",
            top: "60px", // Added spacing from map options
            right: "10px",
            zIndex: 3,
            display: "flex",
            flexDirection: "column", // Arrange buttons in a single column
            gap: "8px",
          }}
        >
          <button
            onClick={() => mapRef.current.drawControl.changeMode("draw_polygon")}
            style={{
              margin: "0",
              padding: "8px",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Edit3 size={16} color="#000000" />
          </button>
          <button
            onClick={() => mapRef.current.drawControl.trash()}
            style={{
              margin: "0",
              padding: "8px",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Trash2 size={16} color="#000000" />
          </button>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    if (mapRef.current) {
      const style =
        mapType === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : "mapbox://styles/mapbox/streets-v12";

      mapRef.current.setStyle(style);
      mapRef.current.once("styledata", () => {
        mapRef.current.fitBounds(
          [
            [68.1766451354, 6.747139],
            [97.4025614766, 35.5087],
          ],
          { padding: 20, animate: false }
        );
      });
    }
  }, [mapType]);

  useEffect(() => {
    if (mapRef.current) {
      // Ensure the map's style is loaded before applying changes
      if (mapRef.current.isStyleLoaded()) {
        mapRef.current.setStyle(
          mapType === "satellite"
            ? "mapbox://styles/mapbox/satellite-streets-v12"
            : "mapbox://styles/mapbox/streets-v12"
        );
      } else {
        mapRef.current.once("style.load", () => {
          mapRef.current.setStyle(
            mapType === "satellite"
              ? "mapbox://styles/mapbox/satellite-streets-v12"
              : "mapbox://styles/mapbox/streets-v12"
          );
        });
      }

      // Reapply markers and other functionalities after style change
      mapRef.current.once("styledata", () => {
        // Re-add 3D buildings if applicable
        const layers = mapRef.current.getStyle().layers;
        const labelLayerId = layers?.find(
          (layer) => layer.type === "symbol" && layer.layout["text-field"]
        )?.id;

        if (labelLayerId && !mapRef.current.getLayer("add-3d-buildings")) {
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
      });
    }
  }, [mapType, propertiesToShow]);

  useEffect(() => {
    if (mapRef.current) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (propertiesToShow.length > 0) {
        let loadedMarkers = 0;

        propertiesToShow.forEach((property) => {
          try {
            const { coordinates } = property;

            if (!coordinates?.latitude || !coordinates?.longitude) {
              console.warn("Invalid coordinates for property:", property);
              return;
            }

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

            loadedMarkers += 1;

            if (loadedMarkers === propertiesToShow.length) {
              setMarkersLoaded(true);
            }
          } catch (error) {
            console.error("Error adding marker for property:", error);
          }
        });
      } else {
        setMarkersLoaded(true);
      }
    }
  }, [propertiesToShow, activeMode]);

  useEffect(() => {
    if (markersLoaded && mapRef.current) {
      if (selectedState) {
        console.log("Zooming to state level for:", selectedState);
      }
      setMarkersLoaded(false); // Remove zoom to properties' bounds
    }
  }, [markersLoaded, selectedState]);

  useEffect(() => {
    if (shouldZoomOut && propertiesToShow.length > 0) {
      if (mapRef.current) {
        const bounds = new mapboxgl.LngLatBounds();
        propertiesToShow.forEach((property) => {
          const { coordinates } = property;
          if (coordinates?.longitude && coordinates?.latitude) {
            bounds.extend([coordinates.longitude, coordinates.latitude]);
          }
        });
        mapRef.current.fitBounds(bounds, { padding: 20 });
      }
      setShouldZoomOut(false);
    }
  }, [shouldZoomOut, propertiesToShow]);

  useEffect(() => {
    let timeoutId;

    if (activeMode === "draw") {
      const drawInfoContainer = document.createElement("div");
      drawInfoContainer.id = "draw-info-container";
      Object.assign(drawInfoContainer.style, {
        position: "absolute",
        bottom: "40px",
        left: "15px",
        zIndex: 3,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        borderRadius: "6px",
        padding: "6px 8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontSize: "12px",
        fontWeight: "500",
        color: "#333",
        lineHeight: "1.4",
        fontFamily: "Arial, sans-serif",
      });

      const title = document.createElement("div");
      title.textContent = "Drawing Help";
      Object.assign(title.style, {
        fontSize: "13px", 
        fontWeight: "bold",
        marginBottom: "4px",
        color: "#1d4ed8",
        textAlign: "left",
      });

      const message = document.createElement("div");
      message.innerHTML =
        "<ul style='margin: 0; padding-left: 0; list-style-position: inside;'>" +
        "<li>Click to add a point.</li>" +
        "<li>Double-click to finish.</li>" +
        "</ul>";

      drawInfoContainer.appendChild(title);
      drawInfoContainer.appendChild(message);

      mapRef.current.getContainer().appendChild(drawInfoContainer);

      timeoutId = setTimeout(() => {
        drawInfoContainer.remove();
      }, 5000);
    } else {
      const existingContainer = document.getElementById("draw-info-container");
      if (existingContainer) {
        existingContainer.remove();
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeMode]);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* Selected State Tag */}
      {selectedState && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 3,
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            padding: "8px 12px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: "bold", color: "#333" }}>
            {selectedState}
          </span>
          <button
            onClick={handleRemoveBoundary}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="#2563eb" />
          </button>
        </div>
      )}

      {/* Buttons Container */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 2,
          display: "flex",
          gap: "10px",
        }}
      >
        <Button
          onClick={toggleOptions}
          style={{
            backgroundColor: "white",
            color: "black",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            padding: "8px 12px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Map Options
          <ChevronDown size={16} />
        </Button>

        <Button
          onClick={handleModeToggle}
          style={{
            backgroundColor: activeMode === "draw" ? "#2563eb" : "white",
            color: activeMode === "draw" ? "white" : "black",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "4px",
            padding: "8px 12px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          {activeMode === "draw" ? "Exit" : "Draw"}
        </Button>
      </div>

      {isOptionsVisible && (
        <div
          style={{
            position: "absolute",
            top: "55px",
            right: "60px",
            zIndex: 3,
            backgroundColor: "white",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "0 0 4px 0",
            margin: "0",
            width: "280px",
          }}
        >
          <h5
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "600",
              textAlign: "left",
              color: "#555",
              backgroundColor: "#f8f8f8",
              padding: "8px 12px",
              borderRadius: "6px 6px 0 0",
            }}
          >
            Map Options
          </h5>
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                padding: "8px 12px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
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
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
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
            <h6
              style={{
                margin: "4px 12px",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#555",
                padding: "0",
              }}
            >
              Climate Risks
            </h6>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                padding: "8px 12px",
              }}
            >
              {[
                "None selected",
                "Temperature",
                "Precipitation",
                "Clouds",
                "Wind",
                "Pressure",
              ].map((layer, index) => (
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
                    name="climateLayer"
                    value={layer.toLowerCase()}
                    checked={
                      activeLayers[layer.toLowerCase()] ||
                      (layer === "None selected" &&
                        !Object.values(activeLayers).includes(true))
                    }
                    onChange={() => {
                      if (layer === "None selected") {
                        // Turn off all layers
                        Object.keys(activeLayers).forEach((id) => {
                          mapRef.current.setLayoutProperty(
                            id,
                            "visibility",
                            "none"
                          );
                        });
                        setActiveLayers((prev) =>
                          Object.keys(prev).reduce(
                            (acc, key) => ({ ...acc, [key]: false }),
                            {}
                          )
                        );
                      } else {
                        toggleLayer(layer.toLowerCase());
                      }
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

      {renderDrawTools()}

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
