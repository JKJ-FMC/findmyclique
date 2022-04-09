import axios from 'axios';

const GET_GROUPS = 'GET_GROUPS';
const GET_USER_GROUP = 'GET_USER_GROUP';

const _getGroups = (groups) => {
  return {
    type: GET_GROUPS,
    payload: groups,
  };
};

const _getUserGroup = (group) => {
  return {
    type: GET_USER_GROUP,
    payload: group,
  };
};

export const getGroups = () => {
  return async (dispatch) => {
    const groups = await axios.get('/api/groups');
    dispatch(_getGroups(groups.data));
  };
};

export const getUserGroup = (eventId, userId) => {
  return async (dispatch) => {
    const group = await axios.get(`/api/groups/${eventId}/${userId}`);
    console.log(group.data);
    dispatch(_getUserGroup(group.data));
  };
};

export default function groups(state = [], action) {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload;
    case GET_USER_GROUP:
      return action.payload;
    default:
      return state;
  }
}
