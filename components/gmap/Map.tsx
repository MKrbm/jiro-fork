"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ControlPosition, useMap } from '@vis.gl/react-google-maps';
import { Map } from '@vis.gl/react-google-maps';
import { CustomMapControl } from './map-control';
import MapHandler from './map-handler';
import CustomPin, { CustomPinRef } from './marker';
import { MapDetails, extractMapDetails, Location } from './types/Camera';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

// const interval = 100;

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

const MapComponent = ({ initialMapDetails, location }: { initialMapDetails: MapDetails, location: Location | null }) => {
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
    // var service = new places.PlacesService(gmap);
    // console.log("service", service);

    useEffect(() => {
        if (!places || !location) {
            return;
        };
        const request : google.maps.places.FindPlaceFromQueryRequest = {
            fields: ['ALL'],
            query: location,
            locationBias: {
                lat: 35.6852,
                lng: 139.7528,
            },
        };
        var service = new places.PlacesService(gmap);
        const callback1 = (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
            console.log("results", results);
            console.log("status", status);
            setSelectedPlace(results[0]);
        }
        service.findPlaceFromQuery(request, callback1);
    }, [places]);


    useEffect(() => {
        console.log("places", places);
        console.log("inputRef", inputRef);
        if (!places || !inputRef.current) return;

        const options = {
            fields: ['address_components'], 
            language: ['en'], 
            types: ["(cities)"], 
            componentRestrictions: {
                country: ['JP'],
            }
        };
        console.log(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    const center: google.maps.LatLngLiteral = {
        lat: initialMapDetails.center_lat,
        lng: initialMapDetails.center_lng,
    };


    useEffect(() => {
        console.log("scale", scale);
        setCustomPinData({
            scale: scale,
            mapDetails: cameraData
        });
    }, [scale]);

    // const handleCameraChange = useCallback(debounce((e: any) => {
    //     console.log("handleCameraChange", e);
    //     setCameraData(extractMapDetails(e.detail));
    //     setScale(e.detail.zoom);
    // }, interval), []);

    //! TODO: Currently handleCameraChange track the camera position in real time and when onDragend is called, it will update the mapDetails and scale
    // However, it is not efficient (questionable) if CameraData always update when the camera is moving.
    // Ideally the CameraData only update when onDragend is called or scale changes.
    // Also, How to make sure that scale only update when finish scrolling? Now, it will update as soon as one starts scrolling.
    const handleCameraChange = (e: any) => {
        setCameraData(extractMapDetails(e.detail));
        if (scale !== e.detail.zoom) {
            setScale(e.detail.zoom);
        }
    }


    return (
			<>
            <Map
                onCameraChanged={handleCameraChange}
                mapId={'c0d95ce429ccf25b'} // You can customize the map style by using the mapId.  
                style={containerStyle}
                defaultZoom={10}
                // defaultCenter={center}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                clickableIcons={false}
                onClick={(e) => console.log("onClick", e.detail.latLng)}
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
                    background={'#ff2222'}
                    hoveredColor={'#1ea11e'}
                    glyphColor={'#fff'}
                    scale={customPinData.scale}
                    mapDetails={customPinData.mapDetails}
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
