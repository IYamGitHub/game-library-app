import { useEffect, useState } from 'react';
import * as steamClient from './steamClient';
import * as client from '../Users/client';
import './games.css';

const Steam = ({ passedInGame }: { passedInGame: string }) => {
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
            {Object.values(games).filter(game => game.name === passedInGame).map((game, index) => {
                return (
                    <div key={index} className="gameContainer">
                        <img src={game.url_store_header} alt={game.name} className="gameImage" />
                        
                        <div className="playtimeContainer">
                            <h4>Playtime</h4>
                            <p>Total Playtime: {game.playtime} minutes</p>
                            <p>Recent Playtime: {game.playtime_recent} minutes</p>
                        </div>
    
                        {game.achievements ? (
                            <div className="achievementContainer">
                                <h4>Achievements ({game.achievements.length}):</h4>
                                {game.achievements.map((achievement, i) => (
                                    <div key={i} className="achievementItem">
                                        {achievement[0]}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No achievements to display</p>
                        )}
                    </div>
                );
            })}
        </div>
    );    

};

export default Steam;
