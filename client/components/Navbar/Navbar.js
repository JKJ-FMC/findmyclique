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
import GroupsIcon from '@mui/icons-material/Groups';
import UserForm from '../UserForm/UserForm';
import UserEvents from '../Events/UserEvents';
import Groups from '../Groups/Groups';
import './Navbar.css';

const Navbar = ({ handleClick, isLoggedIn }) => {
  // Profile Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Events Menu
  const [anchorElEvent, setAnchorElEvent] = useState(null);
  const openEvent = Boolean(anchorElEvent);

  const handleClickMenuEvent = (event) => {
    setAnchorElEvent(event.currentTarget);
  };

  const handleCloseEvent = () => {
    setAnchorElEvent(null);
  };

  // User Form Modal
  const [openFormModal, setOpenFormModal] = useState(false);

  const handleOpenFormModal = () => {
    setOpenFormModal(true);
  };

  const handleCloseFormModal = () => {
    setOpenFormModal(false);
  };

  // Events Form Modal
  const [openEventsModal, setOpenEventsModal] = useState(false);

  const handleOpenEventsModal = () => {
    setOpenEventsModal(true);
  };

  const handleCloseEventsModal = () => {
    setOpenEventsModal(false);
  };

  // Groups Form Modal
  const [openGroupsModal, setOpenGroupsModal] = useState(false);

  const handleOpenGroupsModal = () => {
    setOpenGroupsModal(true);
  };

  const handleCloseGroupsModal = () => {
    setOpenGroupsModal(false);
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
          EVENTS
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
                    sx={{ width: 26, height: 26 }}
                  />
                  <span onClick={handleOpenEventsModal}>My Events</span>
                </MenuItem>

                <MenuItem className="menu-item">
                  <GroupsIcon
                    className="menu-icon"
                    sx={{ width: 26, height: 26 }}
                  />
                  <span onClick={handleOpenGroupsModal}>My Groups</span>
                </MenuItem>

                <MenuItem className="menu-item" onClick={handleClose}>
                  <Avatar
                    className="menu-icon"
                    sx={{ width: 26, height: 26, bgcolor: '#310052' }}
                  />
                  <span onClick={handleOpenFormModal}>Edit Profile</span>
                </MenuItem>

                <MenuItem className="menu-item" onClick={handleClose}>
                  <Logout
                    className="menu-icon"
                    sx={{ width: 26, height: 26 }}
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
              <Dialog open={openFormModal} onClose={handleCloseFormModal}>
                <UserForm handleCloseFormModal={handleCloseFormModal} />
              </Dialog>
            </div>
            <div>
              <Dialog open={openEventsModal} onClose={handleCloseEventsModal}>
                <UserEvents handleCloseEventsModal={handleCloseEventsModal} />
              </Dialog>
            </div>
            <div>
              <Dialog open={openGroupsModal} onClose={handleCloseGroupsModal}>
                <Groups handleCloseGroupsModal={handleCloseGroupsModal} />
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
