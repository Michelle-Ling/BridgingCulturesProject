import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink,
  HashRouter
} from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Events from "./Components/Pages/Events";
import Cultures from "./Components/Pages/Cultures";
import Food from "./Components/Pages/Food";
import logo from "./BridgingCulturesLogo.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "./Images/banner1.jpg";
import banner2 from "./Images/banner2.jpg"; 
import Tableau from "./Components/Tableau";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const placeholderStyle = {display: 'block', width: '1000px', height: '827px', margin: '0px', padding: '0px', border: 'none'};
    
    return (
      <BrowserRouter>
        <div>
          <div name="logo" align="left">
            <img src={logo} alt="logo" />
          </div>
          <Header />
          <div className="content">
            <Route path="/cultures" component={Cultures} />
            <Route path="/events" component={Events} />
            <Route path="/food" component={Food} />
          </div>
        <Tableau/>
        <Carousel arrows infiniteLoop>
            <div>
              <img src={banner1} />
            </div>
            <div>
              <img src={banner2} />
            </div>
          </Carousel>
          <Footer/>
          </div>
      </BrowserRouter>
      
      // <Tableau/>
      // <iframe src = "https://public.tableau.com/shared/NN2GWQS5P?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:loadOrderID=0"
      //       style={placeholderStyle}>
      //     </iframe>
      
    );
    const element = <Tableau />;
  }
 }

export default App;
