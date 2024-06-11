import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Listing {
    addressid: number;
    area: number;
    availablefrom: string;
    buildingage: number,
    buildingimageurl: string,
    buildinginfoid: number,
    buildingname: string,
    buildingstructure: string,
    buildingtype: string,
    city: string;
    country: string;
    descriptionid: number;
    direction: string;
    floor: number;
    floorplan: string;
    floorsabove: number;
    floorsbelow: number;
    houseinfoid: number;
    housename: string;
    latitude: number;
    longitude: number;
    postalcode: string;
    prefecture: string;
    streetaddress: string;
    streetaddress2: string;
    ward: string;
}

export const fetchListings = async (
    centerLat: number,
    centerLon: number,
    width: number,
    height: number,
    withPrice: boolean = false
): Promise<Listing[]> => {
    // console.log('API_URL:', API_URL);
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