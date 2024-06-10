import { getImages, isValidHttpUrl} from '@/services/getImageApi'
import { isUrlReachable } from '@/services/isUrlReachable'
import axios from 'axios';

const API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;



describe('fetchImages Integration Test', () => {
    it('should fetch images for provided room IDs', async () => {
        const houseIds = '1,12,123';
        const response = await axios.get(`${API_URL}/images?ids=${houseIds}`);
        
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
        expect(Object.keys(response.data).length).toBe(3);
        Object.keys(response.data).forEach(key => {
            expect(response.data[key]).toBeInstanceOf(Array);
        });
    });

    it('getImages should do the same as the previous fetchImages', async () => {
        const houseIds = [1, 12, 123];
        const imageData = await getImages(houseIds);
        
        // console.log(imageData);
        expect(imageData).toBeDefined();
        expect(Object.keys(imageData).length).toBe(3);
        // imageData.forEach(data => {
        //     expect(data.images).toBeInstanceOf(Array);
        // });
    });

    it('should handle no house IDs provided', async () => {
        const imageData = await getImages([]);
        expect(imageData).toBeDefined();
        expect(Object.keys(imageData).length).toBe(0);
    });

    it('should handle no images found for the specified house IDs', async () => {
        const houseIds = [99999999999999, 100099883233232323];
        const imageData = await getImages(houseIds);
        expect(imageData[houseIds[0]].length).toBe(1)
        expect(imageData[houseIds[1]].length).toBe(1)
        expect(imageData[houseIds[0]][0]).toBe("Given room ID is not found in the database.")
        expect(imageData[houseIds[1]][0]).toBe("Given room ID is not found in the database.")
    });

    it('should url be valid', async () => {
        const houseIds = Array.from({ length: 10 }, (_, i) => i + 1);
        const imageData = await getImages(houseIds);

        for (let i = 0; i < houseIds.length; i++) {
            expect(imageData[houseIds[i]].length).toBeGreaterThan(0);
            for (let j = 0; j < imageData[houseIds[i]].length; j++) {
                const url = imageData[houseIds[i]][j];
                expect(isValidHttpUrl(url)).toBe(true);
            }
        }
    });

    it('should url be available', async () => {
        const houseIds = Array.from({ length: 10 }, (_, i) => i + 1);
        const imageData = await getImages(houseIds);
        for (let i = 0; i < houseIds.length; i++) {
            expect(imageData[houseIds[i]].length).toBeGreaterThan(0);
            expect(await isUrlReachable(imageData[houseIds[i]][0])).toBe(true);
        }
    })
    // it('should handle internal server errors', async () => {
    //     // To simulate an internal server error, you might need to mock this or trigger an actual error condition
    //     const houseIds = 'error'; // Assuming this input triggers an error
    //     const response = await axios.get(`${API_URL}/images?ids=${houseIds}`);
        
    //     expect(response.status).toBe(500);
    //     expect(response.data.error).toBe('Internal Server Error');
    // });
});
