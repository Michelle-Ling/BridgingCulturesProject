import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
//import { Parallax, Card, CardTitle, Row, Col } from 'react-materialize';
import { Component, useRef, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import Mainmap from "../Mainmap/Mainmap";
import Modal from "../Modal/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import '../css/Calendar.scss'

class Event extends React.Component {
constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.togglehandler = this.togglehandler.bind(this);
    this.foodhandler = this.foodhandler.bind(this);
    this.handleOnClickFood = this.handleOnClickFood.bind(this);
    this.myRef = React.createRef();
  }

    state = {
      isAnyEventPresent: false,
      calendarWeekends: true,
      calendarEvents: [],
      eventBriteList:[],
      showModal: false,
      dataModal: "",
      descModal: "",
      menu: "",
      data_json: {},
      show_food: false,
      food_list: [],
      restaurants_locations: [],
      country_name_main: "Australia"
    }

  //componentWillMount(){
      //console.log("Going in")
      //this.getData("Australia");
    //}
    componentDidMount() {
        //console.log(this.props.location.state)
        if( this.props.location.state ) {
            const { country } = this.props.location.state;
            console.log(country)
            this.setState({ country_name_main: country })
            this.getData(country);
        }
        
      this.request_ip_address();
    }

    componentWillReceiveProps(nextProps){
      //if (nextProps.location.state === 'desiredState') {
        // do stuffs
      //}
      if( nextProps.location.state ) {
          console.log(nextProps.location.state)
          const { country } = nextProps.location.state;
          console.log(country)
          this.setState({ country_name_main: country })
          this.getData(country);
      }
    }

  request_ip_address() {
    //https://api.ipify.org/?format=json
    fetch(`https://api.ipify.org/?format=json`,{
      method: 'GET'
    }).then(response => response.json()).then(data => {
      //console.log(data.ip)
      fetch(`https://bridgingcultures-api-first.ml/eventbrite/location?ip_address=`+data.ip,{
            method: 'GET'
      }).then(response => response.json()).then(data => {
        console.log("client address:")
        console.log(data)
        this.setState({ client_address: data })
        //return data
        //console.log(mod_holidays_array)
      })
      //
      //console.log(mod_holidays_array)
    })
  }

togglehandler(e) {
    this.getEventdata(this.state.data_json)
  }

  foodhandler(e) {
    this.getFoodData(this.state.data_json)
  }

  handleChange(e) {
    this.getData(e.target.value);
    this.setState({ country_name_main: e.target.value })
  }

    calendarComponentRef = React.createRef()

    getModal = data => {
      this.setState({ showModal: true, dataModal: data.title, descModal: data.desc, eventData: data });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    };

    showFoodContent = () => {
      this.setState({ show_food: true });
    };

    hideFoodContent = () => {
      this.setState({ show_food: false });
    };

    getData(menu_item){ 
      if( menu_item !== "" ) {
        fetch(`https://bridgingcultures-api-first.ml/festival_details?name=`+menu_item,{
          method: 'GET'
        }).then(response => response.json()).then(data => {
          //console.log(data)
          var holidays_array = data.resource
          //console.log(holidays_array)
          var mod_holidays_array = []
          for (var i = 0; i < holidays_array.length; i++) {
            var temp = {}
            if( holidays_array[i].description != null ) {
              temp.title = holidays_array[i].festivals + " :- " + holidays_array[i].description + " :- " + holidays_array[i].date
            } else {
              temp.title = holidays_array[i].festivals + " :-  :- " + holidays_array[i].date.split("T")[0]
            }
            if( holidays_array[i].reference != null ) {
              temp.title = temp.title + " :- " + holidays_array[i].reference
            } else {
              temp.title = temp.title + " :- "
            }
            if( holidays_array[i].food != null ) {
              temp.title = temp.title + " :- " + holidays_array[i].food
            } else {
              temp.title = temp.title + " :- "
            }
            temp.start = new Date(holidays_array[i].date)
            mod_holidays_array.push(temp)
          }

          this.setState({calendarEvents:mod_holidays_array, country_name:menu_item})
          //console.log("____________________________________")
          //console.log(menu_item)
          //console.log(mod_holidays_array)
        })
      } 
    }

    handleOnClickFood = (food_item) => {
      //console.log("Food Click");
      //console.log(food_item);
      var restaurants_name = []
      var restaurants_locations = []
      this.setState({showLoading: true})
      //https://www.googleapis.com/customsearch/v1?key=AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc&cx=005263693131602275062:cztfzj4nvim&q=haleem au victoria notting hill
      fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc&cx=005263693131602275062:cztfzj4nvim&q=`+food_item+` `+this.state.client_address.country+` `+this.state.client_address.region+` `+this.state.client_address.city,{
          method: 'GET'
        }).then(response => response.json()).then(data => {
          console.log(data)
          if( parseInt(data.queries.request[0].totalResults) > 0 ) {
            for( var i=0; i<data.items.length;i++ ){
              console.log(data.items[i].title.split(" Delivery")[0])
              var title = data.items[i].title.split(" Delivery")[0]
              restaurants_name.push(title)
            }
            //console.log(restaurants_name)
            //const proxyurl = "https://cors-anywhere.herokuapp.com/";
            var restaurants_name_str = restaurants_name.join();
            
            //console.log("Test")
  
            fetch(`https://bridgingcultures-api-first.ml//restaurant_location?name=`+restaurants_name_str,{
              method: 'GET'
            }).then(response => response.json()).then(data => {
              //console.log(data)
              console.log(data.restaurant_items)
              var items_array = data.restaurant_items
              //this.setState({showLoading: false})
              console.log(items_array.length)
              for(var i = 0;i < items_array.length ;i++) {
                //console.log( items_array[i])
              if( items_array[i].candidates.length > 0 ) {
                var restaurant_content = {}
                restaurant_content["address"] = items_array[i].candidates[0].formatted_address
                restaurant_content["lat"] = items_array[i].candidates[0].geometry.location.lat
                restaurant_content["lng"] = items_array[i].candidates[0].geometry.location.lng
                restaurant_content["name"] = items_array[i].candidates[0].name
                //console.log(restaurants_name[i])
                restaurants_locations.push(restaurant_content)
              }
            }
            //console.log(restaurants_locations)
            this.setState({restaurants_locations:restaurants_locations, showLoading: false})
            })
          } else {
            this.setState({restaurants_locations:[], showLoading: false})
          }
        //}
      })
      //console.log(restaurants_name)
    };


    render() {
        var display_map = {display: 'none'}
        if( this.state.eventBriteList.length > 0 || this.state.restaurants_locations.length > 0 ) {
          display_map = {
            display: 'block'
          }
        } else {
          display_map = {
            display: 'none'
          }
        }
        let map_content_event;
        let map_content_restaurant;
        if( this.state.eventBriteList.length > 0 ) {
            map_content_event = (<div style={display_map} class="col-md-6">

            <Mainmap
            eventBriteLocation = {this.state.eventBriteList}
            locationDetails = {this.state.client_address}
            restaurants_locations = {this.state.restaurants_locations}
            />
            </div>) 
        } else if( this.state.restaurants_locations.length > 0 ) {
            map_content_restaurant = ( <div style={display_map} class="col-md-6">
            <Mainmap
            eventBriteLocation = {this.state.eventBriteList}
            locationDetails = {this.state.client_address}
            restaurants_locations = {this.state.restaurants_locations}
            />
            </div>) 

            
        }

        let event_header;
        let food_header;
        if (this.state.eventBriteList.length > 0) {
            event_header = (<div className="col s12 center">
                <h4 className="align-center">eXplore an Event</h4>
                <br></br></div>
            )

        }
        if (this.state.food_list.length > 0) {
            food_header = (<div className="col s12 center">
                <h4 className="align-center">Tantalize your Taste Buds</h4>
                <br></br> </div> )

        }
        const pagetitle = {
          fontFamily: "Gayathri",
          backgroundColor: "#F8F8F8",
          padding: "50px",
          textAlign: "center"
        };
        let loading_component;
        if( this.state.showLoading ) {
          loading_component = <div className="cal_overlay"><div className="loader"></div></div>
        }
        console.log(this.state.country_name_main)
        let country_main_name = this.state.country_name_main;
        return (
        <div >
        {loading_component}
           <div className="container">
                    <div className="section">
                        <div className="container">
                            <div className="row center">
                                <h3 className="header col s12 dark">Explore Events</h3>
                            </div>
                        </div>
                    </div>
            <ul>
      {loading_component}
        {/*<div style={pagetitle} className="rounded">
          <h1>Event Calendar</h1>
          <p>See what's on the horizon.</p>
        </div>
        <p></p>*/}
                        <h6>Please select a country:&ensp;</h6>
                      
        <select value={country_main_name} id="dropdown" onChange={this.handleChange}>
        <option value="Australia">Australia</option>

          <option value="Japan">Japan</option>
          {/*<option value="New Zealand">New Zealand</option>*/}
          <option value="China">China</option>
          <option value="India">India</option>
          {/*<option value="Philippines">Philippines</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Italy">Italy</option>
          <option value="South Africa">South Africa</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Sri Lanka">Sri Lanka</option>*/}
                            </select>
                           

        <div className="demo-app">
          <div className="demo-app-top">
            {/* <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp; */}
            {/* <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp; */}
          </div>
          <div className="demo-app-calendar">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              plugins={[dayGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              dateClick={ this.handleDateClick }
              eventClick={this.myFunction}
            />
            <Modal
                show={this.state.showModal}
                onHide={this.hideModal}
                name={this.state.dataModal}
                desc={this.state.descModal}
                eventData={this.state.eventData}
                toggleHandler={this.togglehandler}
                foodHandler={this.foodhandler}
                isAnyEventPresent={this.state.isAnyEventPresent}
              />
                            </div>
                            <br></br>
                        </div>
                        {event_header}
      
                        <div ref={this.myRef} className="row">
                            
          <div className="col-md-6"> 
          {this.state.eventBriteList.map((eventbrite) => {
            //console.log(this.state.eventBriteList)
            return (
            
                <div className="list-group">
                    <li className="list-group-item list-group-item-light" style={{width:'70%'}}>
                {/* <div>{eventbrite.name}</div> */}
                        <a className="list-group-item list-group-item-action list-group-item-primary" href = {eventbrite.url} target='_blank'>{eventbrite.name}</a>
                {/* <div>{eventbrite.description}</div> */}
                <div>{eventbrite.startTime}</div>
                <div>{eventbrite.endTime}</div>
                <div>{eventbrite.addressDisplay}</div>
                </li>
                <hr />
              </div>
            )
          })}
          </div>
          {map_content_event}
         </div>
                        {food_header}
                        <div className="row">
                            <div className="col-md-6"> 
          {this.state.food_list.map((food_list) => {
            //console.log(this.state.eventBriteList)
            return (
                <div className="list-group">
                 <li className="food_items_class" class="list-group-item list-group-item-light"   >
                        <div className="d-flex w-100 justify-content-between"><h5 class="mb-1">{food_list.name}</h5></div>
                        <div className="row">
                
                 <img className="food-items" src={food_list.imageurl} alt={food_list.name} />
                   
                            <div className="col-md-6">
                                <a href={food_list.url_1} className="list-group-item list-group-item-action list-group-item-primary food_item_details" target='_blank'>Click me for details</a>
                    <br />
                <a onClick={() => this.handleOnClickFood(food_list.name)} className="list-group-item list-group-item-action list-group-item-primary food_link" target='_blank'>Restaurants near me</a>
                    </div>
              
                 </div>
                
                
                {/* <div>{eventbrite.description}</div> 
                <div>{eventbrite.startTime}</div>
                <div>{eventbrite.endTime}</div>
                <div>{eventbrite.addressDisplay}</div> */}
                </li>
                <hr />
              </div>
            )
          })}
          </div>
          {map_content_restaurant}
           {/* <div style={display_map} class="col-md-6">
            <Mainmap
            restaurants_locations = {this.state.restaurants_locations}
            />
            </div> */}
         </div>
      </ul>

            </div> 
          
        </div>
            
            
            
            );


    }
   myFunction = (event) => {
      var title_content = event.event.title;
        var title_content = event.event.title;
        var data_json = {}
        data_json = { "title": [title_content.split(" :- ")[0]], "desc": [title_content.split(" :- ")[1]], "date":title_content.split(" :- ")[2], "reference":[title_content.split(" :- ")[3]], "food":[title_content.split(" :- ")[4]]}
        this.setState({ data_json: data_json, isAnyEventPresent: true });
        this.getModal(data_json)
        //this.getEventdata(data_json)
    }

    handleDateClick = (arg) => {
      var handleDate = arg.date
      //console.log(handleDate.getFullYear()+"-"+(handleDate.getMonth()+1)+"-"+handleDate.getDate())
      handleDate = handleDate.getFullYear()+"-"+(handleDate.getMonth()+1)+"-"+handleDate.getDate()
      var curr_date = arg.date.setHours(0,0,0,0)
      //console.log(this.state.calendarEvents)
      var calendar_events = this.state.calendarEvents
      var flag = 0
      var data_json = {}
      var title_array = []
      var desc_array = []
      var reference_array = []
      var food_array = []
      for (var i = 0; i < calendar_events.length; i++) {
        //console.log(calendar_events[i].start)
        if( calendar_events[i].start.setHours(0,0,0,0) === curr_date ) {
          flag = 1
          //console.log(calendar_events[i].title)
          var title_now = calendar_events[i].title.split(" :- ")[0]
          var desc = ""
          var ref = ""
          var food = ""
          // if(calendar_events[i].title.split(" :- ").length > 1) {
          //   desc = calendar_events[i].title.split(" :- ")[1]
          // }
          desc = calendar_events[i].title.split(" :- ")[1]
          ref = calendar_events[i].title.split(" :- ")[3]
          food = calendar_events[i].title.split(" :- ")[4]
          //data_json = { "title": title_now, "desc": desc}
          //this.getModal(data_json)
          title_array.push(title_now)
          desc_array.push(desc)
          reference_array.push(ref)
          food_array.push(food)
        }
      }
      if( flag === 0 ) {
          data_json = { "title": ["No important events"], "desc": [""], "date": handleDate, "reference":[""], "food":[""]}
          this.setState({ data_json: data_json, isAnyEventPresent: false });
          this.getModal(data_json)
      } else {
          data_json = { "title": title_array, "desc": desc_array, "date": handleDate, "reference": reference_array, "food": food_array}
          this.setState({ data_json: data_json, isAnyEventPresent: true });
          this.getModal(data_json)
      }
    }

    getEventdata = (event) => { 
        //this.setState({ showModal: false, food_list: []})
        var title_content = event.title
        title_content = title_content.toString().split("/")[0];
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

        //console.log(event_start_date)
        var location = "australia,%20melbourne"
        if( this.state.client_address != null  ) 
        {
          console.log(this.state.client_address)
          location = this.state.client_address.country + `, `+this.state.client_address.city
        }
        if( title_content !== "" ) {
        this.setState({ showLoading: true, showModal: false,restaurants_locations:[], food_list:[] });
          fetch(`https://bridgingcultures-api-first.ml/eventbrite?festival_name=`+title_content+`&location=`+location+`&start_date=`+event_start_date+`&end_date=`+event_end_date,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
        this.setState({ showLoading: false });
        var eventsbrite = data.events 
        var mod_eventsbrite = []
        //console.log(eventsbrite)
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
            this.setState({eventBriteList:mod_eventsbrite, showModal: false, restaurants_locations: []})
            window.scrollTo(0, this.myRef.current.offsetTop);
            //console.log(this.state.eventBriteList[1].l)
            return tempEvent
            }
            else
            {
            this.setState({eventBriteList:mod_eventsbrite, showModal: false, restaurants_locations: []})
            window.scrollTo(0, this.myRef.current.offsetTop);
            }
        })
      } 
    }

      getFoodData = (event) => {
      this.setState({ showModal: false, eventBriteList: []})
      //console.log(this.state.data_json.food)
      var food_items_array = []
      if( this.state.data_json.food[0] != "" ) {
        this.setState({ showLoading: true });
        var food_items = this.state.data_json.food[0].split(", ")
        food_items = food_items.slice(0, 3);
        //console.log(food_items)
        fetch(`https://bridgingcultures-api-first.ml/recipe_links?name=`+this.state.data_json.food+`&country=`+this.state.country_name,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
            //console.log(data)
            var items_array = data.food_items
            this.setState({showLoading: false})
            for(var i = 0;i < data.food_items.length ;i++)
              {
              var tempEvent = {};
              tempEvent.name = food_items[i]
              tempEvent.url_1 = items_array[i].items[0].link
              tempEvent.url_2 = items_array[i].items[1].link
              var imageurl_given = items_array[i].items[0].pagemap.cse_image[0].src.toString()
              if( imageurl_given.startsWith("http") ) {
                tempEvent.imageurl = items_array[i].items[0].pagemap.cse_image[0].src
              } else {
                tempEvent.imageurl = items_array[i].items[1].pagemap.cse_image[0].src
              }

              food_items_array.push(tempEvent)
              
              }
              this.setState({food_list:food_items_array, restaurants_locations: []})
              window.scrollTo(0, this.myRef.current.offsetTop-55);
          })
        
      }
    }
}

export default Event;