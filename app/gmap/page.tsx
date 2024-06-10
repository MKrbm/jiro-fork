import { Box } from '@mui/material';
import Map from "@/components/gmap/Map";

// import { MapDetails, extractMapDetails } from '@components/gmap/types/Camera.tsx';

export default function Home() {
  return (
    <Box title="Google Maps App">
      <Map center_lat={35.6803} center_lng={139.7690} width={1} height={1} />
    </Box>
  );
}

