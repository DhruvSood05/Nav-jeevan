"use client";
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

interface LoadObject {
  map: boolean;
  layer?: string;
  version?: string;
  libraries?: string[];
  plugins?: string[];
}

const TrafficMap: React.FC = () => {
  const mapRef = useRef<MapplsMap | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  const loadObject: LoadObject = {
    map: true,
    layer: "raster", // Optional Default Vector
    version: "3.0", // Optional, other version 3.5 also available with CSP headers
    // libraries: ["polydraw"], // Optional for Polydraw and airspaceLayers
    // plugins: ["direction"], // Optional for All the plugins
  };

  useEffect(() => {
    mapplsClassObject.initialize(
      "e3dd9e252bc4117783dd1ab6a271181e",
      loadObject,
      () => {
        const newMap = mapplsClassObject.Map({
          id: "map",
          properties: {
            center: [28.633, 77.2194],
            zoom: 4,
          },
        });

        newMap.on("load", () => {
          setIsMapLoaded(true);
        });

        mapRef.current = newMap;
      }
    );

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "99vh", display: "inline-block" }}
    >
      {isMapLoaded.toString()}
    </div>
  );
};

export default TrafficMap;
