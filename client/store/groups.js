import axios from 'axios';

const GET_USER_GROUP = 'GET_USER_GROUP';

const _getUserGroup = (group) => {
  return {
    type: GET_USER_GROUP,
    payload: group,
  };
};

export const getUserGroup = (eventId, userId) => {
  return async (dispatch) => {
    const group = await axios.get(`/api/groups/${eventId}/${userId}`);
    console.log(group.data);
    dispatch(_getUserGroup(group.data));
  };
};

export default function groupReducer(state = {}, action) {
  switch (action.type) {
    case GET_USER_GROUP:
      return action.payload;
    default:
      return state;
  }
}
