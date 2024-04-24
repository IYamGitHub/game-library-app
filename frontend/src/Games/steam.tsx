import { useEffect, useState } from 'react';
import * as steamClient from './steamClient';
import * as client from '../Users/client';

const Steam = (passedInGame : any) => {
    const [steamID, setSteamID] = useState('');
    const [games, setGames] = useState<steamClient.OwnedGames[]>([]);

    useEffect(() => {
        async function updateSteamPage() {
            const profile = await client.profile();
            const user = await client.findUserByUsername(profile.username);
            setSteamID(user.steamid);
        }
        updateSteamPage();
    }, []);

    useEffect(() => {
        async function getAllSteamGames() {
            const ownedGames = await steamClient.getOwnedGames(steamID);
            setGames(ownedGames);
        }
        getAllSteamGames();
    }, [steamID]);

    return (
        <div className="SteamContainer">
            <h2>Steam Games</h2>
            {Object.entries(games).map(([key, value]) => {
                return (
                    <div key={key}>
                        <h3>{value.name}</h3>
                        <img src={value.url_store_header} alt={value.name} />
                    </div>
                );
            })}
        </div>
    );
};

export default Steam;
