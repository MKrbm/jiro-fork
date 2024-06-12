"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TextField, Button, IconButton, Typography, Box, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '50px',
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: 'gray',
  },
}));

export default function MainComponent() {
  // const [inputValue, setInputValue] = useState("");
  // const [showCurrentLocationOption, setShowCurrentLocationOption] = useState(false);

  // const handleLocationClick = (e: React.MouseEvent) => {
  //   e.preventDefault(); // Prevent default event behavior
  //   if (window.confirm("Are you sure you want to use your current location?")) {
  //     // setInputValue("Current Location");
  //     console.log("Current location selected with confirmation");
  //   } else {
  //     console.log("Using current location cancelled");
  //   }
  // };

  // const handleSearchClick = (e: React.MouseEvent) => { 
  //   e.preventDefault(); // Prevent default event behavior
  //   // console.log("Search button clicked with value:", inputValue);
  // }
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
        <CustomButton variant="contained">
          Use current location
        </CustomButton>
      </Box>
    </Box>
  );
}
