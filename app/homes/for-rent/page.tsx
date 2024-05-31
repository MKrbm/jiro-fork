import React from "react";
import { PropertyCard } from "@/app/ui/homes/property-card";
import { Box, Container, Typography } from "@mui/material";

export const metadata = {
  title: 'Rent',
};

export default function Page() {
  return (
    <Container disableGutters maxWidth={false} sx={{paddingTop: "64px", height: '100vh', display: 'flex', backgroundColor: 'white' }}>
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.3321824596837!2d-122.01384291346217!3d37.334643700160434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2z44Ki44OD44OX44Or44O744OR44O844Kv!5e0!3m2!1sja!2sus!4v1712887239111!5m2!1sja!2sus"
          style={{ width: '100%', height: '100%' }}
          loading="lazy"
        ></iframe>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'pink.200',
            opacity: 0.5,
            margin: 2,
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Control Map Search Layer</Typography>
        </Box>
      </Box>

      <Box sx={{ width: { xs: '100%', md: '320px' }, backgroundColor: 'blue.200' }}>
        <PropertyCard />
      </Box>
    </Container>
  );
}
