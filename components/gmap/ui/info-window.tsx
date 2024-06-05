import React from 'react';
import { Box, Typography, Paper, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { fetchListings, Listing } from '@/services/listingsApi';

interface ListingWithRent extends Listing {
	rentfee: number;
}

interface InfoWindowProps {
	listing: ListingWithRent;
}

const InfoWindow: React.FC<InfoWindowProps> = ({ listing }) => {
	const price: string = `¥${listing.rentfee.toLocaleString()}`

	return (
		<Card sx={{
			width: 260,
			margin: 2,
			position: 'absolute',
			transform: 'translate(-50%, -115%)',
			background: 'white',
			borderRadius: 2,
			boxShadow: 3,
		}}
		>
			<CardMedia component="img" height="180" image="/ai-img.jpg" alt="Property photo" />
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
						2,000 sqft
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};


export default InfoWindow