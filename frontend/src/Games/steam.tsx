import { useEffect, useState } from 'react';
import { getOwnedGames } from './steamClient';
import * as client from '../Users/client';

interface Game {
    name: string;
    appID: number;
    playtime: number;
    playtime_recent: number;
    url_store: string;
    url_store_header: string;
    url_app_logo: string;
    url_app_icon: string;
    achievements: {
        [key: string]: {
            AchievementName: string;
            icon: string;
        };
    }[];
}

const Steam = () => {
    const [steamID, setSteamID] = useState('');
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        async function updateSteamPage() {
            const profile = await client.profile();
            const user = await client.findUserByUsername(profile.username);
            setSteamID(user.steamid);
        }
        updateSteamPage();
    }, []);

    // useEffect(() => {
    //     async function getAllSteamGames() {
    //         const ownedGames = await getOwnedGames(steamID);
    //         setGames(ownedGames);
    //     }
    //     getAllSteamGames();
    // }, [steamID]);

    return (
        <div>
            <h1>Steam</h1>
        </div>
    );

};

export default Steam;

