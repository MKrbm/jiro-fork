import { fetchListings, Listing  } from '@/services/listingsApi';
import axios from 'axios';

const API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
console.log('API_URL:', API_URL);


describe('API Accessibility Test', () => {
    it('should be able to access the API base URL', async () => {
        try {
            const response = await axios.get(API_URL + '/messages');
            expect(response.status).toBe(200);
        } catch (error) {
            throw new Error('API is not accessible');
        }
    });
});

// http://localhost:5001/api/db/listings?center_lat=36.589813&center_lon=139.887848&width=0.01&height=0.1&price=false
describe('fetchListings Integration Test', () => {
    
    // asakusa
    it('should fetch listings from the API', async () => {
        const centerLat = 35.7186;
        const centerLon = 139.7959;
        const width = 0.1;
        const height = 0.1;
        const withPrice = false;

        const listings = await fetchListings(centerLat, centerLon, width, height, withPrice);

        expect(listings).toBeDefined();
        expect(Array.isArray(listings)).toBe(true);
    });


    // Sky-tree
    it('check field of listings when withPrice is false', async () => {
        const centerLat = 35.7101;
        const centerLon = 139.8107;
        const width = 0.1;
        const height = 0.1;
        const withPrice = false;

        const listings = await fetchListings(centerLat, centerLon, width, height, withPrice);
        expect(listings.length).toBeGreaterThan(0);
        expect(listings[0]).toHaveProperty('addressid');
        expect(listings[0]).toHaveProperty('city');
        expect(listings[0]).toHaveProperty('country');
        expect(listings[0]).toHaveProperty('latitude');
        expect(listings[0]).toHaveProperty('longitude');
        expect(listings[0]).toHaveProperty('postalcode');
        expect(listings[0]).toHaveProperty('state');
        expect(listings[0]).toHaveProperty('streetaddress');
        expect(listings[0]).toHaveProperty('streetaddress2');
        expect(listings[0]).not.toHaveProperty('managefee');
        expect(listings[0]).not.toHaveProperty('rentfee');
    });

    it('check field of listings when withPrice is true', async () => {
        const centerLat = 35.7101;
        const centerLon = 139.8107;
        const width = 0.005;
        const height = 0.005;
        const withPrice = true;

        const listings = await fetchListings(centerLat, centerLon, width, height, withPrice);

        expect(listings.length).toBeGreaterThan(0);
        expect(listings[0]).toHaveProperty('addressid');
        expect(listings[0]).toHaveProperty('city');
        expect(listings[0]).toHaveProperty('country');
        expect(listings[0]).toHaveProperty('latitude');
        expect(listings[0]).toHaveProperty('longitude');
        expect(listings[0]).toHaveProperty('postalcode');
        expect(listings[0]).toHaveProperty('state');
        expect(listings[0]).toHaveProperty('streetaddress');
        expect(listings[0]).toHaveProperty('streetaddress2');
        expect(listings[0]).toHaveProperty('managefee');
        expect(listings[0]).toHaveProperty('rentfee');
    });


    it('check around sky-tree', async () => {
        const centerLat = 35.7101;
        const centerLon = 139.8107;
        const width = 0.005;
        const height = 0.005;
        const withPrice = true;

        const listings = await fetchListings(centerLat, centerLon, width, height, withPrice);

        expect(listings.length).toBeGreaterThan(0);
        for (const listing of listings) {
            expect(listing.latitude).toBeGreaterThan(35.7051 - width/2);
            expect(listing.latitude).toBeLessThan(35.7151 + width/2);
            expect(listing.longitude).toBeGreaterThan(139.8057 - height/2);
            expect(listing.longitude).toBeLessThan(139.8157 + height/2);
            expect(listing.streetaddress).toContain('墨田区'); }
    });
});

