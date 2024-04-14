"use client"
import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 34.7293466708865,
    lng: 135.49939605607292,
};

const MapComponent = () => (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
            style={containerStyle}
            defaultCenter={center}
            defaultZoom={13}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
        />
    </APIProvider>
);

export default MapComponent;