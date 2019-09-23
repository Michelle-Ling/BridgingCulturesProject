import React from 'react';
import '../css/style.css';
import '../css/materialize.css';
import '../css/materialize.min.css';
import { Parallax, Card, CardTitle, Row, Col, Caption } from 'react-materialize';
import { Link } from "react-router-dom";

import landingBannerMaldives from './banner_landing_maldives.png';
import landingBannerJapan from './banner_landing_japan.jpg';
import card_australia from './card_aussie.png';
import card_japan from './card_japan.jpg';
import card_china from './card_china.png';
import card_india from './card_india.png';




class Home extends React.Component {

    render() {

        return (                                

            <div>
              

                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container " >
                           
                            <div className="banner_header">  
                            <Caption>
                                <h3>
                                    Discover your Roots - Explore your Culture
</h3>
                                <h5 className="light grey-text text-lighten-3">
                                   Australia is said to be a cultural melting pot. There were several waves of foreign migrations over the last seven decades
                                     that have shaped the diverse culture of Australia today. Our mission is to help all people who have just called Australia home, whether temporary or permanent, to discover the cultural celebratory events that take place in the
                                      city they live so that they can get exposure to the dominant cultures present in Australia
</h5>
                                </Caption>
                                </div>
                      

      </div>
    </div>
                        <Parallax className="parallax" image={<img src={landingBannerJapan} className="div.inner-box"/>} alt="Unsplashed background img 1"></Parallax>
                        
                  
                    </div>

                <br></br>
                                <div className="container">
                    <div className="section">
                        <div className="container">
                            <div className="row center">
                                <div className="col s12 center">
                                <h4 className = "align-center">eXplore a Culture</h4>
                            </div>
                            </div>
                        </div>
                        <div className="culture_tiles">
                        <Row >
                                <Col className="fixed-size-card">

                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_australia} card-image="true" waves="waves" />}

                                   
                                    actions={[<Link to={{ pathname: "/event", state: { country: "Australia" } }}  >view events</Link>]} >

                                    <h5 >AUSTRALIA</h5>
                                </Card>
                            </Col>

                                <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_japan} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "Japan" } }}>view events</Link>]}>
                                    <h5 >JAPAN</h5>
                                </Card>
                            </Col>

                                <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_china} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "China" } }}>view events</Link>]}>
                                    <h5 >CHINA</h5>
                                </Card>
                            </Col>
                                <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_india} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "India" } }} className="center" > view events </Link>]}>
                                    <h5 >INDIA</h5>
                                </Card>
                            </Col>
                        </Row>



                
                        </div>
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
                              
                                <br></br>

                                <Caption>
                                    
                                    <h5 className=" grey-text ">
                                        Diversity may be the hardest thing for a society to live with, and perhaps the most dangerours thing for
                                    a society to be without
                                    </h5>
                                    <p className="center grey-text ">by William Sloane Coffin</p>
                                </Caption>
                            
                               
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