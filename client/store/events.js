import axios from 'axios';

const GET_EVENT = 'GET_EVENT';

const _getEvents = (events) => {
  return {
    type: GET_EVENT,
    payload: events,
  };
};

export const getEvents = () => {
  return async (dispatch) => {
    const events = await axios.get('/api/events');
    dispatch(_getEvents(events.data));
  };
};

export default function events(state = [], action) {
  switch (action.type) {
    case GET_EVENT:
      return action.payload;
    default:
      return state;
  }
}
