import React from "react";
import Image from "next/image";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

export function PropertyCard() {
  return (
    <Card sx={{ maxWidth: 330, margin: 2 }}>
      <CardMedia component="img" height="270" image="/ai-img.jpg" alt="Property photo" />
      <CardContent>
        <Typography variant="h6" component="div">
          3 Bed, 2 Bath House
        </Typography>
        <Typography variant="body2" color="text.secondary">
          123 Main Street, San Francisco, CA 94105
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="h6" component="span">
            $1,200,000
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: 2 }}>
            2,000 sqft
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
