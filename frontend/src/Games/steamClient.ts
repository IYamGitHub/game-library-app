import axios from 'axios';

export const BASE_API = process.env.REACT_APP_API_BASE;
export const STEAM_API = `${BASE_API}/api`;

export interface OwnedGames {
    name: string;
    appID: number;
    playtime: number;
    playtime_recent: number;
    url_store: string;
    url_store_header: string;
    url_app_logo: string;
    url_app_icon: string;
    achievements: Array<[string, {
        unlocked: boolean;
        time: number;
    }]>;
}

const request = axios.create({
    withCredentials: true
});

export const getOwnedGames = async (steamID: string, moreInfo: boolean = true): Promise<OwnedGames[]> => {
    const response = await request.get(`${STEAM_API}/games/${steamID}`, { params: { moreInfo } });
    return response.data;
};

