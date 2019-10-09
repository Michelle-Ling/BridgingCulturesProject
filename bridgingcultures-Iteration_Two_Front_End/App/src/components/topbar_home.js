import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';


import LogoHeader from "./logo_header.png";



class Topbar extends React.Component {

  render() {
    return (
 
        <Navbar brand={<Link to="/"><a className='brand-logo-link' style={{ paddingLeft: '10px', textDecorationLine: 'none' }}> <img style={{ paddingLeft: '10px' , width: '35px', height: '35px '}} src={LogoHeader}  />Bridging Cultures</a ></Link>} alignLinks="right">
           
        <NavItem>
              <Link to="/wish_list">Wishlist</Link>
          </NavItem>

        </Navbar>




         );


   
}
}

export default Topbar;


