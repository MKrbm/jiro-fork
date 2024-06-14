"use client";
import React, { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/router";
import { PropertyCardArea } from "@/app/ui/homes/property-card-area";
import { Box, Container, Button, useMediaQuery, useTheme } from "@mui/material";
import { MapDetails, pageFrom } from '@/components/gmap/types/Camera';
import { useParams } from "next/navigation";
import {
  APIProvider,
} from '@vis.gl/react-google-maps';
import { Location } from "@/components/gmap/types/Camera";
import Map from "@/components/gmap/Map";


// const interval = 100;
const API_KEY: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
if (!API_KEY) {
  throw new Error("GOOGLE_MAPS_API_KEY is not set");
}

export default function Page({ params, searchParams }: { params: { location: Location, form: pageFrom[] }, searchParams: { query: string } }) {
  console.log("params", params);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm')); // smartphones
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md')); // tablets
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // larger screens

  var location = params.location;
  if (location === 'home') {
    location = 'Shinjuku';
  }

  var pageFrom: pageFrom = "sale";
  if (params.form) {
    if (params.form.length == 1) {
      pageFrom = params.form[0];
      if (pageFrom !== "sale" && pageFrom !== "rent") {
        throw new Error(`Invalid pageFrom value: ${pageFrom}`);
      }
    } else {
      throw new Error(`Invalid pageFrom value: ${pageFrom}`);
    }
  }

  const mapDetails: MapDetails = {
    center_lat: 35.6803,
    center_lng: 139.7690,
    width: 1,
    height: 1,
  };

  // console.log(router.query.location);

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
          {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3321824596837!2d-122.01384291346217!3d37.334643700160434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2z44Ki44OD44OX44Or44O744OR44O844Kv!5e0!3m2!1sja!2sus!4v1712887239111!5m2!1sja!2sus"
          style={{ width: '100%', height: '100%' }}
          loading="lazy"
        ></iframe> */}
          <APIProvider apiKey={API_KEY}>
            <Map
              initialMapDetails={{
                center_lat: 35.6803,
                center_lng: 139.7690,
                width: 1,
                height: 1
              }}
              location={location}
              pageFrom={pageFrom}
            />
          </APIProvider>
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
