import axios from 'axios';

const GET_LIKED_EVENTS = 'GET_LIKED_EVENTS';
const GET_USER_LIKED_EVENTS = 'GET_USER_LIKED_EVENTS';
const LIKE_EVENT = 'LIKE_EVENT';
const UNLIKE_EVENT = 'UNLIKE_EVENT';

const _getLikedEvents = (likedEvents) => {
  return {
    type: GET_LIKED_EVENTS,
    likedEvents,
  };
};

const _getUserLikedEvents = (userLikedEvents) => {
  return {
    type: GET_USER_LIKED_EVENTS,
    payload: userLikedEvents,
  };
};

const _likeEvent = (eventId) => {
  return {
    type: LIKE_EVENT,
    eventId,
  };
};

const _unlikeEvent = (userId, eventId) => {
  return {
    type: UNLIKE_EVENT,
    userId,
    eventId,
  };
};

export const getLikedEvents = () => {
  return async (dispatch) => {
    const likedEvents = await axios.get('/api/likedevents');
    dispatch(_getLikedEvents(likedEvents.data));
  };
};

export const getUserLikedEvents = (userId) => {
  return async (dispatch) => {
    const likedEvents = await axios.get(`/api/likedevents/${userId}`);
    dispatch(_getUserLikedEvents(likedEvents.data));
  };
};

export const likeEvent = (userId, eventId) => {
  return async (dispatch) => {
    const likedEvent = (
      await axios.post('/api/likedevents', {
        likedUserId: userId,
        likedEventId: eventId,
      })
    ).data;
    dispatch(_likeEvent(likedEvent));
  };
};

export const unlikeEvent = (userId, eventId) => {
  return async (dispatch) => {
    await axios.delete(`/api/likedevents/${userId}/${eventId}`);
    dispatch(_unlikeEvent(userId, eventId));
  };
};

export default function likedEvents(state = [], action) {
  switch (action.type) {
    case GET_LIKED_EVENTS:
      return action.likedEvents;
    case GET_USER_LIKED_EVENTS:
      return action.payload;
    case LIKE_EVENT:
      return [...state, action.eventId];
    case UNLIKE_EVENT:
      return state.filter(
        (event) =>
          event.likedUserId !== action.userId &&
          event.likedEventId !== action.eventId
      );
    default:
      return state;
  }
}
