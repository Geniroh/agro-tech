// import React from "react";

// export const ChloropethMap = () => {
//   return <div>ChloropethMap</div>;
// };

// app/page.tsx or pages/index.tsx depending on your Next.js configuration

// "use client";
// import { LatLngExpression } from "leaflet";
// import React from "react";
// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { AfricaData } from "@/data/africageodata"; // Adjust the import path as needed
// import L from "leaflet"; // Adjust the import path as needed

// const getColor = (density: number) => {
//   return density > 1000
//     ? "#800026"
//     : density > 500
//     ? "#BD0026"
//     : density > 200
//     ? "#E31A1C"
//     : density > 100
//     ? "#FC4E2A"
//     : density > 50
//     ? "#FD8D3C"
//     : density > 20
//     ? "#FEB24C"
//     : density > 10
//     ? "#FED976"
//     : "#FFEDA0";
// };

// const style = (feature: any) => {
//   // Unique color for Nigeria
//   const uniqueColor = "#32CD32"; // Example: LimeGreen color
//   if (feature.properties.name === "Nigeria") {
//     return {
//       fillColor: uniqueColor,
//       weight: 2,
//       opacity: 1,
//       color: "white",
//       dashArray: "3",
//       fillOpacity: 0.7,
//     };
//   }

//   return {
//     fillColor: getColor(feature.properties.density || 0),
//     weight: 2,
//     opacity: 1,
//     color: "white",
//     dashArray: "3",
//     fillOpacity: 0.7,
//   };
// };

// const onEachFeature = (feature: any, layer: any) => {
//   layer.on({
//     mouseover: (e: any) => {
//       const target = e.target;
//       target.setStyle({
//         weight: 5,
//         color: "#666",
//         dashArray: "",
//         fillOpacity: 0.7,
//       });
//       if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         target.bringToFront();
//       }
//     },
//     mouseout: (e: any) => {
//       const target = e.target;
//       target.setStyle(style(target.feature));
//     },
//     click: (e: any) => {
//       e.target._map.fitBounds(e.target.getBounds());
//     },
//   });
// };

// const MapPage: React.FC = () => {
//   const center: LatLngExpression = [4.830790114192319, 6.972558268766339];

//   return (
//     <div className="w-screen h-screen border border-red-700">
//       <MapContainer
//         center={center}
//         zoom={4}
//         style={{ height: "100vh", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//         ></TileLayer>
//         <GeoJSON
//           data={AfricaData}
//           style={style}
//           onEachFeature={onEachFeature}
//         />
//       </MapContainer>
//     </div>
//   );
// };

// export default MapPage;

// 10.100919031416632, 8.077777040117438

// app/page.tsx or pages/index.tsx depending on your Next.js configuration

"use client";
import { LatLngExpression, LatLngTuple } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AfricaData } from "@/data/africageodata"; // Adjust the import path as needed
import L from "leaflet"; // Adjust the import path as needed

// Function to get color based on density
const getColor = (density: number) => {
  return density > 1000
    ? "#800026"
    : density > 500
    ? "#BD0026"
    : density > 200
    ? "#E31A1C"
    : density > 100
    ? "#FC4E2A"
    : density > 50
    ? "#FD8D3C"
    : density > 20
    ? "#FEB24C"
    : density > 10
    ? "#FED976"
    : "#FFEDA0";
};

// Function to return the style for each feature
const style = (feature: any) => {
  const uniqueColor =
    feature.properties.name === "Nigeria"
      ? "#9430e3"
      : getColor(feature.properties.density || 0);
  return {
    fillColor: uniqueColor,
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
    zoom: 2,
  };
};

// Function to handle events on each feature
const onEachFeature = (feature: any, layer: any) => {
  layer.on({
    mouseover: (e: any) => {
      const target = e.target;
      target.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        target.bringToFront();
      }
    },
    mouseout: (e: any) => {
      const target = e.target;
      target.setStyle(style(target.feature));
    },
    click: (e: any) => {
      e.target._map.fitBounds(e.target.getBounds());
    },
  });
};

export const ChloropethMap: React.FC = () => {
  const center: LatLngExpression = [10.100919031416632, 8.077777040117438];

  return (
    // <div className="border border-red-700">
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <GeoJSON data={AfricaData} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
    // </div>
  );
};
