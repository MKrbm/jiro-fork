import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { fetchListings, Listing } from '@/services/listingsApi';
import { MapDetails } from './types/Camera';

interface CustomPinProps {
	background: string;
	hoveredColor: string;
	glyphColor: string;
	scale: number;
	mapDetails: MapDetails;
}

const CustomPin: React.FC<CustomPinProps> = ({ background, hoveredColor, glyphColor, scale, mapDetails }) => {
	interface ListingWithRent extends Listing {
		rentfee: number;
	}

	const [listings, setListings] = useState<ListingWithRent[]>([]);
	const [hoveredPin, setHoveredPin] = useState<number | null>(null); // State to track hovered pin

	useEffect(() => {
		if (mapDetails) {
			fetchListings(
				mapDetails.center_lat,
				mapDetails.center_lng,
				mapDetails.width,
				mapDetails.height,
				true
			).then((fetchedListings) => {
				const listingsWithRent = fetchedListings.map(listing => ({
					...listing,
					rentfee: listing.rentfee ?? 0 // Ensure rentfee is a number
				}));
				setListings(listingsWithRent);
			}).catch(console.error);
		}
	}, [mapDetails]);

	const handlePinClick = (listing: ListingWithRent) => {
		console.log('Pin clicked:', listing);
		console.log(scale);
	};

	// Function to render a pin displaying the price
	const renderPricePin = (price: string, index: number) => (
		<Box
			sx={{
				position: 'relative',
				display: 'inline-block',
				zIndex: hoveredPin === index ? 1000 : 'auto', // Change zIndex on hover
				'&:hover': {
          '& .price-pin': { // Increase specificity
            backgroundColor: `${hoveredColor}`,
            transition: 'background-color 0.3s',
          },
          '& .pin-triangle': { // Increase specificity
            borderTopColor: `${hoveredColor}`,
            transition: 'border-top-color 0.3s',
          },
        },
				'& .price-pin': {
					backgroundColor: background,
					borderRadius: '15px',
					width: 60,
					height: 20,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Shadow effect
				},
				'& .pin-triangle': {
					position: 'absolute',
					bottom: -6,
					left: '50%',
					transform: 'translateX(-50%)',
					width: 0,
					height: 0,
					borderLeft: '4px solid transparent',
					borderRight: '4px solid transparent',
					borderTop: `6px solid ${background}`,
				},
			}}
			onMouseEnter={() => setHoveredPin(index)} // Set hovered pin
			onMouseLeave={() => setHoveredPin(null)} // Reset hovered pin
		>
			{/* Main box displaying the price */}
			<Box className="price-pin">
				<Typography
					variant="body2"
					sx={{
						color: `${glyphColor}`,
						fontWeight: 'thin',
						padding: '0 0.5rem',
					}}
				>
					{price}
				</Typography>
			</Box>
			{/* Triangle at the bottom */}
			<Box className="pin-triangle" />
		</Box>
	);

	// Function to render a circular mark pin
	const renderMarkPin = (index: number) => (
		<Box
			className="marker-outer"
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: `${glyphColor}`,
				border: `1px solid ${background}`,
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // Shadow effect
				borderRadius: '50%',
				width: 16,
				height: 16,
				zIndex: hoveredPin === index ? 1000 : 'auto', // Change zIndex on hover
				'&:hover': {
					border: `1px solid ${hoveredColor}`, // Change to desired hover color
					transition: 'border-color 0.3s',
					'& .marker-inner': {
						background: `${hoveredColor}`, // Change to desired hover color
						transition: 'background-color 0.3s',
					},
				},
			}}
			onMouseEnter={() => setHoveredPin(index)} // Set hovered pin
			onMouseLeave={() => setHoveredPin(null)} // Reset hovered pin
		>
			<Box
				className="marker-inner"
				sx={{
					backgroundColor: `${background}`,
					borderRadius: '50%',
					width: 8,
					height: 8,
				}}
			/>
		</Box>
	);

	return (
		<>
			{listings.map((listing, index) => {
				const price = `¥${listing.rentfee / 1000}K`;

				return (
					<AdvancedMarker
						key={listing.addressid}
						position={{ lat: listing.latitude, lng: listing.longitude }}
						onClick={() => handlePinClick(listing)}
						zIndex={hoveredPin === index ? 1000 : index} // Apply dynamic zIndex
					>
						{index < 40 || scale < 25000 ? renderPricePin(price, index) : renderMarkPin(index)}
					</AdvancedMarker>
				);
			})}
		</>
	);
};

export default CustomPin;
