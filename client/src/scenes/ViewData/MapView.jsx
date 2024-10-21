import React from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Tooltip,
  useMap,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ mapData, selectedLocation }) => {
  // Function to move the map to the selected location
  const MoveMapToLocation = ({ location }) => {
    const map = useMap();
    if (location) {
      map.setView(location, 7); // Move the map to the selected location and set zoom level
    }
    return null;
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Default coordinates for India
      zoom={5}
      style={{ height: "600px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Move the map to the selected location */}

      {selectedLocation && <MoveMapToLocation location={selectedLocation} />}

      {/* Loop through the map data and create a circle marker for each coordinate */}
      {mapData?.map((coord, index) => (
        <CircleMarker
          key={index}
          center={coord ?? [0, 0]} // Coordinates of the marker
          pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.8 }}
          radius={6} // Size of the dot
        >
          {/* Show popup only for the selected location */}
          {selectedLocation &&
            selectedLocation?.[0] === coord?.[0] &&
            selectedLocation?.[1] === coord?.[1] && (
              <Popup>
                Location: {coord?.[0]}, {coord?.[1]}
              </Popup>
            )}
          <Tooltip>
            Location: {coord?.[0]}, {coord?.[1]} {coord?.[2] && `(${coord[2]})`}
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default MapView;
