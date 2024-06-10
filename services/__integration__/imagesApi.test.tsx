import axios from 'axios';

const API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;

describe('fetchImages Integration Test', () => {
    it('should fetch images for provided room IDs', async () => {
        const houseIds = '1,12,123';
        const response = await axios.get(`${API_URL}/images?ids=${houseIds}`);
        
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
        expect(Object.keys(response.data).length).toBeGreaterThan(0);
        Object.keys(response.data).forEach(key => {
            expect(response.data[key]).toBeInstanceOf(Array);
        });
    });

    it('should handle no house IDs provided', async () => {
        const response = await axios.get(`${API_URL}/images`);
        
        expect(response.status).toBe(400);
        expect(response.data.error).toBe('No house IDs provided');
    });

    it('should handle no images found for the specified house IDs', async () => {
        const houseIds = '999,1000'; // Assuming these IDs do not have images
        const response = await axios.get(`${API_URL}/images?ids=${houseIds}`);
        
        expect(response.status).toBe(404);
        expect(response.data.error).toBe('No images found for the specified house IDs');
    });

    it('should handle internal server errors', async () => {
        // To simulate an internal server error, you might need to mock this or trigger an actual error condition
        const houseIds = 'error'; // Assuming this input triggers an error
        const response = await axios.get(`${API_URL}/images?ids=${houseIds}`);
        
        expect(response.status).toBe(500);
        expect(response.data.error).toBe('Internal Server Error');
    });
});