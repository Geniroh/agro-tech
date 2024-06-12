"use client";
import React from "react";
import { LatLngExpression, LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AfricaData } from "@/data/africageodata";
import L from "leaflet";
import { FeatureCollection, GeoJsonObject } from "geojson";

const africaData: FeatureCollection = AfricaData as FeatureCollection;

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

const ChloropethMap: React.FC = () => {
  const center: LatLngExpression = [10.100919031416632, 8.077777040117438];

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <GeoJSON data={africaData} style={style} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default ChloropethMap;

// "use client";
// import dynamic from "next/dynamic";
// import React, { useEffect, useState } from "react";
// import { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { AfricaData } from "@/data/africageodata";
// import { FeatureCollection } from "geojson";
// import L from "leaflet";

// const DynamicMapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const DynamicTileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const DynamicGeoJSON = dynamic(
//   () => import("react-leaflet").then((mod) => mod.GeoJSON),
//   { ssr: false }
// );

// const africaData: FeatureCollection = AfricaData as FeatureCollection;

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
//   const uniqueColor =
//     feature.properties.name === "Nigeria"
//       ? "#9430e3"
//       : getColor(feature.properties.density || 0);
//   return {
//     fillColor: uniqueColor,
//     weight: 2,
//     opacity: 1,
//     color: "white",
//     dashArray: "3",
//     fillOpacity: 0.7,
//     zoom: 2,
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

// export const ChloropethMap: React.FC = () => {
//   const center: LatLngExpression = [10.100919031416632, 8.077777040117438];

//   return (
//     <DynamicMapContainer
//       center={center}
//       zoom={4}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <DynamicTileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//       />
//       <DynamicGeoJSON
//         data={africaData}
//         style={style}
//         onEachFeature={onEachFeature}
//       />
//     </DynamicMapContainer>
//   );
// };
