import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../public/fmcWhiteLogo.png';
import logo2 from '../../../public/FMC_logo_black.png';
import {
  Instagram,
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  YouTube,
} from '@mui/icons-material';

import './Footer.css';

const Footer = () => {
  return (
    <div className="ft">
      <div className="ft-wrapper">
        <div className="ft-logo">
          <img src={logo2} />
        </div>
        <div className="ft-left">
          <div className="ft-headline">
            <h4>EVENTS</h4>
          </div>
          <Link className="ft-link-ft" to={'/events/nyc'}>
            <p>NEW YORK</p>
          </Link>
          <Link className="ft-link-ft" to={'/events/boston'}>
            <p>BOSTON</p>
          </Link>
          <Link className="ft-link-ft" to={'/events/philly'}>
            <p>PHILADELPHIA</p>
          </Link>
          <Link className="ft-link-ft" to={'/events/la'}>
            <p>LOS ANGELES</p>
          </Link>
          <Link className="ft-link-ft" to={'/events/chicago'}>
            <p>CHICAGO</p>
          </Link>
        </div>
        <div className="ft-center">
          <div className="ft-headline">
            <h4>GET IN TOUCH</h4>
          </div>
          <div className="ft-center-phone">
            <Phone />
            <p>{'(555)-555-5555'}</p>
          </div>
          <div className="ft-center-phone">
            <Email />
            <p>info@fmc.com</p>
          </div>
          <div className="ft-center-phone">
            <LocationOn />
            <p>5 Hanover Square 11th Floor, New York, NY</p>
          </div>
        </div>
        <div className="ft-right">
          <div className="ft-headline">
            <h4>FOLLOW US</h4>
          </div>
          <div className="ft-right-wrap">
            <div className="ft-center-phone">
              <Instagram style={{ cursor: 'pointer' }} />
            </div>
            <div className="ft-center-phone">
              <Twitter style={{ cursor: 'pointer' }} />
            </div>
            <div className="ft-center-phone">
              <Facebook style={{ cursor: 'pointer' }} />
            </div>
            <div className="ft-center-phone">
              <YouTube style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
