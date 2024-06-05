"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    width: '100%',
    height: 'calc(100vh - 32px)',
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

// Function to convert degrees to radians
const toRadians = (degrees: number) => {
	return degrees * (Math.PI / 180);
};

// Function to calculate distance between two longitude points at a given latitude
const calculateHorizontalDistance = (lat: number, lon1: number, lon2: number) => {
	const R = 6371000; // Radius of the Earth in meters
	const dLon = toRadians(lon2 - lon1);
	const avgLat = toRadians(lat);

	const x = dLon * Math.cos(avgLat);
	const distance = R * x;

	return Math.abs(distance);
};

const MapComponent = (initialMapDetails: MapDetails) => {
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [cameraData, setCameraData] = useState<MapDetails>(initialMapDetails); // State to store camera data
    const [border, setBorder] = useState<any>({west: 0, south: 0, east: 0, north: 0});
    const [scale, setScale] = useState<number>(0);

    useEffect(() => {
		const { west, east, north, south } = border;
		// Average latitude for the horizontal distance calculation
		const avgLat = (north + south) / 2;
		const horizontalDistance = calculateHorizontalDistance(avgLat, west, east);
		setScale(horizontalDistance);
	}, [border]);

    // console.log("border", border);

    const handleCameraChange = useCallback(debounce((e: any) => {
        setCameraData(extractMapDetails(e));
        setBorder(e.detail.bounds);
    }, interval), []);

    const center: google.maps.LatLngLiteral = {
        lat: initialMapDetails.center_lat,
        lng: initialMapDetails.center_lng,
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
                <CustomPin
                    background={'#ff2222'}
                    hoveredColor={'#1ea11e'}
                    glyphColor={'#fff'} // black color
                    scale={scale}
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