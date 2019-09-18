import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';



import LogoHeader from "./logo_header.png";



const Topbar = props => {
 

    return (
 


       


        <Navbar brand={<a style={{ paddingLeft:'10px' }}>Bridging Cultures</a >} alignLinks="right">
            <NavItem>
                <Link to="/">Home</Link>
</NavItem>
            <NavItem >
                <Link to="/event">Events</Link>
</NavItem>
            <Dropdown trigger={<a >Explore Cultures<i class="material-icons right">arrow_drop_down</i></a>}>
                <li><a href="#!">Australian</a></li>
                <li><a href="#!">New Zeland</a></li>
                <li><a href="#!">British</a></li>
                <li><a href="#!">Chinese</a></li>
                <li><a href="#!">Indian</a></li>
                

            </Dropdown>
        </Navbar>




         );


   

}

export default Topbar;


