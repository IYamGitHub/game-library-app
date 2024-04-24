import React, { useState } from 'react';
import Nav from '../Components/Nav/nav';
import FollowersList from '../LoggedIn/FollowersList/followerPanel';
import '../LoggedIn/index.css';
import Carousel from './carousel';

const AnonymousDashboard = () => {
  const [navRefresh, setNavRefresh] = useState(false);
  const refreshNav = () => {
    setNavRefresh(!navRefresh);
  };

  return (
    <div className="d-flex h-100">
      <div className="h-100 page">
        <Nav showNav={false} />
        <div className="content bg-content">
            <div className="w-100">
            <div className='dashboard-header'>
                <h1>Dashboard</h1>
            </div>
            <h3>User Recommended Games on Flammie!</h3>
            <Carousel />
            </div>
        </div>
      </div>
      <FollowersList refresh={navRefresh} />
    </div>
  );
};
export default AnonymousDashboard;
