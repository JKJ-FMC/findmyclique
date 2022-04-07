import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store';
import Logo from '../../../public/fmc_nav.png';
import {
  MenuItem,
  Avatar,
  Menu,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import FestivalIcon from '@mui/icons-material/Festival';
import UserForm from '../UserForm/UserForm';
import './Navbar.css';

const Navbar = ({ handleClick, isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorElEvent, setAnchorElEvent] = useState(null);
  const openEvent = Boolean(anchorElEvent);

  const handleClickMenuEvent = (event) => {
    setAnchorElEvent(event.currentTarget);
  };

  const handleCloseEvent = () => {
    setAnchorElEvent(null);
  };

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const userId = useSelector((state) => state.auth.id);

  return (
    <div className="nav-bar">
      <div className="navbar-img">
        <Link className="nav-links" to="/home">
          <img src={Logo} className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-wrap">
        <div
          id="basic-button"
          className="nav-links hover-underline-animation"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickMenuEvent}
          style={{ cursor: 'pointer' }}
        >
          {/* <Link className="nav-links hover-underline-animation" to="/events"> */}
          EVENTS
          {/* </Link> */}
        </div>
        <div>
          <Menu
            className="menu"
            id="basic-menu"
            anchorEl={anchorElEvent}
            open={openEvent}
            onClose={handleCloseEvent}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem className="menu-item" onClick={handleCloseEvent}>
              <Link to="/events/boston">
                <span>Boston Events</span>
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleCloseEvent}>
              <Link to="/events/chicago">
                <span>Chicago Events</span>
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleCloseEvent}>
              <Link to="/events/la">
                <span>Los Angeles Events</span>
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleCloseEvent}>
              <Link to="/events/nyc">
                <span>New York Events</span>
              </Link>
            </MenuItem>
            <MenuItem className="menu-item" onClick={handleCloseEvent}>
              <Link to="/events/philly">
                <span>Philadelphia Events</span>
              </Link>
            </MenuItem>
          </Menu>
        </div>
        {!isLoggedIn ? (
          <div>
            <Link to="/login" className="nav-links hover-underline-animation">
              LOGIN
            </Link>
            <Link className="nav-links hover-underline-animation" to="/signup">
              SIGN UP
            </Link>
          </div>
        ) : (
          <div>
            <div
              id="basic-button"
              className="nav-links hover-underline-animation"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClickMenu}
              style={{ cursor: 'pointer' }}
            >
              PROFILE
            </div>
            <div>
              <Menu
                className="menu"
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem className="menu-item" onClick={handleClose}>
                  <FestivalIcon
                    className="menu-icon"
                    sx={{ width: 24, height: 24 }}
                  />
                  <Link to={`/myevents/${userId}`}>
                    <span>My Events</span>
                  </Link>
                </MenuItem>
                <MenuItem className="menu-item" onClick={handleClose}>
                  <Avatar
                    className="menu-icon"
                    sx={{ width: 24, height: 24, bgcolor: '#310052' }}
                  />
                  <span onClick={handleOpenModal}>Edit Profile</span>
                </MenuItem>
                <MenuItem className="menu-item" onClick={handleClose}>
                  <Logout
                    className="menu-icon"
                    sx={{ width: 24, height: 24 }}
                  />
                  <Link
                    to="/"
                    onClick={handleClick}
                    style={{ color: '#310052', textDecoration: 'none' }}
                  >
                    <span>Logout</span>
                  </Link>
                </MenuItem>
              </Menu>
            </div>
            <div>
              <Dialog open={openModal} onClose={handleCloseModal}>
                <UserForm handleCloseModal={handleCloseModal} />
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
