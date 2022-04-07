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

  const likedUsers = useSelector((state) =>
    state.likedEvents.filter((ev) => ev.likedEventId === id)
  );

  const userId = useSelector((state) => state.auth.id);

  // console.log('LIKED USERS --->', likedUsers.length);

  useEffect(() => {}, []);
  const group = useSelector((state) => state.groups.users || []);
  console.log('groups -----> ', group);

  // console.log('groups -----> ', group);

  useEffect(() => {
    console.log(`LAT: ${currEvent.latitude}`);
    console.log(`LONG: ${currEvent.longitude}`);
  }, [currEvent.latitude]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserGroup(id, userId));
  }, []);

  console.log(id);

  if (!group) return;

  return (
    <div className="single-evnt">
      <div
        class="single-evnt-bg"
        style={{ backgroundImage: `url(${currEvent.largeImageUrl})` }}
      >
        <div class="bg-blur">
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

              <div className="evnt-groups">
                <h2>Your potential group members</h2>
                <AvatarGroup total={group.length}>
                  {group.map((user, i) => {
                    // const currUser = user.user;
                    return <Avatar src={user.imageUrl} />;
                  })}
                </AvatarGroup>
              </div>

              <div id="map">
                <EventMap
                  latitude={+currEvent.latitude}
                  longitude={+currEvent.longitude}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
