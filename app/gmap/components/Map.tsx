"use client"
import React, { useState } from 'react';
import { APIProvider, ControlPosition, Map } from '@vis.gl/react-google-maps';

import ControlPanel from './control-panel';
import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';

const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

if (!API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set");
}

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
    { id: 'classic', label: 'Google Autocomplete Widget' },
    { id: 'custom', label: 'Custom Build' },
    { id: 'custom-hybrid', label: 'Custom w/ Select Widget' }
];

const containerStyle = {
    width: '100vw',
    height: '100vh',
};

const center = {
    lat: 34.7293466708865,
    lng: 135.49939605607292,
};

const MapComponent = () => {
    const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
        useState<AutocompleteMode>(autocompleteModes[0]);

    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);

    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                style={containerStyle}
                defaultZoom={3}
                defaultCenter={{ lat: 22.54992, lng: 0 }}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />

            <CustomMapControl
                controlPosition={ControlPosition.TOP}
                selectedAutocompleteMode={selectedAutocompleteMode}
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