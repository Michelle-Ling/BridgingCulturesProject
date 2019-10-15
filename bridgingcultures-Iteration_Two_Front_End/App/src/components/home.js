import React from 'react';
import '../css/style.css';
//import '../css/materialize.css';
// import '../css/materialize.min.css';
import { Parallax, Card, CardTitle, Row, Col, Caption } from 'react-materialize';
import { Link } from "react-router-dom";

import landingBannerMaldives from './banner_landing_maldives.png';
import landingBannerJapan from './banner_landing_japan.jpg';
import card_australia from './card_aussie.png';
import card_japan from './card_japan.jpg';
import card_china from './card_china.png';
import card_india from './card_india.png';
import card_malaysia from './card_malaysia.jpg';
import card_italy from './card_italy.jpg';
//import ls from 'local-storage';

class Home extends React.Component {
    state = {
      today_content: {"resource": []}
    }
    componentDidMount() {
        //console.log(this.props.location.state)
        var date = new Date();
        var month = date.getMonth() + 1;
        var todays_date = month+"/"+date.getDate()+"/"+date.getFullYear()
        console.log(month+"/"+date.getDate()+"/"+date.getFullYear())
            fetch(`https://bridgingcultures-api-first.ml/todays_list?date=`+todays_date,{
              method: 'GET'
            }).then(response => response.json()).then(data => {
                console.log(data)
                this.setState({ today_content: data })
            })
            // let side_nav_icon = document.getElementsByClassName("sidenav-trigger")
            // if( typeof side_nav_icon !== "undefined" ) {
            //     //console.log(side_nav_icon)
            //     side_nav_icon[0].style.display="none"
            // }
            //console.log(ls.get("festivals"))
    }

    formatDate(date) {
        date = new Date(date)
        var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var weekday = new Array(7);
          weekday[0] = "Sunday";
          weekday[1] = "Monday";
          weekday[2] = "Tuesday";
          weekday[3] = "Wednesday";
          weekday[4] = "Thursday";
          weekday[5] = "Friday";
          weekday[6] = "Saturday";

        var week_day_name = weekday[date.getDay()];
        return week_day_name + ', ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
    }

    render() {
        let today_header;
        let today_content;
        if( this.state.today_content["resource"].length > 0 ) {
            today_header = "Today's Festivals"
            today_content = this.state.today_content["resource"].map((calendarevent) => {
                  {/*console.log(this.state.today_content["resource"])*/}
                  return (
                <Row className="div_row event_row_home">
                  <Col className="home_country_div">
                    {calendarevent.countries}
                  </Col>
                  <Col className="event_image_col_home">
                    <img src={calendarevent.image} className="festival_image"/>
                  </Col>
                  <Col className="event_desc_col_home">
                    <Row className="inner_row_col"><h4>{calendarevent.festivals}</h4></Row>
                    <Row className="inner_row_col">{calendarevent.description}</Row>
                  </Col>
                  {/*<Col className="event_stat_col">
                  <Row className="inner_row_col"><h5>{this.formatDate(calendarevent.date)}</h5></Row>
                  <Row className="inner_row_col">
                    <button type="button" className="bg_btn">
                    {/*<Link className="bg_link" to={{ pathname: "/event_locate",state: { title: calendarevent.festivals,date:calendarevent.date,location:this.state.client_address} }}  >Attend Events</Link>
                    <div className="bg_link" onClick={() =>this.getEventdata({ title: calendarevent.festivals,date:calendarevent.date,location:this.state.client_address,country_name:this.state.country_name_main})}>Attend Events</div>

                    </button>
                  </Row>
                  <Row className="inner_row_col">
                  <Link
                      to={{
                        pathname: "/food",
                        state: {
                          food: calendarevent.food,
                          location: this.state.client_address,
                          country_name_main: this.state.country_name_main
                        }
                      }}
                    >
                    <button type="button" className="bg_btn bg_link">
                      Explore Foods
                    </button>
                  </Link>
                  <button type="button" className="bg_btn">
                    <div className="bg_link" onClick={() =>this.checkForFood(
                      {
                          food: calendarevent.food,
                          location: this.state.client_address,
                          country_name_main: this.state.country_name_main,
                          food_default: calendarevent.food_default,
                          food_desc: calendarevent.food_desc
                        }
                      )}>Explore Foods</div>
                    </button>
                  </Row>
                  </Col>*/}
                </Row>
                  )
                })
        } else {
            today_header = 'No festivals available today'
        }

        return (                                

            <div>
              

                <div id="index-banner" className="parallax-container">
                    <div className="section no-pad-bot">
                        <div className="container " >
                           
                            <div className="banner_header">  
                            <Caption>
                                <h1 className="header center white-text-banner">
                                    Discover your Roots - Explore your Culture
                                </h1>
                                </Caption>
                            </div>
                      

                        </div>
                    </div>
                    <Parallax className="parallax" image={<img src={landingBannerJapan} className="div.inner-box"/>} alt="Unsplashed background img 1"></Parallax>
                </div>

                <br></br>
                <div className="container">
                      <div className="section">
                        <div className="row">
                          <div className="col s12 center">
                            <h3>
                              <i className="mdi-content-send brown-text"></i>
                            </h3>
                            <h4>Our Mission</h4>
                            <p className="left-align light">
                              Australia is said to be a cultural melting pot. There were
                              several waves of foreign migrations over the last seven
                              decades that have shaped the diverse culture of Australia
                              today. Our mission is to help all people who have just called
                              Australia home, whether temporary or permanent, to discover
                              the cultural celebratory events that take place in the city
                              they live so that they can get exposure to the dominant
                              cultures present in Australia.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                                <div className="container">
                    <div className="section">
                        <div className="container">
                            <div className="row center">
                                <div className="col s12 center">
                                <h4 className = "align-center">Explore a Culture</h4>
                            </div>
                            </div>
                        </div>
                        <div className="culture_tiles">
                        <Row >
                                <Col className="fixed-size-card">

                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_australia} card-image="true" waves-effect="waves" />}

                                   
                                    actions={[<Link to={{ pathname: "/event", state: { country: "Australia" } }}  >view festivals</Link>]} >

                                    <h5 >AUSTRALIA</h5>
                                </Card>
                            </Col>

                                <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_japan} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "Japan" } }}>view festivals</Link>]}>
                                    <h5 >JAPAN</h5>
                                </Card>
                            </Col>

                                <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_china} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "China" } }}>view festivals</Link>]}>
                                    <h5 >CHINA</h5>
                                </Card>
                            </Col>
                                <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_india} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "India" } }} className="center" > view festivals </Link>]}>
                                    <h5>INDIA</h5>
                                </Card>
                            </Col>
                            <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_malaysia} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "Malaysia" } }} className="center" > view festivals </Link>]}>
                                    <h5 >MALAYSIA</h5>
                                </Card>
                            </Col>
                            <Col className="fixed-size-card">
                                <Card
                                    textClassName="black-text"


                                    header={<CardTitle image={card_italy} card-image="true" waves-effect="waves" />}

                                    actions={[<Link to={{ pathname: "/event", state: { country: "Italy" } }} className="center" > view festivals </Link>]}>
                                    <h5 >ITALY</h5>
                                </Card>
                            </Col>
                        </Row>
                        </div>
                    </div>
                </div> 
                                  
                <div className="parallax-container valign-wrapper">
                    <div className="section no-pad-bot"></div>
                        <Parallax className="parallax" image={<img src={landingBannerMaldives} />} alt="Unsplashed background img 2"></Parallax>
                    </div>
                <Row className="div_row event_row_home_header">{today_header}</Row>
                {today_content}
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