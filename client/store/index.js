import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import events from './events';
import likedEvents from './likedEvents';
import likedUsers from './likedUsers';
import users from './users';
import groups from './groups';

import userToGroup from './userGroups';

import trivia from './trivia';


const reducer = combineReducers({
  events,
  likedEvents,
  likedUsers,
  users,
  auth,
  groups,
  userToGroup,
  trivia
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './auth';
export * from './events';
export * from './likedEvents';
export * from './users';
export * from './groups';
export * from './userGroups';
export * from './trivia';

