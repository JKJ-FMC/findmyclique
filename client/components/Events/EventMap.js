import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import './EventMap.css';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function EventMap({ latitude, longitude }) {
  const { isLoaded } = useLoadScript({
    googleMapsClientId: 'f76cda687fc472d5',
    googleMapsApiKey: process.env.MAP_API_KEY,
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div>
      <GoogleMap
        zoom={14}
        center={{ lat: latitude, lng: longitude }}
        mapContainerClassName="map-container"
        id="f76cda687fc472d5"
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </GoogleMap>
    </div>
  );
}

export default EventMap;
