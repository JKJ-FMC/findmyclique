import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { injectStyle } from 'react-toastify/dist/inject-style';
import dateFormat from 'dateformat';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { likeEvent, unlikeEvent, getUserLikedEvents } from '../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';

const UserEvents = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id) || 'not logged in';

  const user = useSelector((state) => state.users).filter(
    (user) => user.id === userId
  )[0];

  // const userEvents = user.events;
  // const userEvents = dispatch(getUserLikedEvents(userId));
  // console.log(userEvents)

  let likedEvents = useSelector((state) =>
    state.likedEvents
  );

  likedEvents = likedEvents.filter((ev) => ev.likedUserId === userId)

  const currEvent = (userId, eventId) => {
    return likedEvents.find(
      (evnt) => evnt.likedUserId === userId && evnt.likedEventId === eventId
    );
  };

  const userEvents = [];

  for (let i = 0; i < likedEvents.length; i++) {
    let currEvent = likedEvents[i].event;
    userEvents.push(currEvent)
  };

  return userEvents.map((event) => {
    return (
      <div key={event.id} className="fEvent">
        {injectStyle()}
        <div className="fEvent-wrapper">
          <div>
            <img src={event.imageUrl} />
          </div>
          <div className="fEvent-title">
            <div>
              <h2>{event.name}</h2>
            </div>
            <div className="fEvent-date-time">
              <h4>
                {dateFormat(event.date, 'fullDate')} at {event.startTime}
              </h4>
            </div>
            <div className="fEvent-info" style={{ fontStyle: 'italic' }}>
              {event.venueName}
            </div>
            <div className="fEvent-info">{event.location}</div>
          </div>
        </div>
        <div className="fEvent-cover">
          <div className="fEvent-cover-icon">
            <Checkbox
              className="checkbox"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
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
              size="large"
            />
          </div>
          <div className="fEvent-cover-icon">
            <Link to={`/events/${event.city}/${event.id}`}>
              <VisibilityIcon fontSize="large" style={{ color: '#310052' }} />
            </Link>
          </div>
        </div>
      </div>
    );
  });
};

export default UserEvents;
