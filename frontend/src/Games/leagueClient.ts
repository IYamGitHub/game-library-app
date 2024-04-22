import axios from 'axios';

export const BASE_API = process.env.REACT_APP_API_BASE;
export const LEAGUE_API = `${BASE_API}/api`;

export type Summoner = {
  summonerName: string;
  summonerLevel: number;
  summonerIcon: string;
};

export type Ranked = {
  tier: string;
  division: string;
  lp: number;
};

export type Mastery = {
  name: string;
  level: number;
  points: number;
};

const request = axios.create({
  withCredentials: true
});

export const getSummoner = async (summonerName: string): Promise<Summoner> => {
  const response = await request.get(`${LEAGUE_API}/summoner/${summonerName}`);
  return response.data;
};

export const getSoloQ = async (summonerName: string): Promise<Ranked> => {
  const response = await request.get(`${LEAGUE_API}/soloq/${summonerName}`);
  return response.data;
};

export const getFlexQ = async (summonerName: string): Promise<Ranked> => {
  const response = await request.get(`${LEAGUE_API}/flexq/${summonerName}`);
  return response.data;
};

export const getHighestMastery = async (summonerName: string): Promise<Mastery[]> => {
  const response = await request.get(`${LEAGUE_API}/mastery/${summonerName}`);
  return response.data;
};
