import axios from 'axios';
export const BASE_API = process.env.REACT_APP_API_BASE;
export const GAME_API = `${BASE_API}/api`;
export interface Game {
    _id: string;
    origin: string
    gamename: string;
    imageurl: string;
}

const request = axios.create({
  withCredentials: true
});

export const createGame = async (game: any) => {
  const response = await request.post(`${GAME_API}/games`, game);
  return response.data;
};

export const findAllGames = async () => {
  const response = await request.get(`${GAME_API}/allGames`);
  return response.data;
};

export const findGameByGameName = async (gameName: string) => {
    const response = await request.get(`${GAME_API}/${gameName}`);
    return response.data;
  };
