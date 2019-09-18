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



class App extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            
            name: 'Hussain'
            
        }
    }
    render() {
        return (
            <Router>
              
                <Switch>
                    <Route path="/" exact component={TopbarHome} />
                    <Route path="/event" component={Topbar} />
                    <Route path="/explore" component={Topbar} />
                    <Route path="/event_locate" component={Topbar} />
                    <Route path="/food" component={Topbar} />
                </Switch>
                <Switch>
                   

                        <Route path="/" exact component={Home} />
             

                    <Route path="/event" component={Event} />
                    <Route path="/explore" component={Explore} />
                    <Route path="/event_locate" component={EventLocate} />
                    <Route path="/food" component={Food} />
                    
                </Switch>

                    <Footer />
                

            </Router>
        );
    }
};

export default App;
