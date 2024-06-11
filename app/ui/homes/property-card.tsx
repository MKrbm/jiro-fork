import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { fetchListings, Listing } from '@/services/listingsApi';
import { getImages, ImageData } from '@/services/getImageApi';

interface ListingWithRent extends Listing {
  rentfee: number;
}

interface InfoWindowProps {
  listing: ListingWithRent;
}

const imageCache = new Map<number, string[]>();

export const PropertyCard: React.FC<InfoWindowProps> = ({ listing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (imageCache.has(listing.houseinfoid)) {
        setImages(imageCache.get(listing.houseinfoid) || []);
      } else {
        try {
          const imageData = await getImages([listing.houseinfoid]);
          const fetchedImages = imageData[listing.houseinfoid] || [];
          imageCache.set(listing.houseinfoid, fetchedImages);
          setImages(fetchedImages);
        } catch (error) {
          console.error('Failed to fetch images:', error);
        }
      }
    };

    fetchImages();

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [listing.houseinfoid]);

  const resetInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    // intervalId.current = setInterval(() => {
    //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    // }, 3000);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    resetInterval();
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    resetInterval();
  };

  const price = `¥${listing.rentfee.toLocaleString()}`;

  return (
    <Card sx={{
      marginTop: '10px',
      background: 'white',
      maxWidth: 240,
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
      <CardMedia 
        component="img" 
        sx={{ 
          width: 240,
          height: 180, 
          objectFit: 'cover' 
        }} 
        image={images[currentImageIndex]} 
        alt="Property photo" 
      />
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
            {listing.floorplan} 
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};