import axios from 'axios';

export const BASE_API = process.env.REACT_APP_API_BASE;
export const STEAM_API = `${BASE_API}/api`;

export type OwnedGames = {
  name: string;
  appID: number;
  playtime: number;
  playtime_recent: number;
  url_store: string;
  url_store_header: string;
  url_app_logo: string;
  url_app_icon: string;
}

export type GameAchievements = {
  name: string;
  count: number;
  achievements: {
      [key: string]: {
          unlocked: boolean;
          time: number;
      };
  };
}

export type GameSchema = {
  name: string;
  statCount: number;
  achievementCount: number;
  stats: {
      [key: string]: {
          displayName: string;
          default: number;
      };
  };
  achievements: {
      [key: string]: {
          displayName: string;
          description: string;
          hidden: boolean;
          icon: string;
          iconLocked: string;
      };
  };
}

const request = axios.create({
  withCredentials: true
});

export const getOwnedGames = async (steamID: string, appID: string | null = null, moreInfo: boolean = true): Promise<OwnedGames[]> => {
  const response = await request.get(`${STEAM_API}/games/${steamID}/${appID ? appID : ''}`, { params: { moreInfo } });
  return response.data;
};

export const getGameSchema = async (appID: string): Promise<GameSchema> => {
  const response = await request.get(`${STEAM_API}/schema/${appID}`);
  return response.data;
};

export const getAchievements = async (steamID: string, appID: string): Promise<GameAchievements> => {
  const response = await request.get(`${STEAM_API}/achievements/${steamID}/${appID}`);
  return response.data;
};
