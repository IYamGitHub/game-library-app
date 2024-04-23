import React from 'react';
import Carousel from './carousel';
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="w-100">
      <div className='dashboard-header'>
        <h1>Dashboard</h1>
      </div>
      <h3>Most Liked Games on Flammie!</h3>
      <Carousel />
    </div>
  );
};
export default Dashboard;