import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import SingleUserCard from './SingleUserCard';
import Fade from 'react-reveal/Fade';
import './SingleGroup.css';

const SingleGroup = () => {
  const { eventId } = useParams();

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
    setSelectedUser(groupUsers[0]);
  }, []);

  return (
    <div className="single-group">
      <div className="single-group-card">
        <Fade>
          <div className="single-group-cont">
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

        <div>
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
