import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { injectStyle } from 'react-toastify/dist/inject-style';
import dateFormat from 'dateformat';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Favorite from '@mui/icons-material/Favorite';
import { likeEvent, unlikeEvent, getUserLikedEvents } from '../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import './UserEvents.css';

const UserEvents = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id) || 'not logged in';

  const user = useSelector((state) => state.users).filter(
    (user) => user.id === userId
  )[0];

  // const userEvents = user.events;
  // const userEvents = dispatch(getUserLikedEvents(userId));
  // console.log(userEvents)

  let likedEvents = useSelector((state) => state.likedEvents);

  likedEvents = likedEvents.filter((ev) => ev.likedUserId === userId);

  const currEvent = (userId, eventId) => {
    return likedEvents.find(
      (evnt) => evnt.likedUserId === userId && evnt.likedEventId === eventId
    );
  };

  const userEvents = [];

  for (let i = 0; i < likedEvents.length; i++) {
    let currEvent = likedEvents[i].event;
    userEvents.push(currEvent);
  }

  return (
    <div className="user-events-container">
      <Card
        className="user-events-card-wrap"
        sx={{ display: 'flex', width: '50%', minWidth: 610 }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h1 className="user-events-page-title">My Events</h1>
          {/* <div className="user-events-wrap"> */}
          {userEvents.map((event) => {
            return (
              <div key={event.id} className="user-event">
                {injectStyle()}
                <div className="user-event-item">
                  <Card
                    // className="user-event-item"
                    sx={{ display: 'flex', width: '100%' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }}
                      image={event.imageUrl}
                      alt={event.imageUrl}
                    />
                    <CardContent
                      className="user-event-content"

                      // sx={{ flex: '1 0 auto' }}
                    >
                      <div className="user-event-text">
                        <div className="user-event-title">
                          <h2>{event.name}</h2>
                        </div>
                        <div className="user-event-date-time">
                          <h4>
                            {dateFormat(event.date, 'longDate')} at{' '}
                            {event.startTime}
                          </h4>
                        </div>
                        <div
                          className="user-event-info"
                          style={{ fontStyle: 'italic' }}
                        >
                          {event.venueName}
                        </div>
                        <div className="user-event-info">{event.location}</div>
                      </div>
                      <div className="user-event-icons">
                        <div className="uEvent-icon">
                          <Link to={`/events/${event.city}/${event.id}`}>
                            <VisibilityIcon
                              fontSize="medium"
                              style={{ color: '#310052' }}
                              sx={{
                                color: '#f06543',
                                '&.Mui-checked': {
                                  color: '#f06543',
                                },
                              }}
                            />
                          </Link>
                        </div>
                        <div className="uEvent-icon">
                          <Checkbox
                            className="checkbox"
                            icon={<FavoriteBorder />}
                            checkedIcon={<DeleteForeverIcon />}
                            checked={!!currEvent(userId, event.id)}
                            onClick={() => (userId ? '' : signUpToLike())}
                            onChange={() => {
                              userId
                                ? !!currEvent(userId, event.id) === true
                                  ? dispatch(unlikeEvent(userId, event.id))
                                  : dispatch(likeEvent(userId, event.id))
                                : '';
                            }}
                            sx={{
                              color: '#f06543',
                              '&.Mui-checked': {
                                color: '#f06543',
                              },
                            }}
                            size="medium"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserEvents;
