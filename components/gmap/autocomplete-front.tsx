'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Box, Input, TextField } from '@mui/material';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useRouter } from 'next/navigation'; // Import useRouter

import styles from './styles.module.css';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocomplete = ({ onPlaceSelect }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');
  const router = useRouter(); // Use the useRouter hook

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['address_components'], // NOTE: Return in specific format when specified. Check available fields https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult  
      language: ['en'], // suggest in Enlgish with higher priority
      types: ["(cities)"], //NOTE: list of types https://developers.google.com/maps/documentation/places/web-service/supported_types and https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
      componentRestrictions: {
        country: ['JP'],
      }
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const autocompleted_place = placeAutocomplete.getPlace();
      onPlaceSelect(autocompleted_place);
      console.log("place", autocompleted_place);
      if (autocompleted_place && autocompleted_place["address_components"]) {
        const city_name = autocompleted_place["address_components"][0]["long_name"].replace(/ /g, '-');
        const url = `/gmap/${encodeURIComponent(city_name)}`;
        router.push(url); // Navigate to the page with city_name
      }
      else{
        console.warn("placeAutocomplete.getPlace() is null");
      }
    });
  }, [onPlaceSelect, placeAutocomplete, router]);

  return (
    <Box className={styles['autocomplete-container']} style={{ width: '100%' }}>
      <TextField inputRef={inputRef} placeholder='Enter an address, city, or ZIP code' style={{ width: '100%', backgroundColor: 'white', color: 'black' }} />
    </Box>
  );
};
