import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchListings, Listing } from '@/services/listingsApi';

interface ListingWithRent extends Listing {
  rentfee: number;
}

interface InfoWindowProps {
  listing: ListingWithRent;
}

const images = [
  "/ai-img.jpg",
  "/sampleImage/image1.jpg",
  "/sampleImage/image2.jpg",
  "/sampleImage/image3.jpg",
  "/sampleImage/image4.jpg",
  "/sampleImage/image5.jpg",
  "/sampleImage/image6.jpg",
  // 必要に応じて他の画像パスを追加
];

export const PropertyCard: React.FC<InfoWindowProps> = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

// Resets the interval for changing the current image
const resetInterval = () => {
  // If there is an existing interval, clear it
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Set a new interval to change the current image every 3 seconds
  const newIntervalId = setInterval(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 3000);
    setIntervalId(newIntervalId);
  };

  // reset interval when component unmounts
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetInterval();
  };

  // reset interval when component unmounts
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetInterval();
  };

  const price: string = `¥${listing.rentfee.toLocaleString()}`

  return (
    <Card sx={{
      marginTop: '10px',
      background: 'white',
      maxWidth: 260,
      borderRadius: 2,
      boxShadow: 3,
      position: 'relative'
    }}>
      <IconButton
        sx={{
          position: 'absolute', top: '100px', left: 0, zIndex: 1, transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { color: 'white' }
        }}
        onClick={handlePrevious}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <CardMedia component="img" height="180" image={images[currentImageIndex]} alt="Property photo" />
      <IconButton
        sx={{
          position: 'absolute', top: '100px', right: 0, zIndex: 1, transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.5)',
          '&:hover': { color: 'white' }
        }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
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
