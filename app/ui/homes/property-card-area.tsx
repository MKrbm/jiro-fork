"use client";
import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery, useTheme, Grid } from "@mui/material";
import { PropertyCard } from "./property-card";
import { fetchListings, Listing } from "@/services/listingsApi";
import { MapDetails } from '@/components/gmap/types/Camera';

export function PropertyCardArea({ mapDetails, isFullScreen }: { mapDetails: MapDetails, isFullScreen: boolean }) {
  interface ListingWithRent extends Listing {
    rentfee: number;
  }

  const [listings, setListings] = useState<ListingWithRent[]>([]);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // smartphones
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // tablets
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg')); // notebooks
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl')); // notebooks
  const isXl = useMediaQuery(theme.breakpoints.up('xl')); // larger screens

  useEffect(() => {
    if (mapDetails) {
      fetchListings(
        mapDetails.center_lat,
        mapDetails.center_lng,
        mapDetails.width,
        mapDetails.height,
        true
      )
        .then((fetchedListings) => {
          const listingsWithRent = fetchedListings.map((listing) => ({
            ...listing,
            rentfee: listing.rentfee ?? 0, // Ensure rentfee is a number
          }));
          setListings(listingsWithRent.slice(0, 20)); // Only the top 20 listings
        })
        .catch(console.error);
    }
  }, [mapDetails]);

  return (
    <Box
      sx={{
        position: (isMd || isLg || isXl) ? 'flex' : 'absolute',
        top: 0,
        left: isFullScreen ? 0 : '-100%', // Hide when not full screen
        width: (isLg || isXl)? '30vw' : isMd ? '300px' : '100%',
        maxWidth: '1000px',
        height: '100%',
        transition: 'left 0.3s ease-in-out',
        backgroundColor: 'white',
        overflowY: 'auto',
        display: 'block',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container spacing={2}>
        {listings.map((listing) => (
          <Grid item key={listing.addressid} sx={{margin: 'auto'}}>
              <PropertyCard listing={listing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
