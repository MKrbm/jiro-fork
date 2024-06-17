import React, { forwardRef, useImperativeHandle, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { fetchListings, Listing } from '@/services/listingsApi';
import { MapDetails, pageFrom } from './types/Camera';
import { PropertyCard } from '@/app/ui/homes/property-card';

interface CustomPinProps {
	pageFrom: pageFrom;
	scale: number;
	mapDetails: MapDetails;
}

export interface CustomPinRef {
	handleClickOutside: () => void;
}

const CustomPin = forwardRef<CustomPinRef, CustomPinProps>((props, ref) => {
	const { pageFrom, scale, mapDetails } = props;

	interface ListingWithRent extends Listing {
		rentfee: number;
	}

	const [listings, setListings] = useState<ListingWithRent[]>([]);
	const [hoveredPin, setHoveredPin] = useState<number | null>(null); // State to track hovered pin
	const [selectedListing, setSelectedListing] = useState<ListingWithRent | null>(null);
	const [displayPropertyCard, setDisplayPropertyCard] = useState<number | null>(null);
	let pinBackground: string = '#FFFFFF'; // Example background color
	let pinHoveredColor: string = '#F0F0F0'; // Example hover color
	let pinTextColor: string = '#333333'; // Example text color

	if (pageFrom === 'sale') {
		pinBackground = '#ff2222'
		pinHoveredColor = '#1ea11e'
		pinTextColor = '#fff'
	} else if (pageFrom === 'rent') {
		pinBackground = '#66bbdd'
		pinHoveredColor = '#ffcc22'
		pinTextColor = '#fff'
	}


	useImperativeHandle(ref, () => ({
		handleClickOutside() {
			setSelectedListing(null);
			setDisplayPropertyCard(null);
		}
	}));


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

	const handlePinClick = (listing: ListingWithRent, index: number) => {
		console.log('Pin clicked:', listing);
		// Set selected listing and position
		setSelectedListing(listing);
		setDisplayPropertyCard(index);
	};

	useEffect(() => {
		const handleOutsideInteraction = (event: Event) => {
			// Check if event.target is an instance of HTMLElement
			if (event.target instanceof HTMLElement) {
				if (
					!event.target.closest('.info-window, .marker-pin') &&
					(selectedListing || displayPropertyCard !== null)
				) {
					setSelectedListing(null);
					setDisplayPropertyCard(null);
					console.log('Event: Outside Interaction'); // Log the event name
				}
			} else {
				// If event.target is not an HTMLElement (e.g., resize event)
				if (selectedListing || displayPropertyCard !== null) {
					setSelectedListing(null);
					setDisplayPropertyCard(null);
					console.log('Event: Outside Interaction'); // Log the event name
				}
			}
		};
	
		// Add listeners for click and resize events
		window.addEventListener('click', handleOutsideInteraction);
	
		return () => {
			window.removeEventListener('click', handleOutsideInteraction);
		};
	}, [selectedListing, displayPropertyCard]);





	// Function to render a pin displaying the price
	const renderPricePin = (price: string, index: number) => (
		<Box
			sx={{
				position: 'relative',
				display: 'inline-block',
				'&:hover': {
					'& .price-pin': { // Increase specificity
						backgroundColor: `${pinHoveredColor}`,
						transition: 'background-color 0.3s',
					},
					'& .pin-triangle': { // Increase specificity
						borderTopColor: `${pinHoveredColor}`,
						transition: 'border-top-color 0.3s',
					},
				},
				'& .price-pin': {
					backgroundColor: pinBackground,
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
					borderTop: `6px solid ${pinBackground}`,
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
						color: `${pinTextColor}`,
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
				backgroundColor: `${pinTextColor}`,
				border: `1px solid ${pinBackground}`,
				boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', // Shadow effect
				borderRadius: '50%',
				width: 16,
				height: 16,
				'&:hover': {
					border: `1px solid ${pinHoveredColor}`, // Change to desired hover color
					transition: 'border-color 0.3s',
					'& .marker-inner': {
						background: `${pinHoveredColor}`, // Change to desired hover color
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
					backgroundColor: `${pinBackground}`,
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
						onClick={() => handlePinClick(listing, index)}
						zIndex={hoveredPin === index || displayPropertyCard === index ? 1000 : index} // マーカーにホバーしているまたは情報ウィンドウが表示されている場合は最前面に表示
						className="marker-pin"
					>
						{index < 40 || scale > 12 ? renderPricePin(price, index) : renderMarkPin(index)}
						{selectedListing && selectedListing.addressid === listing.addressid && (
							<Box sx={{
								width: 240,
								position: 'absolute',
								transform: 'translate(-35%, -110%)',
							}}>
								<PropertyCard
									listing={listing}
								/>
							</Box>
						)}
					</AdvancedMarker>
				);
			})}
		</>
	);
});

export default CustomPin;
