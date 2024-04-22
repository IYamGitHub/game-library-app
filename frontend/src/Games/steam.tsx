import { useEffect, useState } from 'react';
import { getOwnedGames, getAchievements, getGameSchema, GameAchievements, GameSchema } from './steamClient';
import * as client from '../Users/client';

interface Game {
    name: string;
    appID: number;
    playtime: number;
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
        compileOwnedGamesAchievementsAndIcons();
    }, []);

    const compileOwnedGamesAchievementsAndIcons = async () => {
        let ownedGames = await getOwnedGames(steamID);
        ownedGames.sort((a, b) => b.playtime - a.playtime);
        const gamesWithAchievements: Game[] = [];

        // iterate over each ownedGame and get the achievements for each game
        // Limit to top 5 most played games
        for (const game of ownedGames.slice(0, 5)) {
            const gameAchievements: GameAchievements = await getAchievements(steamID, game.appID.toString());
            const gameSchema: GameSchema = await getGameSchema(game.appID.toString());

            const achievements: { [key: string]: { AchievementName: string; icon: string } }[] = [];

            // for each unlocked achievement, get the icon
            let achievementCount = 0;
            for (const key in gameAchievements.achievements) {
                // Limit to first 5 achievements
                if (achievementCount >= 5) break;

                if (gameAchievements.achievements[key].unlocked) {
                    achievements.push({
                        [key]: {
                            AchievementName: gameSchema.achievements[key].displayName,
                            icon: gameSchema.achievements[key].icon,
                        },
                    });
                    achievementCount++;
                }
            }

            gamesWithAchievements.push({
                ...game,
                achievements,
            });
        }

        setGames(gamesWithAchievements);
    };

    return (
        <div>
            <h1>Steam</h1>

            {games.map((game, index) => (
                <div key={index}>
                    <h2>{game.name}</h2>
                    <p>Playtime: {game.playtime}</p>
                    <img src={game.url_app_icon} />
                    <h3>Achievements</h3>
                    {game.achievements.map((achievement, index) => (
                        <div key={index}>
                            <p>{achievement[Object.keys(achievement)[0]].AchievementName}</p>
                            <img src={achievement[Object.keys(achievement)[0]].icon} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );

};

export default Steam;
