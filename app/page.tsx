"use client";
import Image from "next/image";
import React, { useState } from "react";
import { TextField, Button, IconButton, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/system';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 800,
  margin: '0 auto',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '50px',
  backgroundColor: 'black',
  color: 'white',
  '&:hover': {
    backgroundColor: 'gray',
  },
}));

export default function MainComponent() {
  const [inputValue, setInputValue] = useState("");
  const [showCurrentLocationOption, setShowCurrentLocationOption] = useState(false);

  const handleSearchClick = () => {
    console.log("Current input value:", inputValue);
    // Here you can perform further actions with the input value if needed
  };

  const handleLocationClick = (e) => {
    e.preventDefault(); // Prevent default event behavior
    if (window.confirm("Are you sure you want to use your current location?")) {
      setInputValue("Current Location");
      console.log("Current location selected with confirmation");
    } else {
      console.log("Using current location cancelled");
    }
  };

  return (
    <Box position="relative" bgcolor="white">
      <Image
        src="/ai-img.jpg"
        width={1024}
        height={1024}
        style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
        alt="Screenshots of the dashboard project showing desktop version"
      />
      <Box position="absolute" width="100%" textAlign="center" top="50%" sx={{ transform: 'translateY(-50%)' }}>
        <Typography variant="h1" component="h1" color="white" fontFamily="Roboto" fontSize="5rem">
          Agents. Tours. Loans. Homes.
        </Typography>
        <SearchContainer>
          <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowCurrentLocationOption(true)}
              onBlur={() => setShowCurrentLocationOption(false)}
              sx={{
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(0, 0, 0, 0.23)', // Default border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#391', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(96, 255, 48, 0.6)', // Border color when focused
                    borderWidth: 4,
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </SearchContainer>
        <CustomButton onClick={handleLocationClick} variant="contained">
          Use current location
        </CustomButton>
      </Box>
    </Box>
  );
}
