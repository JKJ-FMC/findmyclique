import axios from 'axios';

const GET_USER_TO_GROUP = 'GET_USER_TO_GROUP';

const _getUserToGroup = (userToGroup) => {
  return {
    type: GET_USER_TO_GROUP,
    payload: userToGroup,
  };
};

export const getUserToGroup = () => {
  return async (dispatch) => {
    const userToGroup = await axios.get('/api/usergroups');
    dispatch(_getUserToGroup(userToGroup.data));
  };
};

export default function userToGroup(state = [], action) {
  switch (action.type) {
    case GET_USER_TO_GROUP:
      return action.payload;
    default:
      return state;
  }
}
