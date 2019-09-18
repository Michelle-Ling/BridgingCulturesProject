import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';



import LogoHeader from "./logo_header.png";



const Topbar = props => {
 

    return (
 


       


        <Navbar brand={<a style={{ paddingLeft:'10px' }}>Bridging Cultures</a >} alignLinks="right">
           
            <NavItem >
                <Link to="/event">Wishlist</Link>
</NavItem>
            
        </Navbar>




         );


   

}

export default Topbar;


