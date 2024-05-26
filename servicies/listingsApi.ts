import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log('API_URL:', API_URL);

export interface Listing {
    addressid: number;
    availablefrom: string;
    city: string;
    country: string;
    gratuityfee: number;
    latitude: number;
    longitude: number;
    postalcode: string;
    priceid: number;
    state: string;
    streetaddress: string;
    streetaddress2: string | null;
    securitydeposit?: number;
    managefee?: number;
    rentfee?: number;
}

export const fetchListings = async (
    centerLat: number,
    centerLon: number,
    width: number,
    height: number,
    withPrice: boolean = false
): Promise<Listing[]> => {
    const url = `${API_URL}/db/listings`;
    const params = {
        center_lat: centerLat,
        center_lon: centerLon,
        width: width,
        height: height,
        price: withPrice,
    };

    try {
        const response = await axios.get<Listing[]>(url, { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw error;
    }
};