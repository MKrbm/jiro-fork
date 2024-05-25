const API_URL = process.env.API_URL || 'http://localhost:5001/api';

interface Listing {
    addressid: number;
    availablefrom: string;
    city: string;
    country: string;
    gratuityfee: string;
    latitude: string;
    longitude: string;
    managefee: string;
    postalcode: string;
    priceid: number;
    rentfee: string;
    securitydeposit: string;
    state: string;
    streetaddress: string;
    streetaddress2: string | null;
}


export const fetchListings = async (
    centerLat: number,
    centerLon: number,
    width: number,
    height: number,
    withPrice: boolean = false
): Promise<Listing[]> => {
    const url = new URL(`${API_URL}/db/listings`);
    url.searchParams.append('center_lat', centerLat.toString());
    url.searchParams.append('center_lon', centerLon.toString());
    url.searchParams.append('width', width.toString());
    url.searchParams.append('height', height.toString());
    url.searchParams.append('price', withPrice.toString());

    try {
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: Listing[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching listings:', error);
        throw error;
    }
};