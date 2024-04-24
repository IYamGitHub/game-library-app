import { useEffect, useState } from 'react';
import { Summoner, Ranked, Mastery, getSummoner, getSoloQ, getFlexQ, getHighestMastery } from './leagueClient';
import * as client from '../Users/client';
import './games.css';

const League = () => {
    const [summonerName, setSummonerName] = useState('');
    const [summonerInfo, setSummonerInfo] = useState<Summoner | null>(null);
    const [soloQ, setSoloQ] = useState<Ranked | null>(null);
    const [flexQ, setFlexQ] = useState<Ranked | null>(null);
    const [mastery, setMastery] = useState<Mastery[] | null>(null);

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
            const summonerData = await getSummoner(summonerName);
            const soloQData = await getSoloQ(summonerName);
            const flexQData = await getFlexQ(summonerName);
            const masteryData = await getHighestMastery(summonerName);

            setSummonerInfo(summonerData);
            setSoloQ(soloQData);
            setFlexQ(flexQData);
            setMastery(masteryData);
        };

        if (summonerName) {
            fetchData();
        }
    }, [summonerName]);

    return (
        <div className="LeagueContainer">

            {summonerInfo && (
                <div className="LeagueSection">
                    <h2>Summoner Info</h2>
                    <p>Name: {summonerName}</p>
                    <p>Level: {summonerInfo.summonerLevel}</p>
                    <img src={summonerInfo.summonerIcon} />
                </div>
            )}

            {mastery && (
                <div className="LeagueSection">
                    <h2>Champion Mastery</h2>
                    {mastery.map((mastery, index) => (
                        <div key={index}>
                            <p>Name: {mastery.name}</p>
                            <p>Level: {mastery.level}</p>
                            <p>Points: {mastery.points}</p>
                        </div>
                    ))}
                </div>
            )}

            {soloQ && (
                <div className="LeagueSection">
                    <h2>SoloQ Info</h2>
                    <p>Tier: {soloQ.tier}</p>
                    <p>Division: {soloQ.division}</p>
                    <p>LP: {soloQ.lp}</p>
                </div>
            )}

            {flexQ && (
                <div className="LeagueSection">
                    <h2>FlexQ Info</h2>
                    <p>Tier: {flexQ.tier}</p>
                    <p>Division: {flexQ.division}</p>
                    <p>LP: {flexQ.lp}</p>
                </div>
            )}
        </div>
    );
};

export default League;
