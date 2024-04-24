import axios from 'axios';
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
export interface User {
  _id: string;
  username: string;
  password: string;
  displayname: string;
  avatar: string;
  bio: string;
  riotid: string;
  steamid: string;
  following: [];
  likes: [];
}

const request = axios.create({
  withCredentials: true
});

export const createUser = async (user: any) => {
  try {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const updateUser = async (user: any) => {
  try {
    const response = await request.put(`${USERS_API}/${user.username}`, user);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const deleteUser = async (user: any) => {
  try {
    const response = await request.delete(`${USERS_API}/${user.username}`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const findAllUsers = async () => {
  try {
    const response = await request.get(`${USERS_API}`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    const response = await request.get(`${USERS_API}/${username}`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const findFollowers = async (username: string) => {
  try {
    const response = await request.get(`${USERS_API}/${username}/following`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const follow = async (username: string, followingUsername: string) => {
  try {
    const response = await request.put(
      `${USERS_API}/${username}/follow/${followingUsername}`
    );
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const unfollow = async (username: string, followingUsername: string) => {
  try {
    const response = await request.put(
      `${USERS_API}/${username}/unfollow/${followingUsername}`
    );
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const searchUsername = async (
  username: string,
  searchString: string
) => {
  try {
    const response = await request.get(
      `${USERS_API}/search/${username}/${searchString}`
    );
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const anonymousSearchUsername = async (
  searchString: string
) => {
  try {
    const response = await request.get(
      `${USERS_API}/search/${searchString}`
    );
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const signup = async (user: any) => {
  try {
    const response = await request.post(`${USERS_API}/signup`, user);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const signin = async (credentials: User) => {
  try {
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const signout = async () => {
  try {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const profile = async () => {
  try {
    const response = await request.post(`${USERS_API}/profile`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};

export const getFollowers = async (username: string) => {
  try {
    const response = await request.get(`${USERS_API}/${username}/followers`);
    return response.data;
  }
  catch(e) {
    console.log(e)
  }
};
