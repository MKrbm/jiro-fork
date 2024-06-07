import React from "react";
import Image from "next/image";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { fetchListings, Listing } from '@/services/listingsApi';

interface ListingWithRent extends Listing {
	rentfee: number;
}

interface InfoWindowProps {
	listing: ListingWithRent;
}

export const PropertyCard: React.FC<InfoWindowProps> = ({ listing }) => {
	const price: string = `¥${listing.rentfee.toLocaleString()}`

  return (
    <Card sx={{
      marginTop: '10px',
      background: 'white',
      maxWidth: 260,
      borderRadius: 2,
      boxShadow: 3,
    }}
    >
      <CardMedia component="img" height="180" image="/ai-img.jpg" alt="Property photo" />
      <CardContent>
        <Typography variant="h6" component="div">
          {listing.streetaddress}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available From: {new Date(listing.availablefrom).toLocaleDateString()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="h6" component="span">
            {price}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 2 }}>
            2,000 sqft
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
