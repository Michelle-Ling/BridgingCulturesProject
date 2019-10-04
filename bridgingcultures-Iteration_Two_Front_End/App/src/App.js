import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/footer';
import Home from './components/home';
import Explore from './components/explore';
import Event from './components/event';
import Topbar from './components/topbar';
import EventLocate from './components/event_locate';
import Food from './components/food';
import TopbarHome from './components/topbar_home';
import RestaurantLocator from './components/restaurantlocator';
import FoodLocate from './components/food_locate';


class App extends React.Component {

    constructor(props) {

        super(props);

    }
    render() {
        return (
            <Router>
              
                <Switch>
                    <Route path="/" exact component={TopbarHome} />
                    <Route path="/event" component={Topbar} />
                    {/* <Route path="/explore" component={Topbar} /> */}
                    <Route path="/event_locate" component={Topbar} />
                    <Route path="/food" component={Topbar} />
                    <Route path="/food_locate" component={Topbar} />
                    <Route path="/restaurantlocator" component={Topbar} />
                </Switch>
                <Switch>
                   

                    <Route path="/" exact component={Home} />
             

                    <Route path="/event" component={Event} />
                    <Route path="/explore" component={Explore} />
                    {/* <Route path="/explore" component={Topbar} /> */}
                    <Route path="/food" component={Food} />
                    <Route path="/food_locate" component={FoodLocate} />
                    <Route path="/restaurantlocator" component={RestaurantLocator} />
                    <Route path="/event_locate" component={EventLocate} />
                    
                </Switch>

                    <Footer />
                

            </Router>
        );
    }
};

export default App;
