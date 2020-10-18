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
import Mainmap from "../Mainmap/Mainmap";
import Modal from "../Modal/Modal";
import card_australia from "./card_aussie.png";
import card_japan from "./card_japan.jpg";
import card_china from "./card_china.png";
import card_india from "./card_india.png";
import landingBannerJapan from "./banner_landing_japan.jpg";
import card_malaysia from './card_malaysia.jpg';
import card_italy from './card_italy.jpg';

class RestaurantLocator extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    console.log("Explore page");
    console.log(this.props);
  }
  state = {
    foodLocation: {},
    restaurants_locations: [],
    showNone: false
  };

  componentDidMount() {
    console.log("Hello World");
    console.log(this.props.location.state);
    console.log(this.props);
    console.log(this.state);

    if (this.props.location.state) {
      //let event_dict = {};
      //event_dict = this.props.location.state.event_dict;
      console.log("Hello---------------");
      console.log(this.props.location.state);
      //console.log(event_dict);
      this.setState({
        foodLocation: {
          foodname: this.props.location.state.name,
          country: this.props.location.state.country,
          region: this.props.location.state.region,
          city: this.props.location.state.city,
          location: this.props.location.state.location,
          country_name_main: this.props.location.state.country_name_main,
          food: this.props.location.state.food,
          // foodimage: this.props.location.state.imageurl
        },
        showLoading: true
      });
      this.getFoodLocation();
      console.log(this.state);
      console.log(this.props);
    }

    // this.request_ip_address();
  }

  navigateLocation(address) {
    console.log(address)
    address = address.split("/")
    let addr = address[0]
    if( address.length > 1 ) {
      addr = address[1]
    }
    var win = window.open("https://www.google.com/maps/place/"+addr, '_blank');
    win.focus();
  }

  getFoodLocation = () => {
    //console.log("Food Click");
    console.log(this.props.location.state);
    console.log(this.props.location.state.name);
    console.log(this.props.location.state.country);
    console.log(this.props.location.state.region);
    console.log(this.props.location.state.city);
    var restaurants_name = [];
    var restaurants_locations = [];
    //this.setState({ showLoading: true });
    //https://www.googleapis.com/customsearch/v1?key=AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc&cx=005263693131602275062:cztfzj4nvim&q=haleem au victoria notting hill
    fetch(
      `https://www.googleapis.com/customsearch/v1?key=AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc&cx=005263693131602275062:cztfzj4nvim&q=` +
        this.props.location.state.name +
        ` ` +
        this.props.location.state.city +
        ` ` +
        this.props.location.state.region +
        ` ` +
        this.props.location.state.country,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        var city = this.props.location.state.city;
        if (parseInt(data.queries.request[0].totalResults) > 0) {
          for (var i = 0; i < data.items.length; i++) {
            console.log(data.items[i].title.split(" |")[1]);
            var title = data.items[i].title.split(" |")[0];
            city = this.props.location.state.city;
            if (
              (data.items[i].title.split(" |").length > 1) &
              (data.items[i].title.split(" |")[1] != "Uber Eats")
            ) {
              city = data.items[i].title.split(" |")[1];
            }
            title = title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
            restaurants_name.push(title + " " + city);
          }
          //console.log(restaurants_name)
          //const proxyurl = "https://cors-anywhere.herokuapp.com/";
          var restaurants_name_str = restaurants_name.join();

          //console.log("Test")
          var location = "australia,%20melbourne";
          if (this.props.location.state != null) {
            //var city = this.state.foodLocation.city
            //console.log(this.state.foodLocation)

            location =
              this.props.location.state.region +
              ` ` +
              this.props.location.state.country;
          }
          fetch(
            `https://bridgingcultures-api-first.ml/restaurant_location?name=` +
              restaurants_name_str +
              "&location=" +
              location,
            {
              method: "GET"
            }
          )
            .then(response => response.json())
            .then(data => {
              //console.log(data)
              //console.log(data.restaurant_items)
              var items_array = data.restaurant_items;
              //this.setState({showLoading: false})
              //console.log(items_array.length)
              for (var i = 0; i < items_array.length; i++) {
                //console.log( items_array[i])
                if (items_array[i].candidates.length > 0) {
                  var restaurant_content = {};
                  restaurant_content["address"] =
                    items_array[i].candidates[0].formatted_address;
                  restaurant_content["lat"] =
                    items_array[i].candidates[0].geometry.location.lat;
                  restaurant_content["lng"] =
                    items_array[i].candidates[0].geometry.location.lng;
                  restaurant_content["name"] =
                    items_array[i].candidates[0].name;
                  //console.log(restaurants_name[i])
                  restaurants_locations.push(restaurant_content);
                }
              }
              restaurants_locations = restaurants_locations.slice(0,3)
              console.log(restaurants_locations);
              this.setState({
                restaurants_locations: restaurants_locations,
                showLoading: false,
                showNone: false
              });
            });
        } else {
          this.setState({ restaurants_locations: [], showLoading: false, showNone: true });
        }
        //}
        //console.log(this.state.restaurants_locations)
      });
    //console.log(restaurants_name)
  };

  render() {
    let image_src = card_australia;
    let title_country_name = "Australian Culture";
    let loading_component;
    let restaurant_listings;
    //let shownone_component;
    if (this.props.location.state.country_name_main === "Australia") {
      image_src = card_australia;
      title_country_name = "Australian Culture";
    } else if (this.props.location.state.country_name_main === "India") {
      image_src = card_india;
      title_country_name = "Indian Culture";
    } else if (this.props.location.state.country_name_main === "China") {
      image_src = card_china;
      title_country_name = "Chinese Culture";
    } else if (this.props.location.state.country_name_main === "Japan") {
      image_src = landingBannerJapan;
      title_country_name = "Japanese Culture";
    } else if( this.props.location.state.country_name_main == "Malaysia" ) {
        image_src = card_malaysia;
        title_country_name = "Malaysian Culture";
      } else if( this.props.location.state.country_name_main == "Italy" ) {
        image_src = card_italy;
        title_country_name = "Italian Culture";
      }
    if( this.state.showLoading ) {
          loading_component = <div className="cal_overlay"><div className="loader"></div></div>
      }

      if( this.state.showNone ) {
        restaurant_listings = <Row className="div_row event_row restaurant_locator">
                  Sorry we couldn't find any restaurants near you serving {this.props.location.state.name}, please refer to our suggested recipes instead.
                </Row>
      } else {
        restaurant_listings = this.state.restaurants_locations.map(foodlist => {
              return (
                <Row className="div_row event_row restaurant_locator">
                  <h4 className="div_row restaurant_name" onClick={() => this.navigateLocation(foodlist.address)}>{foodlist.name}</h4>
                  {foodlist.address}
                  <hr></hr>
                </Row>
              );
            })
      }
      //console.log(this.props.location.state.isWishList)
    return (
      <div>
        <div id="index-banner" className="parallax-container events_banner">
          <div className="section no-pad-bot">
            <div
              id="event_header_container"
              className="container header_outer_container"
            >
              <div
                id="event_header_content"
                className="banner_header header_content_event"
              >
                <Caption>
                  <h1 id="event_text" className="header left white-text-banner">
                    {title_country_name}
                  </h1>
                </Caption>
              </div>
            </div>
          </div>
          <Parallax
            className="parallax"
            image={
              <img
                src={image_src}
                className="inner-box inner-box-event-image"
              />
            }
            alt="Unsplashed background img 1"
          ></Parallax>
        </div>
        {loading_component}
        <Row className="div_row">
          <Col className="back_home_col">
            <Link
              to={{
                pathname: this.props.location.state.isWishList?"/wish_list":"/food",
                state: {
                  country_name_main: this.props.location.state
                    .country_name_main,
                  location: this.props.location.state.location,
                  food: this.props.location.state.food,
                  food_default: this.props.location.state.food_default,
                  food_desc: this.props.location.state.food_desc
                }
              }}
            >
              <button type="button" className="back_home_btn back_home_link">
                Back
              </button>
            </Link>
          </Col>
          <Col>
            <h2 className="upcoming_header">Where to get {this.props.location.state.name}</h2>
          </Col>
        </Row>
        <Row className="div_row">
        {/*<Col className="restaurant_food_img_out">
                <img src={this.props.location.state.foodimage} className="foodlocator_image" />
              </Col>*/}
          <Col>
            {restaurant_listings}
          </Col>
          <Col className="min_map">
            <Mainmap
              eventBriteLocation={[]}
              locationDetails={this.props.location.state.location}
              restaurants_locations={this.state.restaurants_locations}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default RestaurantLocator;
