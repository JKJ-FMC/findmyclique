import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SingleUserCard from './SingleUserCard';
import Fade from 'react-reveal/Fade';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import dateFormat from 'dateformat';
import './SingleGroup.css';

const SingleGroup = () => {
  const { eventId } = useParams();

  const currEvent = useSelector((state) =>
    state.events.find((event) => event.id === eventId)
  );

  console.log('curr event', currEvent);

  const users = useSelector((state) => state.users);

  const userId = useSelector((state) => state.auth.id) || '';

  const currGroup =
    useSelector((state) =>
      state.groups.find((group) => group.eventId === eventId)
    ) || '';

  const currGroupId = currGroup.id;

  const userToGroup = useSelector((state) =>
    state.userToGroup.filter((user) => user.groupId === currGroupId)
  );

  let groupUsers = [];

  userToGroup.forEach((utg) =>
    groupUsers.push(users.find((user) => user.id === utg.userId))
  );

  //   if (groupUsers.length) {
  //     groupUsers = groupUsers.filter((user) => user.id !== userId) || groupUsers;
  //   }

  console.log('group users', groupUsers);

  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    setSelectedUser(null);
  }, []);

  return (
    <div className="single-group">
      <div className="single-group-card">
        <div className="single-group-cont grp-item">
          <Card
            sx={{
              display: 'flex',
              width: 300,
              height: '80px',
              //   borderRadius: '50px',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 175 }}
              image={currEvent.imageUrl}
              alt={currEvent.imageUrl}
            />
            <CardContent
              className="grp-event-content"
              // sx={{ flex: '1 0 auto' }}
            >
              <div className="grp-event-text">
                <span className="grp-event-title">
                  <h3>{currEvent.name.split(' ').slice(0, 2).join(' ')}</h3>
                </span>
                <span className="grp-event-date-time">
                  <h3>{dateFormat(currEvent.date, 'shortDate')}</h3>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <Fade>
          <div className="single-group-cont grp-item">
            {groupUsers.map((user, idx) => {
              return (
                <div key={idx}>
                  <Avatar
                    className="single-group-img"
                    alt={user.imageUrl}
                    src={user.imageUrl}
                    sx={{ width: 60, height: 60 }}
                    onClick={() => {
                      setSelectedUser(user);
                      console.log(user.firstName);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Fade>
        <div className="grp-item">
          {selectedUser ? (
            <Fade>
              <SingleUserCard
                selectedUser={selectedUser}
                className="selected-user-card "
              />
            </Fade>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleGroup;
