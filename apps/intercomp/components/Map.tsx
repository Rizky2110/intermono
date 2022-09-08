import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import styled from "styled-components";

const defaultContainerStyle = {
  width: "100%",
  height: "200px",
};

const defaultOptions = {
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
};
const center = {
  lat: -3.745,
  lng: -38.523,
};
export type TlatLng = {
  lat: number;
  lng: number;
};
export type MapProps = {
  children?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  options?: google.maps.MapOptions;
  position?: TlatLng;
  zoom?: number;
  onLoad?: (map: google.maps.Map) => void;
};
const EmptyMap = styled.div`
  background-color: ${(props) => props.theme.colors.body2};
  color: ${(props) => props.theme.colors.primary};
  font-size: 1rem;
  position: relative;
  text-align: center;
  b {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Map: React.FC<MapProps> = function Map({
  children,
  containerStyle,
  options,
  position,
  zoom,
  onLoad,
}: MapProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyB3PzXxtw1pdfTTSwLzj0LBbF1a3dTD1jg",
    // libraries: ["visualization"],
  });
  let falseCoordinate = false;
  if (position) {
    if (position.lat === 0 || position.lng === 0) falseCoordinate = true;
  }
  const [map, setMap] = React.useState(null);
  const defaultOnLoad = React.useCallback(() => {}, []);
  const onUnmount = React.useCallback(() => {
    if (map) setMap(null);
  }, [map]);
  if (isLoaded) {
    if (!falseCoordinate) {
      return (
        <GoogleMap
          mapContainerStyle={containerStyle || defaultContainerStyle}
          center={position || center}
          zoom={zoom || 15}
          onLoad={onLoad || defaultOnLoad}
          onUnmount={onUnmount}
          options={options || defaultOptions}
        >
          {React.Children.toArray(children)}
        </GoogleMap>
      );
    }
    return (
      <EmptyMap style={containerStyle}>
        <b>No Coordinates</b>
      </EmptyMap>
    );
  }
  return null;
};
Map.defaultProps = {
  children: null,
  containerStyle: {},
  options: {},
  position: { lat: 0, lng: 0 },
  zoom: 10,
  onLoad: () => {},
};

export default React.memo(Map);
