import React, { useEffect, useState } from 'react';
import Carousel from './carousel';
import "./dashboard.css";
import { User } from '../Users/client';
import * as client from '../Users/client';

const Dashboard = () => {
  const [profile, setProfile] = useState<User>({ _id: "",
  username: "", password: "", displayname: "", avatar: "", bio: "",
  riotid: "", steamid: "", following: [], likes: [],});

  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    }
    catch (e) {
      console.log("Anonymous User");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-100">
      <div className='dashboard-header'>
        <h1>Dashboard</h1>
      </div>
      {!profile && <h3>User Recommended Games on Flammie!</h3>}
      {profile && <h3>Your Liked Games on Flammie!</h3>}
      <Carousel />
    </div>
  );
};
export default Dashboard;