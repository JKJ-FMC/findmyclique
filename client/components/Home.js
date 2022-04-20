import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import FeaturedEvent from './Events/FeaturedEvent';
import HomeImage from '../../public/AdobeStockHome.jpeg';
import TrendingEvents from './TrendingEvents';

const Home = () => {
  const events = useSelector((state) => state.events) || [];

  return (
    <div className="home">
      <div className="home-top">
        <img className="home-bg" src={HomeImage} />
        <div className="home-img-txt">FIND MY CLIQUE</div>
      </div>
      <div className="home-title-box">
        <h1 className="home-title">Trending Events</h1>
      </div>
      <TrendingEvents />
    </div>
  );
};

export default Home;
