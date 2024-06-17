"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Typography, Box } from "@mui/material";
import { styled } from '@mui/system';
import {
    APIProvider
} from '@vis.gl/react-google-maps';

import { PlaceAutocomplete } from "@/components/gmap/autocomplete-front";


const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

if (!API_KEY) {
    throw new Error("GOOGLE_MAPS_API_KEY is not set");
}

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
}));


export default function MainComponent() {
    const [selectedPlace, setSelectedPlace] =
        useState<google.maps.places.PlaceResult | null>(null);
      
    const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
      console.log(place);
      setSelectedPlace(place);
    }


  return (
    <Box position="relative" bgcolor="white" height='calc(100vh - 64px)'>
      <Image
        src="/ai-img.jpg"
        width={1024}
        height={1024}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Box position="absolute" width="100%" textAlign="center" top="50%" sx={{ transform: 'translateY(-50%)' }}>
        <Typography variant="h1" component="h1" color="white" fontFamily="Roboto" fontSize="5rem">
          Agents. Tours. Loans. Homes.
        </Typography>
        <SearchContainer>
        <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
          <APIProvider apiKey={API_KEY}>
            <PlaceAutocomplete onPlaceSelect={onPlaceSelect} />
          </APIProvider>
          </Box>
        </SearchContainer>
      </Box>
    </Box>
  );
}
