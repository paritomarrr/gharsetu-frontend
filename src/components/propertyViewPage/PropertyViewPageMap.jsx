import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import axios from "axios";
import { Button } from "reactstrap";
import { X, ChevronDown } from "lucide-react";

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

  const toggleOptions = () => setIsOptionsVisible((prev) => !prev);

  const handleMapTypeChange = (type) => {
    setMapType(type);
    if (mapRef.current) {
      // Wait for the map's style to load before setting a new style
      if (mapRef.current.isStyleLoaded()) {
        mapRef.current.setStyle(
          type === "satellite"
            ? "mapbox://styles/mapbox/satellite-streets-v12"
            : "mapbox://styles/mapbox/streets-v12"
        );
      } else {
        mapRef.current.once("style.load", () => {
          mapRef.current.setStyle(
            type === "satellite"
              ? "mapbox://styles/mapbox/satellite-streets-v12"
              : "mapbox://styles/mapbox/streets-v12"
          );
        });
      }
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

    setTimeout(() => {
      setShouldZoomOut(true);
    }, 100);
  };

  const handleModeToggle = () => {
    const newMode = activeMode === "stateSelection" ? "draw" : "stateSelection";
    setActiveMode(newMode);

    if (mapRef.current) {
      mapRef.current.fitBounds(
        [
          [68.1766451354, 6.747139], 
          [97.4025614766, 35.5087],
        ],
        { padding: 20 }
      );
    }
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoicGFyaXRvbWFyciIsImEiOiJjbTJ5Zmw1aXYwMDl3MmxzaG91bWRnNXgxIn0.ukF28kdk13Vf2y1EOKQFWg";

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style:
        mapType === "satellite"
          ? "mapbox://styles/mapbox/satellite-streets-v12"
          : "mapbox://styles/mapbox/streets-v12",
      center: [77.279713, 28.639965], // Default to a central location
      zoom: 20,
      pitch: 0,
      bearing: 0,
      maxBounds: [
        [68.1766451354, 6.747139], // Southwest coordinates of India
        [97.4025614766, 35.5087], // Northeast coordinates of India
      ],
    });

    mapRef.current = map;

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
    customControls.style.bottom = "100px"; 
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

    map.on("load", () => {
      // Initialize climate layers
      initializeClimateLayers(map);

      // Add 3D building layer if the style supports it
      const layers = map.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      )?.id;

      if (labelLayerId && !map.getLayer("add-3d-buildings")) {
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
    });

    map.on("draw.create", (e) => onDrawCreate(e.features));
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
      // Update draw controls based on active mode
      const drawControl = mapRef.current.drawControl;
      if (activeMode === "draw") {
        drawControl.options.controls = { polygon: true, trash: true };
      } else {
        drawControl.options.controls = {};
      }

      // Reinitialize the draw control to apply changes
      mapRef.current.removeControl(drawControl);
      mapRef.current.addControl(drawControl, "bottom-right");
    }
  }, [activeMode]);

  useEffect(() => {
    if (mapRef.current) {
      // Ensure the map's style is loaded before applying changes
      if (mapRef.current.isStyleLoaded()) {
        mapRef.current.setStyle(
          mapType === "satellite"
            ? "mapbox://styles/mapbox/satellite-v9"
            : "mapbox://styles/mapbox/streets-v12"
        );
      } else {
        mapRef.current.once("style.load", () => {
          mapRef.current.setStyle(
            mapType === "satellite"
              ? "mapbox://styles/mapbox/satellite-v9"
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
      } else if (propertiesToShow.length > 0) {
        
        const bounds = new mapboxgl.LngLatBounds();
        propertiesToShow.forEach((property) => {
          const { coordinates } = property;
          if (coordinates?.longitude && coordinates?.latitude) {
            bounds.extend([coordinates.longitude, coordinates.latitude]);
          }
        });
        mapRef.current.fitBounds(bounds, { padding: 20 });
      } else {
       
        mapRef.current.fitBounds(
          [
            [68.1766451354, 6.747139], 
            [97.4025614766, 35.5087], 
          ],
          { padding: 20 }
        );
      }
      setMarkersLoaded(false); 
    }
  }, [markersLoaded, selectedState, propertiesToShow]);

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
          {activeMode === "draw" ? "Exit Draw Mode" : "Enter Draw Mode"}
        </Button>

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
      </div>

      {isOptionsVisible && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
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
