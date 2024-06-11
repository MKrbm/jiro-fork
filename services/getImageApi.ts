import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ImageData {
    [key: number]: string[];
}
export const getImages = async (houseIds: number[]): Promise<ImageData> => {
    const url = `${API_URL}/images`;
    // Convert array of integers to a comma-separated string
    const idsParam = houseIds.join(',');

    const params = {
        ids: idsParam
    };

    try {
        const response = await axios.get<{ [key: string]: string[] }>(url, { params });
        const imagedata: ImageData = {};
        Object.keys(response.data).forEach(key => {
            imagedata[parseInt(key, 10)] = response.data[key];
        });
        if (Object.keys(imagedata).length !== houseIds.length || !Object.keys(imagedata).every(key => houseIds.includes(parseInt(key, 10)))) {
            throw new Error("Mismatch between requested house IDs and received data keys.");
        }
        return imagedata;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};


export const isValidHttpUrl = (string: string): boolean => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}
