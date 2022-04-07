import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeEvent, unlikeEvent } from '../../store';
import './FeaturedEvent.css';
import dateFormat from 'dateformat';
import { toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

export default function FeaturedEvent({ event }) {
  const signUpToLike = () =>
    toast.error('Please login or signup to like this event', {
      autoClose: 2500,
      limit: 1,
    });

  const state = useSelector((state) => state);
  // console.log(state);

  const userId = useSelector((state) => state.auth.id);

  const likedEvents = useSelector((state) => state.likedEvents);

  const dispatch = useDispatch();

  const currEvent = (userId, eventId) => {
    return likedEvents.find(
      (evnt) => evnt.likedUserId === userId && evnt.likedEventId === eventId
    );
  };

  // console.log('CURR EVENT --->', event);

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
}
