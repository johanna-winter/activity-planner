import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ActivityMap({ lat, lng }) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  return (
        <div
          style={{
            height: "150px",
            width: "300px",
            overflow: "hidden",
            borderRadius: "8px",
            border: "2px dashed #ccc",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <MapContainer
            center={[lat, lng]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} />

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={icon}>
          <Popup>Activity location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
