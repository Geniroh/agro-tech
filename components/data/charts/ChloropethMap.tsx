"use client";
import React from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { AfricaData } from "@/data/africageodata";
import L from "leaflet";
import { FeatureCollection } from "geojson";

const africaData: FeatureCollection = AfricaData as FeatureCollection;

const countInnovationsPerCountry = (
  innovations: any[],
  countryProperty = "country"
) => {
  const innovationCounts: { [country: string]: number } = {};
  for (const innovation of innovations) {
    const country = innovation[countryProperty];
    if (country) {
      innovationCounts[country] = (innovationCounts[country] || 0) + 1;
    }
  }
  return innovationCounts;
};

// Function to calculate opacity based on innovation count
const getOpacity = (innovationCount: number, maxCount: number) => {
  const baseOpacity = innovationCount / maxCount;
  return Math.min(baseOpacity, 1); // Limit opacity to 1 (fully opaque)
};

const getColor = (innovationCount: number, maxCount: number) => {
  const opacity = getOpacity(innovationCount, maxCount);
  return `rgba(50, 150, 50, ${opacity})`; // Adjust color and adjust opacity based on calculation
};

const style = (
  feature: any,
  innovationCounts: { [key: string]: number },
  maxCount: number
) => {
  const country = feature.properties.name;
  const innovationCount = innovationCounts[country] || 0;

  return {
    fillColor: getColor(innovationCount, maxCount),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
};

const onEachFeature = (
  feature: any,
  layer: any,
  innovationCounts: { [key: string]: number },
  maxCount: number
) => {
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
      target.setStyle(style(target.feature, innovationCounts, maxCount));
    },
    click: (e: any) => {
      e.target._map.fitBounds(e.target.getBounds());
    },
  });

  const country = feature.properties.name;
  const innovationCount = innovationCounts[country] || 0;

  layer.bindTooltip(
    `<div><strong>${country}</strong><br/>Innovations: ${innovationCount}</div>`,
    {
      permanent: false,
      direction: "auto",
    }
  );
};

const ChloropethMap: React.FC<{ innovations: any[] }> = ({ innovations }) => {
  const center: LatLngExpression = [10.100919031416632, 8.077777040117438];
  const innovationCounts = countInnovationsPerCountry(innovations);
  const maxCount = Math.max(...Object.values(innovationCounts)); // Get the maximum count for opacity calculation

  return (
    <MapContainer
      center={center}
      zoom={4}
      style={{ height: "100%", width: "100%", zIndex: 2 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <GeoJSON
        data={africaData}
        style={(feature) => style(feature, innovationCounts, maxCount)}
        onEachFeature={(feature, layer) =>
          onEachFeature(feature, layer, innovationCounts, maxCount)
        }
      />
    </MapContainer>
  );
};

export default ChloropethMap;
