import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MyComponent() {
    const map = useMap();
    map.addEventListener("click", (e) => {
        console.log(e.latlng.toString());
    })
    return null;
}

export const StoreMap = () => {
    const position = [4.583419189886751, -74.16127145290376];

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
            <TileLayer
                attribution={`&copy; <a href="${import.meta.env.VITE_APP_DOMAIN}">AC Computers</a>`}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Ubicación de AC Computers
                </Popup>
            </Marker>
            <MyComponent />
        </MapContainer>
    );
};
 