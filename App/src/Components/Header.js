import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import logo from '../BridgingCulturesLogo.png';

const Header = (props) => {
  return (
    <ul className="header">
      <li><NavLink to="/cultures">Cultures</NavLink></li>
      <li><NavLink to="/events">Events</NavLink></li>
      <li><NavLink to="/food">Food</NavLink></li>
    </ul>
  );
}

export default Header;