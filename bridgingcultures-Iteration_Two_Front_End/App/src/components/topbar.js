import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';



import LogoHeader from "./logo_header.png";



class Topbar extends React.Component {

render() {
    return (
 


       


        <Navbar brand={<Link to="/"><a className='brand-logo-link' style={{ paddingLeft: '10px', textDecorationLine: 'none' }}><img style={{ paddingLeft: '10px', width: '35px', height: '35px ', cursor: 'pointer' }} src={LogoHeader} />Bridging Cultures</a ></Link>} alignLinks="right">
            <NavItem>
                <Link to="/">Home</Link>
</NavItem>
            <NavItem className="event_link_event_page">
                <Link to="/event">Events</Link>
</NavItem>
            <Dropdown trigger={<a >Explore Cultures<i className="material-icons right">arrow_drop_down</i></a>}>
                <li><Link to={{pathname:"/event", state:{country: "Australia"}}}>Australian</Link></li>
                <li><Link to={{pathname:"/event", state:{country: "China"}}}>Chinese</Link></li>
                <li><Link to={{pathname:"/event", state:{country: "India"}}}>India</Link></li>
                <li><Link to={{pathname:"/event", state:{country: "Japan"}}}>Japan</Link></li>
                <li><Link to={{pathname:"/event", state:{country: "Malaysia"}}}>Malaysian</Link></li>
                <li><Link to={{pathname:"/event", state:{country: "Italy"}}}>Italian</Link></li>

            </Dropdown>
            <NavItem>
                <Link to="/wish_list">Wishlist</Link>
            </NavItem>
        </Navbar>




         );

}
   

}

export default Topbar;


