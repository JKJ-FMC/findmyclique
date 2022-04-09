import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/Login_Signup/Login_Page';
import Home from './components/Home';
import Events from '../client/components/Events/Events';
import { me } from './store';
import { getEvents, getLikedEvents, getUsers } from './store';
import SingleEvent from './components/Events/SingleEvent';
import UserEvents from './components/Events/UserEvents';
import Chat from './components/Chat/Chat';
import { ToastContainer, Slide } from 'react-toastify';
import axios from 'axios';
import { Search } from './components/Navbar/Search';
import Quiz from './components/Events/Quiz';
import NewSearch from './components/Navbar/NewSearch';
import ChatWindow from './components/Chat/ChatWindow';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
    this.props.getLikes();
    const seedAlgolia = async () => {
      const res = await axios.get('/api/events/seedAlgolia');
      // console.log(res.data);
    };
    // const seedLikes = async () => {
    //   const res = await axios.get('/api/events/seed');
    //   this.props.getLikes();

    //   console.log(res.data);
    // };
    seedAlgolia();
    // seedLikes();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.likedEvents.length !== this.props.likedEvents.length) {
      this.props.getLikes();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/events/:city/:id" component={SingleEvent} />
            <Route exact path="/events/sort/concert/:city" component={Events} />
            <Route exact path="/events/sort/comedy/:city" component={Events} />
            <Route exact path="/events/sort/sports/:city" component={Events} />
            <Route
              exact
              path="/events/sort/food-drink/:city"
              component={Events}
            />
            <Route exact path="/events/:city" component={Events} />
            <Route exact path="/myevents/:id" component={UserEvents} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/chatwindow" component={ChatWindow} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/newsearch" component={NewSearch} />
            <Route exact path="/trivia" component={Quiz} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/events/:city/:id" component={SingleEvent} />
            <Route exact path="/events/sort/concert/:city" component={Events} />
            <Route exact path="/events/sort/comedy/:city" component={Events} />
            <Route exact path="/events/sort/sports/:city" component={Events} />
            <Route
              exact
              path="/events/sort/food-drink/:city"
              component={Events}
            />
            <Route exact path="/events/:city" component={Events} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/newsearch" component={NewSearch} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/chat" component={Chat} />
            <Route exact path="/chatwindow" component={ChatWindow} />

            <Route exact path="/" component={Login} />
            <Redirect to="/home" />
            {/* <Redirect to="/login" /> */}
          </Switch>
        )}
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          transition={Slide}
          limit={1}
        />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    ...state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(getEvents());
      dispatch(getUsers());
    },
    getLikes() {
      dispatch(getLikedEvents());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
