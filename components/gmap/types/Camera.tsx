export type MapDetails = {
    center_lat: number;
    center_lng: number;
    width: number;
    height: number;
};
export type Location = string;

export function extractMapDetails(data: any): MapDetails {
    if (!data?.center?.lat || !data?.center?.lng || !data?.bounds?.south || !data?.bounds?.west || !data?.bounds?.north || !data?.bounds?.east) {
        throw new Error("Missing required map details");
    }

    // console.log("Data:", data);

    return {
        center_lat: (data.bounds.north + data.bounds.south) / 2,
        center_lng: (data.bounds.east + data.bounds.west) / 2,
        width: data.bounds.east - data.bounds.west,
        height: data.bounds.north - data.bounds.south,
    };
}

