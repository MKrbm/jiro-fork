import React from 'react';
import dynamic from 'next/dynamic';
import { ControlPosition } from '@vis.gl/react-google-maps';

import { PlaceAutocompleteClassic } from './autocomplete-classic';
import type { AutocompleteMode } from './Map';

import styles from './styles.module.css';

// Dynamically import the MapControl component
const MapControl = dynamic(() => import('@vis.gl/react-google-maps').then(mod => mod.MapControl), { ssr: false });

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

export const CustomMapControl = ({
  controlPosition,
  onPlaceSelect
}: CustomAutocompleteControlProps) => {

  return (
    <MapControl position={controlPosition}>
      {/* Use the imported styles object to reference class names */}
      <p>Search box</p>
      <div className={styles['autocomplete-control']}>
        <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
      </div>
    </MapControl>
  );
};
