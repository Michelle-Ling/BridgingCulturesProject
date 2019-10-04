import React from 'react';
import { Parallax, Card, CardTitle, Row, Col, Caption } from 'react-materialize';
import { Link } from "react-router-dom";
import '../css/style.css';
import '../css/materialize.css';
import '../css/materialize.min.css';
import Mainmap from "../Mainmap/Mainmap";
import Modal from "../Modal/Modal";
import card_australia from './card_aussie.png';
import card_japan from './card_japan.jpg';
import card_china from './card_china.png';
import card_india from './card_india.png';
class EventLocate extends React.Component {
constructor(props){
    super(props);
    this.myRef = React.createRef();
}
state = {
eventBrites:{},
eventBriteList:[],
client_address:[],
countryName:""
}
componentDidMount() {
        //console.log(this.props.location.state)
             if( this.props.location.state ) {
                 let event_dict = {}
                 event_dict = this.props.location.state.event_dict;
                
             //console.log(this.props.location.state)
            //console.log(event_country)
                 this.setState({eventBriteList: event_dict,countryName:this.props.location.state.country_name })
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
    }
    const map_style={
      padding:"85%",
      offsetTop:"10%",
    }
    console.log(this.state.countryName)
     //if(this.state.countryName)
        return (
          <ul>
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
                pathname: "/event",
                state: {
                  country: this.state.countryName
              
                }
              }}
            >
              <button type="button" className="back_home_btn back_home_link">
                Back to Festival
              </button>
            </Link>
          </Col>
          <Col>
            <h2 className="upcoming_header">Where to attend the events</h2>
          </Col>
        </Row>  
         <Row className="event_map_row">
         
         <Col> 
          {this.state.eventBriteList.map((eventbrite) => {           
            console.log(this.state.eventBriteList)
            return (            
              <div class="list-group">
                 <hr />
                <li class="list-group-item list-group-item-light" style={{width:'70%'}}>
                {/* <div>{eventbrite.name}</div> */}
                <a class="list-group-item list-group-item-action list-group-item-primary" href = {eventbrite.url} target='_blank'>{eventbrite.name}</a>
                {/* <div>{eventbrite.description}</div> */}
                <div>{eventbrite.startTime}</div>
                <div>{eventbrite.endTime}</div>
                <div>{eventbrite.addressDisplay}</div>
                </li>
                <hr />
              </div>
            )
          })}
          </Col>
          <Col  className="min_map">
            <Mainmap
            eventBriteLocation = {this.state.eventBriteList}
            locationDetails = {this.props.location.state.location}
            restaurants_locations = {[]}
            />
            </Col>
        </Row> 
          </ul>
          



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
          fetch(`http://localhost:5000/eventbrite?festival_name=`+title_content+`&location=`+location+`&start_date=`+event_start_date+`&end_date=`+event_end_date,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
        this.setState({ showLoading: false });
        var eventsbrite = data.events 
        var mod_eventsbrite = []
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