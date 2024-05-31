"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function SignInArea() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignIn = () => {

    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Screen size:', isSmallScreen ? 'Small' : 'Large');
  };

  return (
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
        error={emailError}
        helperText={emailError ? 'Email is required' : ''}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        margin="normal"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordError}
        helperText={passwordError ? 'Password is required' : ''}
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
        Already have an account? <Link href="/log-in">Log in</Link>
      </Typography>
    </Container>
  )
}
