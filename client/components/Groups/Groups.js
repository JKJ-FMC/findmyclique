import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { injectStyle } from 'react-toastify/dist/inject-style';
import dateFormat from 'dateformat';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { likeEvent, unlikeEvent, getUserLikedEvents } from '../../store';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Groups.css';

const Groups = ({ handleCloseGroupsModal }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.id) || 'not logged in';

  const user = useSelector((state) => state.users).filter(
    (user) => user.id === userId
  )[0];

  const likedEvents = useSelector((state) =>
    state.likedEvents.filter((ev) => ev.likedUserId === userId)
  );

  const currEvent = (userId, eventId) => {
    return likedEvents.find(
      (evnt) => evnt.likedUserId === userId && evnt.likedEventId === eventId
    );
  };

  const userGroups = user.groups;

  //   console.log('USER IN GROUPS COMP --->', userGroups);

  const userEvents = [];

  for (let i = 0; i < likedEvents.length; i++) {
    let currEvent = likedEvents[i].event;
    userEvents.push(currEvent);
  }

  let g = [];
  userGroups.forEach((group) =>
    g.push(likedEvents.find((ev) => ev.id === group.eventId))
  );

  console.log('USER GROUP EVENTS --->', g);

  console.log('USER--->', user);

  return (
    <div className="group-events-container">
      <Card
        className="group-events-card-wrap"
        sx={{ display: 'flex', width: '50%', minWidth: 610 }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h1 className="group-events-page-title">My Groups</h1>
          {userEvents.map((event) => {
            return (
              <div key={event.id} className="group-event">
                {injectStyle()}
                <div className="group-event-item">
                  <Card sx={{ display: 'flex', width: '100%' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 150 }}
                      image={event.imageUrl}
                      alt={event.imageUrl}
                    />
                    <CardContent
                      className="group-event-content"
                      // sx={{ flex: '1 0 auto' }}
                    >
                      <div className="group-event-text">
                        <div className="group-event-title">
                          <h2>{event.name}</h2>
                        </div>
                        <div className="group-event-date-time">
                          <h4>
                            {dateFormat(event.date, 'longDate')} at{' '}
                            {event.startTime}
                          </h4>
                        </div>
                        <div
                          className="group-event-info"
                          style={{ fontStyle: 'italic' }}
                        >
                          {event.venueName}
                        </div>
                        <div className="group-event-info">{event.location}</div>
                      </div>
                      <div className="group-event-icons">
                        <div className="group-icon">
                          <Link to={`/events/${event.city}/${event.id}`}>
                            <VisibilityIcon
                              fontSize="medium"
                              onClick={() => handleCloseEventsModal()}
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
                        <div className="group-icon">
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

export default Groups;
