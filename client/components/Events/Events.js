import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Events.css';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import FeaturedEvent from './FeaturedEvent';
import { Paginator } from './Paginator';
import NYC_IMG from '../../../public/AdobeStock_NYC.jpeg';
import BOSTON_IMG from '../../../public/AdobeStock_Boston.jpeg';
import LA_IMG from '../../../public/AdobeStock_LA.jpeg';
import PHILLY_IMG from '../../../public/AdobeStock_Philly.jpeg';
import CHICAGO_IMG from '../../../public/AdobeStock_Chicago.jpeg';
import Button from '@mui/material/Button';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MoodIcon from '@mui/icons-material/Mood';
import FestivalIcon from '@mui/icons-material/Festival';

export default function Events() {
  const events = useSelector((state) => state.events);
  const match = useRouteMatch();

  const dispatch = useDispatch();

  const location = useLocation();

  const cityPhotos = {
    nyc: NYC_IMG,
    boston: BOSTON_IMG,
    la: LA_IMG,
    philly: PHILLY_IMG,
    chicago: CHICAGO_IMG,
  };

  // EVENTS BY CATEGORY:
  // const music = events.filter(
  //   (ev) => ev.category === 'concert' || ev.category === 'Music'
  // );

  // console.log('MUSIC EVENTS', music);
  // const comedy = events.filter(
  //   (ev) =>
  //     ev.category === 'comedy' ||
  //     ev.category === 'Performing & Visual Arts' ||
  //     ev.category === 'Film, Media & Entertainment'
  // );

  // const sports = events.filter(
  //   (ev) => ev.category === 'sports' || ev.category === 'Sports & Fitness'
  // );

  // const foodDrink = events.filter((ev) => ev.category === 'Food & Drink');

  const [allEvents, setAllEvents] = useState(events);

  let currentEvents = !allEvents.length ? events : allEvents;

  let currCity;

  if (match.params.city) {
    const field = match.params.city;
    if (field === 'nyc') {
      currentEvents = [...events].filter((event) => event.city === 'nyc');
      currCity = 'nyc';
    } else if (field === 'boston') {
      currentEvents = [...events].filter((event) => event.city === 'boston');
      currCity = 'boston';
    } else if (field === 'philly') {
      currentEvents = [...events].filter((event) => event.city === 'philly');
      currCity = 'philly';
    } else if (field === 'la') {
      currentEvents = [...events].filter((event) => event.city === 'la');
      currCity = 'la';
    } else if (field === 'chicago') {
      currentEvents = [...events].filter((event) => event.city === 'chicago');
      currCity = 'chicago';
    } else {
      currentEvents = [...events];
    }
  }

  if (location.pathname === `/events/sort/concert/${currCity}`) {
    currentEvents = [...events].filter(
      (event) => event.category === 'concert' && event.city === currCity
    );
  } else if (location.pathname === `/events/sort/comedy/${currCity}`) {
    currentEvents = [...events].filter(
      (event) => event.category === 'comedy' && event.city === currCity
    );
  } else if (location.pathname === `/events/sort/sports/${currCity}`) {
    currentEvents = [...events].filter(
      (event) => event.category === 'sports' && event.city === currCity
    );
  } else if (location.pathname === `/events/sort/food-drink/${currCity}`) {
    currentEvents = [...events].filter(
      (event) => event.category === 'food-drink' && event.city === currCity
    );
  }

  console.log('CURR EVENTS', currentEvents);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = currentEvents.slice(indexOfFirstPost, indexOfLastPost);

  if (!events) return null;

  // console.log('MUSIC -->', music);
  // console.log('COMEDY -->', comedy);
  // console.log('SPORTS -->', sports);
  // console.log('FOOD & DRINK -->', foodDrink);

  // console.log('EVENTS', events);

  return (
    <div className="event-page-container">
      <div className="event-page-header">
        <img
          src={currCity in cityPhotos ? cityPhotos[currCity] : ''}
          className="event-header-img"
        />
        <div className="event-header-img-txt">
          <span>{currCity.toUpperCase()} EVENTS</span>
        </div>
      </div>
      <div className="event-page-buttons">
        <Link to={`/events/${currCity}`}>
          <Button
            className="event-page-button"
            variant="outlined"
            endIcon={<FestivalIcon />}
            sx={{
              fontSize: 'medium',
              color: '#f06543',
              borderColor: '#f06543',
              '&:hover': {
                backgroundColor: '#f06543',
                color: '#310052',
                borderColor: '#f06543',
              },
            }}
          >
            ALL EVENTS
          </Button>
        </Link>
        <Link to={`/events/sort/concert/${currCity}`}>
          <Button
            className="event-page-button"
            onClick={() => setCurrentPage(1)}
            variant="outlined"
            endIcon={<MusicNoteIcon />}
            sx={{
              fontSize: 'medium',
              color: '#f06543',
              borderColor: '#f06543',
              '&:hover': {
                backgroundColor: '#f06543',
                color: '#310052',
                borderColor: '#f06543',
              },
            }}
          >
            CONCERTS
          </Button>
        </Link>
        <Link to={`/events/sort/sports/${currCity}`}>
          <Button
            className="event-page-button"
            onClick={() => setCurrentPage(1)}
            variant="outlined"
            endIcon={<SportsBasketballIcon />}
            sx={{
              fontSize: 'medium',
              color: '#f06543',
              borderColor: '#f06543',
              '&:hover': {
                backgroundColor: '#f06543',
                color: '#310052',
                borderColor: '#f06543',
              },
            }}
          >
            SPORTS
          </Button>
        </Link>
        <Link to={`/events/sort/comedy/${currCity}`}>
          <Button
            className="event-page-button"
            onClick={() => setCurrentPage(1)}
            variant="outlined"
            endIcon={<MoodIcon />}
            sx={{
              fontSize: 'medium',
              color: '#f06543',
              borderColor: '#f06543',
              '&:hover': {
                backgroundColor: '#f06543',
                color: '#310052',
                borderColor: '#f06543',
              },
            }}
          >
            COMEDY
          </Button>
        </Link>
        <Link to={`/events/sort/food-drink/${currCity}`}>
          <Button
            className="event-page-button"
            onClick={() => setCurrentPage(1)}
            variant="outlined"
            endIcon={<FastfoodIcon />}
            sx={{
              fontSize: 'medium',
              color: '#f06543',
              borderColor: '#f06543',
              '&:hover': {
                backgroundColor: '#f06543',
                color: '#310052',
                borderColor: '#f06543',
              },
            }}
          >
            FOOD & DRINK
          </Button>
        </Link>
      </div>
      <div className="trendEvents">
        {currentPosts.map((event, i) => (
          <FeaturedEvent event={event} className="trendEvent" key={i} />
        ))}
      </div>
      <div className="pagContainer">
        <Paginator
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={postsPerPage}
          totalPosts={currentEvents.length}
        />
      </div>
    </div>
  );
}
