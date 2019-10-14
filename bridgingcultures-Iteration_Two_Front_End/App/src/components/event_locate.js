import React from 'react';
import Bootstrap from "react-bootstrap/"
import { Parallax, Card, CardTitle, Button, Row, Col, Caption } from 'react-materialize';
import { Link } from "react-router-dom";
import '../css/style.css';
// import '../css/materialize.css';
// import '../css/materialize.min.css';
import Mainmap from "../Mainmap/Mainmap";
import Modal from "../Modal/Modal";
import card_australia from './card_aussie.png';
import card_japan from './card_japan.jpg';
import card_china from './card_china.png';
import card_india from './card_india.png';
import card_malaysia from './card_malaysia.jpg';
import card_italy from './card_italy.jpg';

const exact_month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const exact_days_names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

class EventLocate extends React.Component {
constructor(props){
    super(props);
    this.myRef = React.createRef();
}
state = {
eventBrites:{},
eventBriteList:[],
client_address:[],
countryName:"",
festival_image:""
}

formatted_date(str) {
  var given_date = new Date(str);
  var day = exact_days_names[given_date.getDay()]
  var month = exact_month_names[given_date.getMonth()]
  var year = given_date.getFullYear()
  return day + " " + given_date.getDate() + " " + month + " " + year
}

componentDidMount() {
        //console.log(this.props.location.state)
             if( this.props.location.state ) {
                 let event_dict = {}
                 event_dict = this.props.location.state.event_dict;
                
            console.log(this.props.location.state.image)
            console.log(event_dict)
                 this.setState({eventBriteList: event_dict,countryName:this.props.location.state.country_name,festival_image: this.props.location.state.image})
                 //this.setState({countryName:this.props.location.state.country_name})
                // console.log(this.state.countryName)
             }
            
        // this.request_ip_address();
    
 }
    render() {
     let image_src = card_australia;
     let title_country_name = "Australian Culture";
     if( this.state.countryName == "Australia" ) {
      image_src = card_australia;
      title_country_name = "Australian Culture";
    } else if( this.state.countryName == "India" ) {
      image_src = card_india;
      title_country_name = "Indian Culture";
    } else if( this.state.countryName == "China" ) {
      image_src = card_china;
      title_country_name = "Chinese Culture";
    } else if( this.state.countryName == "Japan" ) {
      image_src = card_japan;
      title_country_name = "Japanese Culture";
    } else if( this.state.country_name_main == "Malaysia" ) {
      image_src = card_malaysia;
      title_country_name = "Malaysian Culture";
    } else if( this.state.country_name_main == "Italy" ) {
      image_src = card_italy;
      title_country_name = "Italian Culture";
    }
   
    console.log(this.state.festival_image)
     //if(this.state.countryName)
        return (
          <div>
            <div>
            <div id="index-banner" className="parallax-container events_banner">
                    <div className="section no-pad-bot">
                        <div id="event_header_container" className="container header_outer_container" >                           
                            <div id="event_header_content" className="banner_header header_content_event">  
                            <Caption>
                                <h1 id="event_text" className="header left white-text-banner">
                                    {title_country_name}
                                </h1>
                                </Caption>
                            </div>
                        </div>
                    </div>
                    <Parallax className="parallax" image={<img src={image_src} className="inner-box inner-box-event-image"/>} alt="Unsplashed background img 1"></Parallax>
                </div>
            </div>
            <Row className="div_row">
          <Col className="back_home_col">
            <Link
              to={{
                pathname: this.props.location.state.isWishList?"/wish_list":"/event",
                state: {
                  country: this.state.countryName
              
                }
              }}
            >
              <button type="button" className="back_home_btn back_home_link">
                Back
              </button>
            </Link>
          </Col>
          <Col>
            <h2 className="upcoming_header">Where to attend the events</h2>
          </Col>
        </Row>  
        
        <Row>  
          <Col>
          {this.state.eventBriteList.map((eventbrite) => {           
            console.log(this.state.festival_image)
            return (   
              <Row className="div_row festival_row">
                <Col className="event_image_col">
                <img src={this.state.festival_image} className="festival_image" />
              </Col>
              <Col className="festival_content">
                    <Row className="inner_row_col"><h4>{eventbrite.name}</h4></Row>
                    <Row className="inner_row_col">{eventbrite.addressDisplay}</Row>
                    <hr />
                    <Row className="inner_row_col">{this.formatted_date(eventbrite.startTime.split("T")[0])+" "+eventbrite.startTime.split("T")[1]}</Row>
                    <Row className="inner_row_col">{this.formatted_date(eventbrite.endTime.split("T")[0])+" "+eventbrite.endTime.split("T")[1]}</Row>
                    <Col className="button_style" >
                    <Row><button type="button" className="fe_btn">
                    <a
                      className="bg_link"
                      href={eventbrite.url}
                      target="_blank"
                    >
                      Attend Event
                    </a>
                    </button></Row>
                    </Col>
                    
                  </Col>
              </Row>     
            )
          })}
          </Col>
          <Col className="event_map">
            <Mainmap
            eventBriteLocation = {this.state.eventBriteList}
            locationDetails = {this.props.location.state.location}
            restaurants_locations = {[]}
            />
            </Col>
        </Row>
          </div>
          



        );



    }
    getEventdata = (event) => { 
        //this.setState({ showModal: false, food_list: []})
        var title_content = event.title
        title_content = title_content.toString().split("/")[0];
        //console.log(title_content)
        var event_end_date = new Date(event.date);
        var event_start_date = event.date;
        //console.log(event_end_date)
        //var handleDate = arg.date
        //console.log("Modified End Date:")
        //console.log(event_end_date.getFullYear()+"-"+(event_end_date.getMonth()+1)+"-"+event_end_date.getDate())
        event_end_date = event_end_date.getFullYear()+"-"+(event_end_date.getMonth()+1)+"-"+event_end_date.getDate()
        event_end_date = event_end_date.replace(/\s/g, '')
        //console.log(event_end_date)
        var start_date_conv = new Date(event_start_date);
        //console.log(start_date_conv)
        event_start_date = start_date_conv.setDate(start_date_conv.getDate() - 1);
        event_start_date = new Date(event_start_date)
        event_start_date = event_start_date.getFullYear()+"-"+(event_start_date.getMonth()+1)+"-"+event_start_date.getDate()

       // console.log(event_start_date)
        var location = "australia,%20melbourne"
        if( event.location != null  ) 
        {
          
          location = event.location.country + `, `+event.location.city
         // console.log(location)
        }
        if( title_content !== "" ) {
        this.setState({ showLoading: true, showModal: false,restaurants_locations:[], food_list:[] });
          fetch(`https://bridgingcultures-api-first.ml/eventbrite?festival_name=`+title_content+`&location=`+location+`&start_date=`+event_start_date+`&end_date=`+event_end_date,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
        this.setState({ showLoading: false });
        var eventsbrite = data.events 
        var mod_eventsbrite = new Array(3)
       // console.log(data.events)
          if(data.events.length > 0)
            {
              for(var i = 0;i < data.events.length;i++)
              {
              var tempEvent = {};
              tempEvent.name = eventsbrite[i].name.text
              tempEvent.url = eventsbrite[i].url
              //tempEvent.description = eventsbrite[i].description.text
              tempEvent.endTime = eventsbrite[i].end.local
              tempEvent.startTime = eventsbrite[i].start.local
              tempEvent.lng = eventsbrite[i].venue.longitude
              tempEvent.lat = eventsbrite[i].venue.latitude
              tempEvent.addressDisplay = eventsbrite[i].venue.address.localized_address_display
              tempEvent.subsurbDisplay = eventsbrite[i].venue.address.localized_area_display
              mod_eventsbrite.push(tempEvent)
              
              }
            mod_eventsbrite = mod_eventsbrite.slice(0,3)
            this.setState({eventBriteList:mod_eventsbrite})
            //window.scrollTo(0, this.myRef.current.offsetTop);
            console.log(this.state.eventBriteList)
            return tempEvent
            }
            else
            {
            this.setState({eventBriteList:mod_eventsbrite})
            //this.myRef.current.insertAdjacentHTML("beforeend", '<p id="event_none_class">No upcoming events found for this specific day.</p>');
            // setTimeout( () => {
            //     this.myRef.current.querySelector(':last-child').remove();
            //     //console.log("Removed")
            // }, 5000);
            // window.scrollTo(0, this.myRef.current.offsetTop);
            }
        })
      } 
    }

}

export default EventLocate;
