"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
    APIProvider,
    ControlPosition,
    AdvancedMarker,
    InfoWindow,
    Marker,
    Pin
} from '@vis.gl/react-google-maps';

import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

if (!API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set");
}

export type AutocompleteMode = { id: string; label: string };

const containerStyle: React.CSSProperties = {
    width: '100vw',
    height: '100vh',
};

const center: google.maps.LatLngLiteral = {
    lat: 35.6764,
    lng: 139.65,
};

// Dynamically import the Map component
const Map = dynamic(() => import('@vis.gl/react-google-maps').then(mod => mod.Map), { ssr: false });

const MapComponent = () => {
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                mapId={'c0d95ce429ccf25b'} // You can customize the map style by using the mapId.  
                style={containerStyle}
                defaultZoom={10}
                defaultCenter={center}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <Marker
                    position={center}
                    clickable={true}
                    onClick={() => alert('marker was clicked!')}
                    title={'clickable google.maps.Marker'}
                    label={'100'}
                />
                <AdvancedMarker // Must be used with MapId
                    position={{ ...center, lng: center.lng - 0.01 }}
                    title={'AdvancedMarker with customized pin.'}
                    >
                    <Pin
                        background={'#ff2222'}
                        borderColor={'#a11e1e'}
                        glyphColor={'#0bb129'} // black color
                        scale={1.0}
                        >
                        <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '0.7rem' }}>1K</span>
                    </Pin>
                </AdvancedMarker>
            </Map>
            <CustomMapControl
                controlPosition={ControlPosition.TOP}
                onPlaceSelect={setSelectedPlace}
            />

            <MapHandler place={selectedPlace} />
        </APIProvider>
    );
};

export default MapComponent;