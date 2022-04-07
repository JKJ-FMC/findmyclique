import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import FeaturedEvent from './Events/FeaturedEvent';
import HomeImage from '../../public/AdobeStockHome.jpeg';
import Fade from 'react-reveal/Fade';

const Home = () => {
  // const { username } = useSelector((state) => state.auth);
  const events = useSelector((state) => state.events);
  const [count, setCount] = useState(0);
  const categories = ['Concerts', 'Sports', 'Festivals'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(
        count < categories.length - 1
          ? count + 1
          : count - (categories.length - 1)
      );
    }, 3000);

    return () => clearInterval(interval);
  });

  return (
    <div>
      {/* <h1 className="header-1">
        Choose your category{" "}
        <span className="cat-change">{categories[count]} </span>{" "}
      </h1> */}

      <div className="home-top">
        <img className="home-bg" src={HomeImage} />
        <div className="home-img-txt">FIND MY CLIQUE</div>
      </div>
      <h1
        style={{
          textAlign: 'center',
          // backgroundColor: 'black',
          // color: 'white',
        }}
      >
        Trending Events
      </h1>
      <div className="trendEvents">
        {events.slice(0, 3).map((ev, i) => (
          <FeaturedEvent className="trendEvent" key={i} event={ev} />
        ))}
      </div>
    </div>
  );
};

export default Home;
