"use client";
import React from 'react';
import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';

export default function NotFoundPage() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          padding: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection={isMdUp ? 'row' : 'column'}
          justifyContent="center"
          alignItems="center"
          textAlign={isMdUp ? 'left' : 'center'}
        >
          <Box mb={isMdUp ? 0 : 2} sx={{ flex: 1 }}>
            <Typography variant="h2" gutterBottom fontFamily={'serif'}>
              Oops!
            </Typography>
            <Typography variant="h6" gutterBottom>
              We couldn't find the page you requested.
            </Typography>
            {isMdUp ? (
              <>
                <Typography variant="h6" gutterBottom>
                  jiro can find your perfect home​.
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Let's go on an adventure!
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size='large'
                  sx={{
                    marginTop: theme.spacing(3),
                  }}
                  onClick={() => { window.location.href = '/homes/for-rent'; }}>
                  Bon Voyage!
                </Button>
              </>
            ) : null}
          </Box>
          <Box
            sx={{
              width: '100%',
              maxWidth: '640px',
              mb: isMdUp ? 0 : 2,
            }}
          >
            <Image src={"/404-House.svg"} alt={'House Illustration'} width={909} height={529.32087} layout="responsive" />
          </Box>
          {!isMdUp ? (
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                jiro can find your perfect home​.
              </Typography>
              <Typography variant="h6" gutterBottom>
                Let's go on an adventure!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size='large'
                onClick={() => { window.location.href = '/homes/for-rent'; }}>
                Bon Voyage!
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}
