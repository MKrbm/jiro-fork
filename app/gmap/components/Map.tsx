"use client"
import React, { useState } from 'react';
import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';

import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

if (!API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set");
}

export type AutocompleteMode = { id: string; label: string };

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 35.6764,
    lng: 139.65,
};

const MapComponent = () => {

    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                style={containerStyle}
                defaultZoom={10}
                defaultCenter={center}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />

            <CustomMapControl
                controlPosition={ControlPosition.TOP}
                onPlaceSelect={setSelectedPlace}
            />

            {/* <ControlPanel
                autocompleteModes={autocompleteModes}
                selectedAutocompleteMode={selectedAutocompleteMode}
                onAutocompleteModeChange={setSelectedAutocompleteMode}
            /> */}

            <MapHandler place={selectedPlace} />
        </APIProvider>
    );
};

export default MapComponent;