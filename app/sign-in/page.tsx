import React from 'react';
import { SignInArea } from "@/app/ui/sign-in/sign-in-area";
import { Box } from '@mui/material';

export const metadata = {
  title: 'Sign in',
};

export default function SignIn() {
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
      <SignInArea />
    </Box>
  );
}
