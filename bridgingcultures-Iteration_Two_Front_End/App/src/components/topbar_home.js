import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';


import LogoHeader from "./logo_header.png";



class Topbar extends React.Component {

	render() {
    return (
 
        <Navbar brand={<Link to="/"><a className='brand-logo-link' style={{ paddingLeft: '10px', textDecorationLine: 'none' }}> <img style={{ paddingLeft: '10px' , width: '35px', height: '35px '}} src={LogoHeader}  />Bridging Cultures</a ></Link>} alignLinks="right">
           
          {/*<NavItem><select id="gg_translate_drop_topbar_home"  style={{display:'block'}}><option value="">Select Language</option><option value="en|ar">Arabic</option><option value="en|zh-CN">Chinese (Simplified)</option><option value="en|en">English</option><option value="en|hi">Hindi</option><option value="en|ms">Malay</option><option value="en|es">Spanish</option><option value="en|ta">Tamil</option></select></NavItem>*/}

        </Navbar>




         );


   
}
}

export default Topbar;


