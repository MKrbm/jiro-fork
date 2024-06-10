import axios from 'axios';

export const isUrlReachable = async (url: string): Promise<boolean> => {

    try {
        const response = await axios.get(url)
        return response.status === 200;
    } catch (error) {
        return false;
    }
}