import React from 'react';
import '../css/style.css';
import '../css/materialize.css';
import '../css/materialize.min.css';
import { Parallax, Card, CardTitle, Row, Col } from 'react-materialize';
import { Link } from "react-router-dom";

import Search from "./Search"


import landingBannerMaldives from './banner_landing_maldives.jpg';
import landingBannerOperahouse from './banner_landing_operahouse.jpg';


const divStyle = {
    
    backgroundSize: 'cover',
    
};

class Home extends React.Component {

    render() {

        return (                                

            <div>

                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container">
                            <br></br>
                            <h1 className="header center white-text-banner">reconnect to your roots</h1>
             
                          < Search />

      </div>
    </div>
                    <Parallax className="parallax" image={<img src={landingBannerOperahouse}/>} alt="Unsplashed background img 1"></Parallax>
                        
                                </div>


                                <div className="container">
                    <div className="section">
                        <div className="container">
                            <div className="row center">
                                <h5 className="header col s12 light">Explore a Culture</h5>
                            </div>
                        </div>

                        <Row>
                            <Col m={6} s={12}>
                                <Card header={<CardTitle />} actions={[<Link to={{pathname:"/event", state:{country: "Australia"}}}>look-out an event</Link>]}>
                                    thumbnail for Australian Culture
                                </Card>
                            </Col>

                            {/*<Col m={6} s={12}>
                                <Card header={<CardTitle />} actions={[<Link to={{pathname:"/event", state:{country: "New Zealand"}}}>look-out an event</Link>]}>
                                    thumbnail for New Zeland Culture
                                </Card>
                            </Col>*/}

                            <Col m={6} s={12}>
                                <Card header={<CardTitle />} actions={[<Link to={{pathname:"/event", state:{country: "China"}}}>look-out an event</Link>]}>
                                    thumbnail for Chinese Culture
                                </Card>
                            </Col>
                            <Col m={6} s={12}>
                                <Card header={<CardTitle />} actions={[<Link to={{pathname:"/event", state:{country: "India"}}}>look-out an event</Link>]}>
                                    thumbnail for Indian Culture
                                </Card>
                            </Col>
                        </Row>











                
                        </div>
                           
                               
                            </div> 
                                  
          
                            

                                <div classNameName="parallax-container valign-wrapper">
                                    <div className="section no-pad-bot">
                                        
                                    </div>
                    <Parallax className="parallax" image={<img src={landingBannerMaldives} />} alt="Unsplashed background img 2"></Parallax>
                                    </div>

                                    <div className="container">
                                        <div className="section">

                                            <div className="row">
                                                <div className="col s12 center">
                                                    <h3><i className="mdi-content-send brown-text"></i></h3>
                                                    <h4>Our Mission</h4>
                                                    <p className="left-align light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc nec volutpat. Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut ultricies eros. Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem neque, posuere et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu mattis nisl maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed ipsum ac, gravida ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
                                                </div>
                                            </div>

                                        </div>
                </div>
                {/*{this.props.name}'s EVENTS MAPS PAGE*/}
                        </div>


                                   

        );

    }

}

export default Home;