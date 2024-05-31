import React from 'react';
import { LogInArea } from "@/app/ui/log-in/log-in-area";
import { Box } from '@mui/material';

export const metadata = {
  title: 'Log in',
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
      <LogInArea />
    </Box>
  );
}
