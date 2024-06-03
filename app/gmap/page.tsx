import { Box } from '@mui/material';
import Map from "@/components/gmap/Map";

export default function Home() {
  return (
    <Box title="Google Maps App" sx={{ mt: 4 }}>
      <Map />
    </Box>
  );
}

