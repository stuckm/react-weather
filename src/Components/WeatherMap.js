import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = ({ coord }) => {
  return coord ? (
    <MapContainer
      style={{ height: "500px" }}
      center={coord}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  ) : null;
};
export default WeatherMap;
