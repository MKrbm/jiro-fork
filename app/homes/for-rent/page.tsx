import React from "react";
import { PropertyCard } from "@/app/ui/homes/property-card";
import { Box, Container, Typography } from "@mui/material";
import Map from "@/components/gmap/Map";

export const metadata = {
  title: 'Rent',
};

export default function Page() {
  return (
    <Container disableGutters maxWidth={false} sx={{height: 'calc(100Vh-128px)', display: 'flex', backgroundColor: 'white' }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gray.200',
          position: 'relative',
        }}
      >
        <Map center_lat={35.6803} center_lng={139.7690} width={1} height={1} />
      </Box>

      <Box sx={{ width: { xs: '100%', md: '320px', lg: '640px' }}}>
        <PropertyCard />
      </Box>
    </Container>
  );
}
