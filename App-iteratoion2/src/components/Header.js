import React from "react";

import { Link, animateScroll as scroll } from "react-scroll";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navlogo from "../assets/img/logo_header.png";

const Header = () => {
  const scrollTo = id => e => {
    e.preventDefault();
    console.log("id", id);
    scroll.scrollTo({
      duration: 1500,
      delay: 100,
      smooth: "easeInOutQuint",
      containerId: id
    });
  };

  return (
    <header>
      <Navbar bg="none" expand="lg" fixed="top">
        <Container>
                  <Navbar.Brand
                      href="#home"
                      onClick={scrollTo("home")}
                      aria-label="Logo"
                  >
                      <img
                          src={Navlogo}
                          width="40"
                          height="40"

                          alt="NavLogo"
                      />
                      bridging cultures
          </Navbar.Brand>
                  

                  


                  
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span />
            <span />
            <span />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link
                href="#"
                className="nav-link"
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                Home
              </Link>
              <Link
                href="#"
                className="nav-link"
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                Explore a Culture
              </Link>
              <Link
                href="#"
                className="nav-link"
                activeClass="active"
                              to="calendar"
                spy={true}
                smooth={true}
                offset={0}
                duration={400}
              >
                Find an Event
              </Link>
                          <Link
                              href="#"
                              className="nav-link"
                              activeClass="active"
                              to="calendar"
                              spy={true}
                              smooth={true}
                              offset={0}
                              duration={400}
                          >
                              Wishlists
              </Link>
                          <Link
                              href="#"
                              className="nav-link"
                              activeClass="active"
                              to="contact"
                              spy={true}
                              smooth={true}
                              offset={0}
                              duration={400}
                          >
                             Play a Game
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
