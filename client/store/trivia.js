import axios from 'axios';

const GET_TRIVIA = 'GET_TRIVIA';

const _getTrivia = (trivia) => {
  return {
    type: GET_TRIVIA,
    payload: trivia
  };
};

export const getTrivia = (eventId) => {
  return async(dispatch) => {
    const trivia = (await axios.get(`/api/trivia/${eventId}`)).data;
    dispatch(_getTrivia(trivia));
  };
};

const initialState = {
  eventTrivia: []
};

export default function(state=initialState, action) {
  switch(action){
    case GET_TRIVIA:
      return { eventTrivia: action.payload }
    default:
      return state;
  };
};
