import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import martelocalizacao from '../../utils/images/martlocalizacao.svg';

interface MapsProps {
  latitude: string | undefined;
  longitude: string | undefined;
  lote: string | undefined;
}

export function Maps({ latitude, longitude, lote }: MapsProps) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDAJ40ypx302SUKYMrry1NYS6P3jWAo9P8'
  });

  const position = {
    lat: Number(latitude),
    lng: Number(longitude)
  };
  return (
    <div className="flex flex-1 p-4 border-gray-950 gap-3" style={{ height: '400px' }}>
      {isLoaded && !lote ? (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={position}
          zoom={15}
        >
          <Marker position={position} />
        </GoogleMap>
      ) : (
        <div className="w-full">
          <img
            src={martelocalizacao}
            alt="Planeta"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
