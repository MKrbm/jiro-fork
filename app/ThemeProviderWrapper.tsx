// ThemeProviderWrapper.tsx
"use client";

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Inter } from "next/font/google";
import Header from "@/app/ui/header";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  // Add more custom theme settings if needed
});

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main> {/* Adjust marginTop based on the height of your Header */}
        {children}
      </main>
    </ThemeProvider>
  );
}
