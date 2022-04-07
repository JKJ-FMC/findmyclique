import axios from 'axios';

const GET_LIKED_USERS = 'GET_LIKED_USERS';

const _getLikedUsers = (users) => {
  return {
    type: GET_LIKED_USERS,
    payload: users,
  };
};

export const getLikedUsers = (eventId) => {
  return async (dispatch) => {
    const users = (await axios.get(`/api/likedusers/${eventId}`)).data;
    dispatch(_getLikedUsers(users));
  };
};

export default function likedUsers(state = [], action) {
  switch (action.type) {
    case GET_LIKED_USERS:
      console.log('REDUCER', action.payload);
      return action.payload;
    default:
      return state;
  }
}
