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
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './Groups.css';

const Groups = ({ handleCloseGroupsModal, events }) => {
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

  const userGroupEvents = [];

  userGroups.forEach((group) =>
    userGroupEvents.push(events.find((event) => event.id === group.eventId))
  );

  console.log('USER GROUP EVENTS', userGroupEvents);

  return (
    <div className="group-events-container">
      <Card
        className="group-events-card-wrap"
        sx={{ display: 'flex', width: '50%', minWidth: 610 }}
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <h1 className="group-events-page-title">My Groups</h1>
          {userGroupEvents.map((event) => {
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
                        <div>
                          <Link to={`/groups/${event.id}`}>
                            <Button
                              onClick={() => handleCloseGroupsModal()}
                              color="secondary"
                            >
                              View My Group
                            </Button>
                          </Link>
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
