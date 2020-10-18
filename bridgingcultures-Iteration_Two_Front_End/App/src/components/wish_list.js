import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
// import "../css/materialize.css";
// import "../css/materialize.min.css";
import {
  Parallax,
  Card,
  CardTitle,
  Row,
  Col,
  Caption
} from "react-materialize";
import card_australia from "./card_aussie.png";
import card_japan from "./card_japan.jpg";
import card_china from "./card_china.png";
import card_india from "./card_india.png";
import landingBannerJapan from "./banner_landing_japan.jpg";
import card_malaysia from './card_malaysia.jpg';
import card_italy from './card_italy.jpg';
import ls from 'local-storage';
import Modal from "../Modal/Modal";
//import Cookies from 'universal-cookie';

//const cookies = new Cookies();

//cookies.set('wish', 'list matters a lot', { path: '/' });
//console.log(); // Pacman

class WishList extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
  }
  state = {
    showModal: false,
    event_listing: false,
    eventBriteList: [],
    festival_state_image: ""
  }
  containsObject(obj, list) {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i].title === obj.title) {
              return true;
          }
      }

      return false;
  }

    formatDate(date) {
      var monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
      ];
      console.log(new Date(date));
      date = new Date(date)
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

  hideModal = () => {
    this.setState({ showModal: false, event_listing: false });
  };

  checkForFood = (state_content) => {
      if (state_content.food) {
          this.props.history.push({
              pathname: "/food",
              state: state_content
          });
      } else if (this.state.showModal == false) {
          //console.log("Nulll")
          this.setState({ showModal: true, modal_content: "No food available for your current selection." })
      }
  }

  getEventdata = (event) => {
      //this.setState({ showModal: false, food_list: []})
      var title_content = event.title
      title_content = title_content.toString().split("/")[0];
      var event_end_date = new Date(event.date);
      var event_start_date = event.date;
      //console.log(event_end_date)
      //var handleDate = arg.date
      //console.log("Modified End Date:")
      //console.log(event_end_date.getFullYear()+"-"+(event_end_date.getMonth()+1)+"-"+event_end_date.getDate())
      event_end_date = event_end_date.getFullYear() + "-" + (event_end_date.getMonth() + 1) + "-" + event_end_date.getDate()
      event_end_date = event_end_date.replace(/\s/g, '')
      //console.log(event_end_date)
      var start_date_conv = new Date(event_start_date);
      //console.log(start_date_conv)
      event_start_date = start_date_conv.setDate(start_date_conv.getDate() - 1);
      event_start_date = new Date(event_start_date)
      event_start_date = event_start_date.getFullYear() + "-" + (event_start_date.getMonth() + 1) + "-" + event_start_date.getDate()

      //console.log(event_start_date)
      var location = "australia,%20melbourne"
      if (this.state.client_address != null) {
          console.log(this.state.client_address)
          location = this.state.client_address.country + `, ` + this.state.client_address.city
      }
      if (title_content !== "") {
          this.setState({ showLoading: true, showModal: false, restaurants_locations: [], food_list: [] });
          fetch(`https://bridgingcultures-api-first.ml/eventbrite?festival_name=` + title_content + `&location=` + location + `&start_date=` + event_start_date + `&end_date=` + event_end_date, {
              method: 'GET'
          }).then(response => response.json()).then(data => {
              this.setState({ showLoading: false });
              var eventsbrite = data.events
              var mod_eventsbrite = []
              console.log(eventsbrite)
              if (data.events.length > 0) {
                  for (var i = 0; i < data.events.length; i++) {
                      var tempEvent = {};
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
              }
              mod_eventsbrite = mod_eventsbrite.slice(0,3)
              console.log(mod_eventsbrite)
              this.setState({ eventBriteList: mod_eventsbrite, festival_state_image: event.image, chosen_country_name: event.title, event_listing: true, showLoading: false })
          })
      }
  }
  render() {
        let modal_content;
        let loading_component;
        let location_dict;
        let festival_header;
        let festival_content;
        let food_header;
        let food_content;
        let food_countries_dict;
        let food_description;

        if( ls.get("client_address") ) {
          location_dict = ls.get("client_address");
        }
        let countries_dict;
        if( ls.get("festivals_countries") ) {
          countries_dict = ls.get("festivals_countries");
        }
        if( ls.get("foods_countries") ) {
          food_countries_dict = ls.get("foods_countries");
        }
        if (this.state.event_listing == true) {
            if (this.state.eventBriteList.length > 1) {
                let event_dict = this.state.eventBriteList
                let location_pre = location_dict
                this.props.history.push({
                    pathname: "/event_locate",
                    state: {
                        event_dict,
                        location: location_pre,
                        country_name: countries_dict[this.state.chosen_country_name],
                        image: this.state.festival_state_image,
                        isWishList: true
                    }
                });
            } else if (this.state.showModal == false) {
                //console.log("Nulll")
                this.setState({ showModal: true, modal_content: "No events available for the current selection." })
            }
        }
        if (this.state.showLoading) {
            loading_component = <div className="cal_overlay"><div className="loader"></div></div>
        }

        // if( this.props.location.state.food_desc ) {
        //   food_description = <Row className="inner_row_col">{ls.get("foods_desc")[]}</Row>
        // }
        // if( ls.get("foods_desc") ) {
        //   food_description = ls.get("foods_desc")
        // }
        if( ls.get("festivals") && ls.get("festivals").length > 0 ) {
          festival_header = "Favourite Festivals"
          let festival_list = ls.get("festivals")
          //console.log(festival_list)
          festival_list.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            let return_val = 0;
            if( (new Date(b.date) - new Date(a.date)) > 0 ) {
              return_val = -1
            } else if( (new Date(b.date) - new Date(a.date)) < 0 ) {
              return_val = 1
            } else {
              return_val = 0
            }
            return return_val;
          });
          //console.log(festival_list)
          festival_content = festival_list.map((calendarevent) => {
                    //console.log(this.state.calendarEvents)
                    return (
                        <Row className="div_row event_row">
                            <Col className="event_image_col">
                                <img src={calendarevent.image} className="festival_image" />
                            </Col>
                            <Col className="event_desc_col">
                                <Row className="inner_row_col"><h4>{calendarevent.title}</h4></Row>
                                <Row className="inner_row_col">{calendarevent.description}</Row>
                            </Col>
                            <Col className="event_stat_col">
                                <Row className="inner_row_col"><h5>{this.formatDate(calendarevent.date)}</h5></Row>
                                <Row className="inner_row_col">
                                    <button type="button" className="bg_btn">
      
                                        <div className="bg_link" onClick={() => this.getEventdata({ image: calendarevent.image, title: calendarevent.title, date: calendarevent.date, location: location_dict, country_name: countries_dict[calendarevent.title] })}>Attend Events</div>

                                    </button>
                                </Row>
                                <Row className="inner_row_col">
                                    <button type="button" className="bg_btn">
                                        <div className="bg_link" onClick={() => this.checkForFood(
                                            {
                                                food: calendarevent.food,
                                                location: location_dict,
                                                country_name_main: countries_dict[calendarevent.title],
                                                food_default: calendarevent.food_default,
                                                food_desc: calendarevent.food_desc,
                                                isWishList: true
                                            }
                                        )}>Explore Foods</div>
                                    </button>
                                </Row>
                            </Col>
                        </Row>
                    )
                })
        } else {
          festival_header = "You haven't selected your favourite festivals"
        }
        if( ls.get("foods") && ls.get("foods").length > 0 ) {
          food_header = "Favourite Foods"
          let food_content_list = ls.get("foods")
          food_content_list.sort(function(a, b) {
            var nameA = a.name.toUpperCase(); // ignore upper and lowercase
            var nameB = b.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          });
          food_content = food_content_list.map(foodlist => {
          //console.log(foodlist.imageurl)
          return (
            <Row className="div_row event_row">
              <Col className="event_image_col">
                <img src={foodlist.imageurl} className="festival_image" />
              </Col>
              <Col className="event_desc_col">
                <Row className="inner_row_col">
                  <h4>{foodlist.name}</h4>
                </Row>
                <Row className="inner_row_col">{foodlist.desc}</Row>
              </Col>
              <Col className="event_stat_col">
                <Row className="inner_row_col">
                  <button type="button" className="bg_btn bg_link">
                    <a
                      className="bg_link"
                      href={foodlist.url_1}
                      target="_blank"
                    >
                      Get the Recipe
                    </a>
                  </button>
                </Row>
                <Row className="inner_row_col">
                  <Link
                    to={{
                      pathname: "/restaurantlocator",
                      state: {
                        name: foodlist.name,
                        country: location_dict.country,
                        region: location_dict.region,
                        city: location_dict.city,
                        location: location_dict,
                        country_name_main: food_countries_dict[foodlist.name],
                        food: "",
                        foodimage: foodlist.imageurl,
                        isWishList: true
                      }
                    }}
                  >
                    <button type="button" className="bg_btn bg_link">
                      Find Restaurants
                    </button>
                  </Link>
                </Row>
              </Col>
            </Row>
          );
        })
        } else {
          food_header = "You haven't selected your favourite foods"
        }
    return (
      <div>
            <div id="index-banner" className="parallax-container events_banner">
              <div className="section no-pad-bot">
                  <div id="event_header_container" className="container header_outer_container" >
                     
                      <div id="event_header_content" className="banner_header header_content_event">  
                      <Caption>
                          <h1 id="event_text" className="header left white-text-banner">
                              Wishlist
                          </h1>
                      </Caption>
                      </div>
                  </div>
              </div>
              <Parallax className="parallax" image={<img src={landingBannerJapan} className="inner-box inner-box-event-image"/>} alt="Unsplashed background img 1"></Parallax>
          </div>
                {loading_component}
                <Row className="div_row">
                    <Col className="back_home_col">
                        <button type="button" className="back_home_btn">
                            <Link className="back_home_link" to={{ pathname: "/" }}  >Back to home</Link>
                        </button>
                    </Col>
                    <Col>
                        <h2 className="upcoming_header">Festivals & Foods</h2>
                    </Col>
                </Row>
                <Row className="div_row event_row_home_header">{festival_header}</Row>
                {festival_content}
                <Row className="div_row event_row_home_header">{food_header}</Row>
                {food_content}
                <Modal
                    show={this.state.showModal}
                    onHide={this.hideModal}
                    name={this.state.modal_content}
                />
      </div>
    );
  }
}

export default WishList;
