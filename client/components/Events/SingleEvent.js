import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLikedUsers } from '../../store/likedUsers';
import { Loader } from '@googlemaps/js-api-loader';
import pic from '../../../public/default.png';
import EventMap from './EventMap';
import { getUserGroup } from '../../store/groups';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import './SingleEvent.css';

export default function SingleEvent() {
  const { id } = useParams();
  const currEvent = useSelector(
    (state) => state.events.find((ev) => ev.id === id) || {}
  );
  if (!currEvent) return null;

  console.log(currEvent);

  const likedUsers = useSelector((state) =>
    state.likedEvents.filter((ev) => ev.likedEventId === id)
  );

  const userId = useSelector((state) => state.auth.id);

  const [group, setGroup] = useState([]);

  const currGroup =
    useSelector((state) =>
      state.groups.find((group) => group.eventId === id)
    ) || [];

  useEffect(() => {
    console.log('NEW GROUP', currGroup);
    setGroup(currGroup);
  }, [currGroup.length]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserGroup(id, userId));
  }, []);

  return (
    <div className="single-evnt">
      <div
        className="single-evnt-bg"
        style={{ backgroundImage: `url(${currEvent.largeImageUrl})` }}
      >
        <div className="bg-blur">
          <Card
            className="single-evnt-card"
            sx={{ width: 950, height: 1200, maxWidth: 950, maxHeight: 1400 }}
          >
            <CardMedia
              component="img"
              height="500"
              image={currEvent.largeImageUrl}
              alt={currEvent.largeImageUrl}
            />
            <CardContent>
              <div>
                <h1>{currEvent.name}</h1>
                <div>{currEvent.category}</div>
                <div>{currEvent.description}</div>
                <div>
                  <a href={currEvent.ticketUrl}>Ticket Info</a>
                </div>
              </div>
              {/* </CardContent> */}
              {group.users ? (
                <div className="evnt-groups">
                  <h2>Your group members</h2>
                  <AvatarGroup total={group.users.length}>
                    {group.users.map((user, i) => {
                      // const currUser = user.user;
                      return <Avatar key={i} src={user.imageUrl} />;
                    })}
                  </AvatarGroup>
                </div>
              ) : (
                <div className="evnt-groups">
                  <h2>Your potential group members</h2>
                  <AvatarGroup total={likedUsers.length}>
                    {likedUsers.map((user, i) => {
                      // const currUser = user.user;
                      return <Avatar key={i} src={user.imageUrl} />;
                    })}
                  </AvatarGroup>
                </div>
              )}

              {currEvent.latitude && (
                <div id="map">
                  <EventMap
                    latitude={+currEvent.latitude}
                    longitude={+currEvent.longitude}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
