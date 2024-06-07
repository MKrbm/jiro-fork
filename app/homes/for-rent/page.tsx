"use client";
import React, { useState } from "react";
import { PropertyCardArea } from "@/app/ui/homes/property-card-area";
import { Box, Container, Button, useMediaQuery, useTheme } from "@mui/material";
import { MapDetails } from '@/components/gmap/types/Camera';
import Map from "@/components/gmap/Map";

// export const metadata = {
//   title: 'Rent',
// };

export default function Page() {
  const [isFullScreen, setIsFullScreen] = useState(true);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // smartphones
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // tablets
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // larger screens

  const mapDetails: MapDetails = {
    center_lat: 35.6803,
    center_lng: 139.7690,
    width: 1,
    height: 1,
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  return (
    <Container disableGutters maxWidth={false} sx={{ height: 'calc(100vh - 64px)', position: 'relative', backgroundColor: 'white', overflow: 'hidden' }}>
    {/* Flexbox Container for Map and PropertyCardArea */}
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMdUp ? 'row-reverse' : 'column', // Row for isMdUp, column otherwise
        height: '100%',
      }}
    >
      {/* Map */}
      <Box
        sx={{
          flex: 1, // Grow to fill available space
          position: isMdUp ? '' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Map center_lat={35.6803} center_lng={139.7690} width={1} height={1} />
      </Box>
      
      {/* PropertyCardArea */}
      <PropertyCardArea mapDetails={mapDetails} isFullScreen={isFullScreen} />
    </Box>

    {/* Map or List Togle Button */}
    {(isXs || isSm) && (
      <Button
      variant="contained"
      size="large"
      onClick={toggleFullScreen}
      sx={{
        position: 'fixed',
        width: '70%',
        maxWidth: 400,
        bottom: 64,
        left: '50%',
        transform: 'translateX(-50%)', // ボタンを中央に配置
        zIndex: 9999, // zIndexの値を大きく修正
      }}
    >
      {isFullScreen ? 'Map' : 'List'}
    </Button>
    
      )}
  </Container>
  );
}
