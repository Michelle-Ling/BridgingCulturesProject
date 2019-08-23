import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Link, NavLink, HashRouter } from 'react-router-dom';
import './App.css';
import Intro from './Intro';
import Header from './Components/Header';
import Grid from './Components/Grid';
import Footer from './Components/Footer'; 
import Events from './Components/Pages/Events';
import Cultures from './Components/Pages/Cultures';
import Food from './Components/Pages/Food';
import logo from './BridgingCulturesLogo.png';


class App extends Component {
  constructor (props) {
    super (props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <div name="logo" align="left">
          <img src={logo} alt="logo" />
        </div>
          <Header/>
          <div className="content">
            <Route path="/cultures" component={Cultures}/>
            <Route path="/events" component={Events}/>
            <Route path="/food" component={Food}/>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
 }



export default App;
