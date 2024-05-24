"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignIn = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Screen size:', isSmallScreen ? 'Small' : 'Large');
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
          color: 'text.secondary',
        }}
      >
        <Image
          src="/jiro-housing.svg"
          width={1000}
          height={300}
          priority={true}
          alt="Logo"
          style={{ height: "48px", width: "auto", cursor: "pointer" }}
        />
        <Typography variant="h6" component="h1" gutterBottom>
          Sign in
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleSignIn}
        >
          Sign In
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Log in</Link>
        </Typography>
      </Container>
    </Box>
  );
}
