export type MapDetails = {
    center_lat: number;
    center_lng: number;
    width: number;
    height: number;
};

export type pageFrom = string;

export function extractMapDetails(data: any): MapDetails {
    if (!data?.detail?.center?.lat || !data?.detail?.center?.lng || !data?.detail?.bounds?.south || !data?.detail?.bounds?.west || !data?.detail?.bounds?.north || !data?.detail?.bounds?.east) {
        throw new Error("Missing required map details");
    }

    // console.log("Data:", data);

    return {
        center_lat: (data.detail.bounds.north + data.detail.bounds.south) / 2,
        center_lng: (data.detail.bounds.east + data.detail.bounds.west) / 2,
        width: data.detail.bounds.east - data.detail.bounds.west,
        height: data.detail.bounds.north - data.detail.bounds.south,
    };
}

