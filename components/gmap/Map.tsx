"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ControlPosition, useMap } from '@vis.gl/react-google-maps';
import { Map } from '@vis.gl/react-google-maps';
import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';
import CustomPin, { CustomPinRef } from './marker';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

// const interval = 100;
import { MapDetails, extractMapDetails, pageFrom, Location } from './types/Camera';
import { AnyARecord } from 'dns';

export type AutocompleteMode = { id: string; label: string };

const containerStyle: React.CSSProperties = {
    width: '100%',
    height: 'calc(100vh - 64px)',
};


// function debounce(func: any, delay: number) {
//     let timerId: NodeJS.Timeout;
//     return (...args: any) => {
//         clearTimeout(timerId);
//         timerId = setTimeout(() => {
//             func(...args);
//         }, delay);
//     };
// }

const MapComponent = ({ initialMapDetails, location, pageFrom }: { initialMapDetails: MapDetails, location: Location | null, pageFrom: pageFrom }) => {
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
    const [cameraData, setCameraData] = useState<MapDetails>(initialMapDetails); // State to store camera data
    const [scale, setScale] = useState<number>(0);
    const customPinRef = useRef<CustomPinRef>(null);
    const [customPinData, setCustomPinData] = useState({
        scale: 0,
        mapDetails: initialMapDetails
    });
    const places = useMapsLibrary('places');
    const gmap = useMap();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isServiceReady, setIsServiceReady] = useState(false); // State to track if PlacesService is ready

    useEffect(() => {
        if (!places || !location || !gmap) {
            return;
        };
        const request: google.maps.places.FindPlaceFromQueryRequest = {
            fields: ['ALL'],
            query: location,
            locationBias: {
                lat: 35.6852,
                lng: 139.7528,
            },
        };
        var service = new places.PlacesService(gmap);
        const callback1 = (a: google.maps.places.PlaceResult[] | null, b: google.maps.places.PlacesServiceStatus) => {
            if (a && a.length > 0) {
                console.log("place res : ", a[0]);
                setSelectedPlace(a[0]);
            }
            setIsServiceReady(true); // Set service ready state to true after successful service creation
        }
        service.findPlaceFromQuery(request, callback1);
    }, [places, location, gmap]);

    useEffect(() => {
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['address_components'],
            language: ['en'],
            types: ["(cities)"],
            componentRestrictions: {
                country: ['JP'],
            }
        };
        console.log("autocomplete res : ", new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        setCustomPinData({
            scale: scale,
            mapDetails: cameraData
        });
    }, [scale]);

    const handleCameraChange = (e: any) => {
        if (isServiceReady) {
            setCameraData(extractMapDetails(e.detail));
            if (scale !== e.detail.zoom) {
                setScale(e.detail.zoom);
            }
        }
    }

    // Render the Map component only if isServiceReady is true
    return (
        <>
            <Map
                onCameraChanged={handleCameraChange}
                mapId={'c0d95ce429ccf25b'} // You can customize the map style by using the mapId.  
                style={containerStyle}
                defaultZoom={10}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                clickableIcons={false}
                onDragend={() => setCustomPinData({
                    scale: scale,
                    mapDetails: cameraData
                })}
                onBoundsChanged={(e) => {
                    if (customPinRef.current) {
                        customPinRef.current.handleClickOutside();
                    }
                }}
            >
                <CustomPin
                    ref={customPinRef}
                    pageFrom={pageFrom}
                    scale={scale}
                    mapDetails={cameraData}
                />
            </Map>
            <CustomMapControl
                controlPosition={ControlPosition.TOP}
                onPlaceSelect={setSelectedPlace}
            />
            <MapHandler place={selectedPlace} />
        </>
    );
};

export default MapComponent;// 
