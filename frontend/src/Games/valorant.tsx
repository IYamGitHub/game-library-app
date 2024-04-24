import { useEffect, useState } from 'react';
import * as client from '../Users/client';
import './games.css';

const Valorant = () => {
    const [playerName, setSummonerName] = useState('');

    useEffect(() => {
        async function updateLeaguePage() {
            const profile = await client.profile();
            const user = await client.findUserByUsername(profile.username);
            setSummonerName(user.riotid);
        }
        updateLeaguePage();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            // fetch data from valorant riot api
        };

        if (playerName) {
            fetchData();
        }
    }, [playerName]);

    return <p>No Player Data found. Find Valorant on the Riot client and play!</p>;
};

export default Valorant;
