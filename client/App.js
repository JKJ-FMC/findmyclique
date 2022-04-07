import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';
import Footer from './components/Footer/Footer';
import ScrollToTop from 'react-scroll-to-top';
import { getLikedEvents } from './store';

const App = () => {
  const location = useLocation().pathname;

  return (
    <div>
      <ScrollToTop smooth style={{ zIndex: 7 }} />
      {location === '/login' ? '' : <Navbar />}
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
