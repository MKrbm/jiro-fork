'use client'
import React, { useRef, useEffect, useState } from 'react';
import {Box, Input, TextField} from '@mui/material';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

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

  useEffect(() => {
    if (!places || !inputRef.current) return;

    // types: ['address'], // Specifying this to specify the type of the place search bar can accepts
    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      language: ['en'], // suggest in Enlgish with higher priority
      componentRestrictions: {
        country: ['JP'],
      }
    };
    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <Box className={styles['autocomplete-container']} style={{ width: '100%' }}>
      <TextField inputRef={inputRef} placeholder='Enter an address, city, or ZIP code' style={{ width: '100%', backgroundColor: 'white', color: 'black' }} />
    </Box>
  );
};
