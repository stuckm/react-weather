import React from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  CircleMarker,
  Tooltip,
  LayersControl
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function SetViewOnClick({ coords }) {
  const map = useMap();
  map.setView(coords, map.getZoom());
  return null;
}

function Map({ coords }) {
  return (
    <MapContainer
      classsName="map"
      center={coords}
      zoom={9}
      scrollWheelZoom={false}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Standard">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Black & White">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satelite">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay name="Marker with popup">
          <CircleMarker
            center={coords}
            pathOptions={{ color: "red" }}
            radius={20}
          >
            <Tooltip>Tooltip for CircleMarker</Tooltip>
          </CircleMarker>
          <SetViewOnClick coords={coords} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Precipitation" checked>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=eca311ff23cf5f22c22f3a925f51bd5f"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Clouds">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=eca311ff23cf5f22c22f3a925f51bd5f"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Temp">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=eca311ff23cf5f22c22f3a925f51bd5f"
          />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="wind">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=eca311ff23cf5f22c22f3a925f51bd5f"
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default Map;
