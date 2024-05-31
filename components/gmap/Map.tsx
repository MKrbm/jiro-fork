"use client"
import React, { useState, useRef, useCallback } from 'react';
import {
    APIProvider,
    ControlPosition,
    AdvancedMarker,
    InfoWindow,
    Marker,
    Pin
} from '@vis.gl/react-google-maps';
import { Map } from '@vis.gl/react-google-maps';

import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';
import CustomPin from './marker';

import { MapDetails, extractMapDetails } from './types/Camera';
import { AnyARecord } from 'dns';

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

const interval = 200;

function debounce(func: any, delay: number) {
    let timerId: NodeJS.Timeout;
    return (...args: any) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
// Dynamically import the Map component

// Create a debounced function that updates camera data

const initialMapDetails: MapDetails = {
    center_lat: center.lat,
    center_lng: center.lng,
    width: 0.02,
    height: 0.02,
};

const MapComponent = () => {
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [cameraData, setCameraData] = useState<MapDetails>(initialMapDetails); // State to store camera data
    const [border, setBorder] = useState<any>({west: 0, south: 0, east: 0, north: 0});
    console.log("border", border);

    const handleCameraChange = useCallback(debounce((e: any) => {
        setCameraData(extractMapDetails(e));
        setBorder(e.detail.bounds);
    }, interval), []);


    const markerPosition1 = {
        lat: border.south,
        lng: border.west,
    };

    const markerPosition2 = {
        lat: border.north,
        lng: border.east 
    };

    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                onCameraChanged={handleCameraChange}
                mapId={'c0d95ce429ccf25b'} // You can customize the map style by using the mapId.  
                style={containerStyle}
                defaultZoom={10}
                defaultCenter={center}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onClick={(e) => console.log(e.detail.latLng)}
            >
                <Marker
                    position={markerPosition2}
                    clickable={true}
                    onClick={() => alert('marker was clicked!')}
                    title={'clickable google.maps.Marker'}
                />
                <Marker
                    position={markerPosition1}
                    clickable={true}
                    onClick={() => alert('marker was clicked!')}
                    title={'clickable google.maps.Marker'}
                />
                <CustomPin
                    background={'#ff2222'}
                    borderColor={'#a11e1e'}
                    glyphColor={'#0bb129'} // black color
                    scale={1.2}
                    mapDetails={cameraData}
                />
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