import React, { useEffect, useState } from 'react';
import { Pin, AdvancedMarker } from '@vis.gl/react-google-maps';
import { fetchListings, Listing } from '@/services/listingsApi';
import { MapDetails } from './types/Camera';

interface CustomPinProps {
    background: string;
    borderColor: string;
    glyphColor: string;
    scale: number;
    mapDetails: MapDetails;
}

const CustomPin: React.FC<CustomPinProps> = ({ background, borderColor, glyphColor, scale, mapDetails }) => {
    interface ListingWithRent extends Listing {
        rentfee: number;
    }

    const [listings, setListings] = useState<ListingWithRent[]>([]);

    const fontSize = scale * 0.5;

    useEffect(() => {
        if (mapDetails) {
            fetchListings(
                mapDetails.center_lat,
                mapDetails.center_lng,
                mapDetails.width,
                mapDetails.height,
                true
            ).then((fetchedListings) => {
                const listingsWithRent = fetchedListings.map(listing => ({
                    ...listing,
                    rentfee: listing.rentfee ?? 0 // Ensure rentfee is a number
                }));
                setListings(listingsWithRent);
            }).catch(console.error);
        }
    }, [mapDetails]);

    const component = (
        <>
            {listings.map((listing, index) => {
                const price = `${listing.rentfee / 1000}K¥`;

                return (
                    <AdvancedMarker
                        key={listing.addressid}
                        position={{ lat: listing.latitude, lng: listing.longitude }}
                    >    
                        <Pin
                            key={listing.addressid}
                            background={background}
                            borderColor={borderColor}
                            glyphColor={glyphColor}
                            scale={scale}
                        >
                            <span style={{ color: '#000000', fontWeight: 'bold', fontSize: '1rem' }}>{index}</span>
                        </Pin>
                    </AdvancedMarker>
                );
            })}
        </>
    );
            
    console.log("component", component);

    return component;
};

export default CustomPin;