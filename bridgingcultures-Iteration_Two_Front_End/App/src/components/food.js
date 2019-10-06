import React from "react";
import { Link } from "react-router-dom";
import "../css/style.css";
import "../css/materialize.css";
import "../css/materialize.min.css";
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
//import food_locate from "./food_locate";

class Food extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    // this.state = {
    //     location : this.props.location.state.location,
    //     food_list : [],
    //     restaurants_locations : []
    // }
    if (this.props.location.state.food) {
      this.state = {
        food: this.props.location.state.food,
        location: this.props.location.state.location,
        country_name_main: this.props.location.state.country_name_main,
        food_list: [],
        restaurants_locations: [],
        showLoading: true
      };
    } else if( this.props.location.state.food_default ) {
		this.state = {
	        food: this.props.location.state.food_default,
	        location: this.props.location.state.location,
	        country_name_main: this.props.location.state.country_name_main,
	        food_list: [],
	        restaurants_locations: [],
	        showLoading: true
      };
    } else {
      this.state = {
        food: "",
        location: this.props.location.state.location,
        country_name_main: this.props.location.state.country_name_main,
        food_list: [],
        restaurants_locations: [],
        showLoading: true
      };
    }
    console.log(this.props);
    console.log(this.props.location.state);
    console.log(this.props.location.state.food);
    console.log(this.props.location.state.location);
    console.log(this.state.food);
    console.log(this.state.location);
    this.getFoodData();
  }

  /*componentDidMount() {
    //console.log(this.props.location);
    //console.log(this.props.location.state);
    //console.log(this.props.location.state.location);
    var client_location = {};
    var food_items = "";
    if (this.props.location.state) {
        //console.log("Inside loop")
      client_location = this.props.location.state.location;
      food_items = this.props.location.state.food;
      console.log(client_location)
      console.log(food_items)
      // this.setState({ food:food_items, location:client_location }, () => console.log(this.state))
      this.setState({ food: food_items, location: client_location });
      // this.getData(country);
    }

    console.log(this.state.food);
    console.log(this.state.location);
    this.getFoodData();
  }*/

  getFoodData = event => {
    // this.setState({ showModal: false})
    // //console.log(this.state.data_json.food)
    var food_items_array = [];
    if (this.state.food !== "") {
      //   this.setState({ showLoading: true });
      var food_items = this.state.food.split(", ");
      food_items = food_items.slice(0, 3);
      console.log(food_items);
      fetch(
        `http://localhost:5000/recipe_links?name=` +
          this.state.food +
          `&country=` +
          this.state.country_name_main,
        {
          method: "GET"
        }
      )
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var items_array = data.food_items;
          //this.setState({ showLoading: false });
          for (var i = 0; i < data.food_items.length; i++) {
            var tempEvent = {};
            tempEvent.name = food_items[i];
            tempEvent.url_1 = items_array[i].items[0].link;
            tempEvent.url_2 = items_array[i].items[1].link;
            var imageurl_given = items_array[i].items[0].pagemap.cse_image[0].src.toString();
            if (imageurl_given.startsWith("http")) {
              tempEvent.imageurl =
                items_array[i].items[0].pagemap.cse_image[0].src;
            } else {
              tempEvent.imageurl =
                items_array[i].items[1].pagemap.cse_image[0].src;
            }

            food_items_array.push(tempEvent);
          }
          this.setState({
            food_list: food_items_array,
            restaurants_locations: [],
            showLoading: false
          });
          // window.scrollTo(0, this.myRef.current.offsetTop-55);
        });
    }
  };

  render() {
    let image_src = card_australia;
    let title_country_name = "Australian Culture";
    let loading_component;
    let food_description;
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
    } else if( this.state.country_name_main == "Malaysia" ) {
      image_src = card_malaysia;
      title_country_name = "Malaysian Culture";
    } else if( this.state.country_name_main == "Italy" ) {
      image_src = card_italy;
      title_country_name = "Italian Culture";
    }
    if( this.state.showLoading ) {
        loading_component = <div className="cal_overlay"><div className="loader"></div></div>
     }
    if( this.props.location.state.food_desc ) {
    	food_description = <Row className="inner_row_col">{this.props.location.state.food_desc}</Row>
    }
    return (
      <div>
        {/* {this.props.name}'s Food First PAGE */}
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
                pathname: "/event",
                state: {
                  country: this.props.location.state.country_name_main
                }
              }}
            >
              <button type="button" className="back_home_btn back_home_link">
                Back to events
              </button>
            </Link>
          </Col>
          <Col>
            <h2 className="upcoming_header">Tantalize Your Tastebuds</h2>
          </Col>
        </Row>
        {this.state.food_list.map(foodlist => {
          console.log(foodlist.imageurl)
          return (
            <Row className="div_row event_row">
              <Col className="event_image_col">
                <img src={foodlist.imageurl} className="festival_image" />
              </Col>
              <Col className="event_desc_col">
                <Row className="inner_row_col">
                  <h4>{foodlist.name}</h4>
                </Row>
                {food_description}
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
                        country: this.state.location.country,
                        region: this.state.location.region,
                        city: this.state.location.city,
                        location: this.state.location,
                        country_name_main: this.props.location.state
                          .country_name_main,
                        food: this.props.location.state.food,
                        foodimage: foodlist.imageurl
                      }
                    }}
                  >
                    <button type="button" className="bg_btn bg_link">
                      Explore Foods
                    </button>
                  </Link>
                </Row>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default Food;
