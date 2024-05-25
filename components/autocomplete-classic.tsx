import React, { useRef, useEffect, useState } from 'react';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

import styles from './styles.module.css';

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocompleteClassic = ({ onPlaceSelect }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  console.log(inputRef.current);
  useEffect(() => {
    if (!places || !inputRef.current) return;

    // types: ['address'], // Specifying this to specify the type of the place search bar can accepts
    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
      language: ['en'], // suggest in Enlgish with higher priority
      componentRestrictions: {
        country: ['JP'],
        // administrativeArea: '東京都' // Restrict to 東京都 (Tokyo Prefecture)  (This feature is currently not supported see : https://stackoverflow.com/questions/41058742/restrict-autocomplete-google-to-a-specific-administrative-area )
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
    <div className={styles['autocomplete-container']}>
      <input ref={inputRef} placeholder='Enter an address, city, or ZIP code' />
    </div>
  );
};
