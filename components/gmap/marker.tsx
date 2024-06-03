import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
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

    const handlePinClick = (listing: ListingWithRent) => {
        console.log('Pin clicked:', listing);
    };

    // Function to render a pin displaying the price
    const renderPricePin = (price: string) => (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-block',
                '&:hover .hover-effect': {
                    backgroundColor: '#FFD700', // Change to desired hover color
                },
                '&:hover .triangle-hover': {
                    borderTopColor: '#FFD700', // Change the triangle color on hover
                },
                '& .hover-effect': {
                    backgroundColor: background,
                    borderRadius: '15px',
                    width: 60,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
                    transition: 'background-color 0.3s',
                },
                '& .triangle-hover': {
                    position: 'absolute',
                    bottom: -10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderTop: `10px solid ${background}`,
                    transition: 'border-top-color 0.3s',
                },
            }}
        >
            {/* Main box displaying the price */}
            <Box className="hover-effect">
                <Typography
                    variant="body2"
                    sx={{
                        color: "white",
                        fontWeight: 'thin',
                        padding: '0 0.5rem',
                    }}
                >
                    {price}
                </Typography>
            </Box>
            {/* Triangle at the bottom */}
            <Box className="triangle-hover" />
        </Box>
    );

    // Function to render a circular mark pin
    const renderMarkPin = () => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                border: `1px solid ${background}`,
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // Shadow effect
                borderRadius: '50%',
                width: 16,
                height: 16,
            }}
        >
            <Box
                sx={{
                    backgroundColor: `${background}`,
                    borderRadius: '50%',
                    width: 8,
                    height: 8,
                }}
            />
        </Box>
    );

    return (
        <>
            {listings.map((listing, index) => {
                const price = `¥${listing.rentfee / 1000}K`;

                return (
                    <AdvancedMarker
                        key={listing.addressid}
                        position={{ lat: listing.latitude, lng: listing.longitude }}
                        onClick={() => handlePinClick(listing)}
                    >
                        {index < 60 ? renderPricePin(price) : renderMarkPin()}
                    </AdvancedMarker>
                );
            })}
        </>
    );
};

export default CustomPin;
