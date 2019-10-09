import React from 'react';
import { Link } from "react-router-dom";
import '../css/style.css';
import { Parallax, Card, CardTitle, Row, Col, Caption } from 'react-materialize';
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

import landingBannerJapan from './banner_landing_japan.jpg';
import card_australia from './card_aussie.png';
import card_japan from './card_japan.jpg';
import card_china from './card_china.png';
import card_india from './card_india.png';
import card_malaysia from './card_malaysia.jpg';
import card_italy from './card_italy.jpg';

import '../css/Calendar.scss'
const exact_month_names = ["January","February","March","April","May","June","July","August","September","October","November","December"]

class Event extends React.Component {
constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.togglehandler = this.togglehandler.bind(this);
    this.foodhandler = this.foodhandler.bind(this);
    this.handleOnClickFood = this.handleOnClickFood.bind(this);
    this.queryEventData = this.queryEventData.bind(this);
    this.myRef = React.createRef();
  }

    state = {
      isAnyEventPresent: false,
      calendarWeekends: true,
      calendarEvents: {"January":[],"February":[],"March":[],"April":[],"May":[],"June":[],"July":[],"August":[],"September":[],"October":[],"November":[],"December":[]},
      eventBriteList:[],
      showModal: false,
      dataModal: "",
      descModal: "",
      menu: "",
      data_json: {},
      show_food: false,
      food_list: [],
      restaurants_locations: [],
      country_name_main: "Australia",
      month_names : ["January","February","March","April","May","June","July","August","September","October","November","December"],
      current_month: exact_month_names[new Date().getMonth()],
      current_year: new Date().getFullYear(),
      event_listing: false,
      modal_content : "",
      festival_image: ""
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
            this.getData(country, false);
        }
        
      this.request_ip_address();
    }

    componentWillReceiveProps(nextProps){
      //if (nextProps.location.state === 'desiredState') {
        // do stuffs
      //}
      if( nextProps.location.state ) {
          //console.log(nextProps.location.state)
          const { country } = nextProps.location.state;
          //console.log(country)
          this.setState({ country_name_main: country })
          this.getData(country, false);
      }
    }

  formatDate(date) {
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

  request_ip_address() {
    //https://api.ipify.org/?format=json
    fetch(`https://api.ipify.org/?format=json`,{
      method: 'GET'
    }).then(response => response.json()).then(data => {
      //console.log(data.ip)
      fetch(`http://localhost:5000/eventbrite/location?ip_address=`+data.ip,{
            method: 'GET'
      }).then(response => response.json()).then(data => {
        //console.log("client address:")
        //console.log(data)
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
    this.getData(e.target.value, false);
    this.setState({ country_name_main: e.target.value })
  }

    calendarComponentRef = React.createRef()

    getModal = data => {
      this.setState({ showModal: true, dataModal: data.title, descModal: data.desc, eventData: data });
    }

    hideModal = () => {
        this.setState({ showModal: false, event_listing: false });
    };

    showFoodContent = () => {
      this.setState({ show_food: true });
    };

    hideFoodContent = () => {
      this.setState({ show_food: false });
    };

    getData(menu_item, isToggler){ 
      if( menu_item !== "" ) {
        fetch(`http://localhost:5000/festival_content?name=`+menu_item+`&year=`+this.state.current_year,{
          method: 'GET'
        }).then(response => response.json()).then(data => {
          console.log("========================================")
          console.log(data)
          var holidays_array = data.resource
          //console.log(holidays_array)
          var month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
          var mod_holidays_array = []
          var mod_months_array = []
          var festival_dict = {}
          var monthly_festivals = []
          var last_month = ""
          for (var i = 0; i < holidays_array.length; i++) {
            var temp = {}
            //console.log(monthly_festivals)
            temp.description = holidays_array[i].description
            temp.title = holidays_array[i].festivals
            temp.date = new Date(holidays_array[i].date)
            temp.reference = holidays_array[i].reference
            temp.food = holidays_array[i].food
            temp.image = holidays_array[i].image
            temp.food_desc = holidays_array[i].food_desc
            temp.food_default = holidays_array[i].food_default
            temp.celebration = holidays_array[i].celebration
            var curr_month = month[temp.date.getMonth()]
            if( !(curr_month in festival_dict) ) {
              festival_dict[curr_month] = []
            }
            festival_dict[curr_month].push(temp)
          }
          
          if( isToggler ) {
            this.setState({calendarEvents:festival_dict})
          } else {
            let d = new Date();
            //console.log("+++++++++++========================");
            let curr_mon_code = d.getMonth();
            let n = this.state.month_names[curr_mon_code];
            console.log(n)
            let curr_yr = this.state.current_year
            //console.log(this.state.month_names[d.getMonth()+2])
            if( Object.entries(festival_dict).length != 0 && festival_dict.constructor === Object ) {
              console.log(festival_dict)
              console.log(exact_month_names[curr_mon_code+1])
              //console.log(n)
              if( festival_dict[n] && festival_dict[n].length > 0 ) {
                festival_dict["start_month"] = n
                festival_dict["year"] = curr_yr
              } else if( festival_dict[exact_month_names[curr_mon_code+1]].length > 0 ) {
                festival_dict["start_month"] = exact_month_names[curr_mon_code+1]
                festival_dict["year"] = curr_yr
              }
            }
            //console.log(festival_dict)
            this.setState({calendarEvents:festival_dict, country_name:menu_item, current_month:festival_dict.start_month, current_year:festival_dict.year})
        
          }
          //console.log("____________________________________")
          //console.log(menu_item)
          //console.log(mod_holidays_array)
        })
      } 
    }

    toggleMonthBack = () => {
      var curr_mon = exact_month_names.indexOf(this.state.current_month)
      var curr_year = this.state.current_year
      var is_next_year_needed = false
      if( curr_mon == 0 && curr_year == 2019 ) {
        curr_mon = 12
        curr_year = curr_year+1
        console.log(exact_month_names[curr_mon-1])
        console.log(curr_year)
        is_next_year_needed = true
      } else if ( curr_mon == 0 && curr_year == 2020 ) {
        curr_mon = 12
        curr_year = curr_year-1
        console.log(exact_month_names[curr_mon-1])
        console.log(curr_year)
        is_next_year_needed = true
      }
      if( !(exact_month_names[curr_mon-1] in this.state.calendarEvents) ) {
        curr_mon = curr_mon - 1
        this.myRef.current.insertAdjacentHTML("afterend", '<p id="event_none_class">No specific events available for '+ exact_month_names[curr_mon] + ' ' + curr_year + '.</p>');
        setTimeout( () => {
          if( document.body.contains(document.getElementById("event_none_class")) ) {
            document.querySelector('#event_none_class').remove();
          }
            //console.log("Removed")
        }, 5000);
      }
      //this.setState({current_month:exact_month_names[curr_mon-1], current_year:curr_year})
      this.setState(
          {current_month:exact_month_names[curr_mon-1], current_year:curr_year}, () => {
          if( is_next_year_needed ) {
            console.log(this.state.current_month)
            console.log(this.state.current_year)
            this.getData(this.state.country_name_main, true)
          }
      });
    }

    toggleMonthFront = () => {
      var curr_mon = exact_month_names.indexOf(this.state.current_month)
      var curr_year = this.state.current_year
      var is_next_year_needed = false
      if( curr_mon == 11 && curr_year == 2019 ) {
        curr_mon = -1
        curr_year = curr_year+1
        console.log(exact_month_names[curr_mon+1])
        console.log(curr_year)
        is_next_year_needed = true
      } else if ( curr_mon == 11 && curr_year == 2020 ) {
        curr_mon = -1
        curr_year = curr_year-1
        console.log(exact_month_names[curr_mon+1])
        console.log(curr_year)
        is_next_year_needed = true
      }
      if( !(exact_month_names[curr_mon+1] in this.state.calendarEvents) ) {
        curr_mon = curr_mon + 1
        this.myRef.current.insertAdjacentHTML("afterend", '<p id="event_none_class">No specific events available for '+ exact_month_names[curr_mon] + ' ' + curr_year + '.</p>');
        setTimeout( () => {
          if( document.body.contains(document.getElementById("event_none_class")) ) {
            document.querySelector('#event_none_class').remove();
          }
            //console.log("Removed")
        }, 5000);
      }
      //this.setState({current_month:exact_month_names[curr_mon+1], current_year:curr_year})
      this.setState(
          {current_month:exact_month_names[curr_mon+1], current_year:curr_year}, () => {
          if( is_next_year_needed ) {
            console.log(this.state.current_month)
            console.log(this.state.current_year)
            this.getData(this.state.country_name_main, true)
          }
      });
      
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
          //console.log(data)
          var city = this.state.client_address.city
          if( parseInt(data.queries.request[0].totalResults) > 0 ) {
            for( var i=0; i<data.items.length;i++ ){
              //console.log(data.items[i].title.split(" |")[1])
              var title = data.items[i].title.split(" |")[0]
              city = this.state.client_address.city
              if( data.items[i].title.split(" |").length > 1 & (data.items[i].title.split(" |")[1] != "Uber Eats")) {
                city = data.items[i].title.split(" |")[1]
              }
              title = title.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
              restaurants_name.push(title+' '+city)
            }
            //console.log(restaurants_name)
            //const proxyurl = "https://cors-anywhere.herokuapp.com/";
            var restaurants_name_str = restaurants_name.join();
            
            //console.log("Test")
            var location = "australia,%20melbourne"
            if( this.state.client_address != null  ) 
            {
              //var city = this.state.client_address.city
              //console.log(this.state.client_address)

              location = this.state.client_address.region + ` ` + this.state.client_address.country
            }
            fetch(`http://localhost:5000/restaurant_location?name=`+restaurants_name_str+'&location='+location,{
              method: 'GET'
            }).then(response => response.json()).then(data => {
              //console.log(data)
              //console.log(data.restaurant_items)
              var items_array = data.restaurant_items
              //this.setState({showLoading: false})
              //console.log(items_array.length)
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
      let image_src = card_australia;
      let modal_content;
      let loading_component;
      let culture_desc;
      let title_country_name = "Australian Culture";
        if( this.state.country_name_main == "Australia" ) {
          image_src = card_australia;
          title_country_name = "Australian Culture";
          culture_desc = "The culture of Australia is primarily a Western culture, to some extent derived from Britain but also influenced by the unique geography of Australia, the cultural input of Aboriginal, Torres Strait Islander and other Australian people.";
        } else if( this.state.country_name_main == "India" ) {
          image_src = card_india;
          title_country_name = "Indian Culture";
          culture_desc = "India has its unique culture and tradition which makes it distinct from whole world, it will be correct to say that India is a land having culture of cultures which no country of the world has. Despite having so many cultures, traditions and religions still the people live in peace, harmony and love showcasing the unique culture of ‘Unity in Diversity’."
        } else if( this.state.country_name_main == "China" ) {
          image_src = card_china;
          title_country_name = "Chinese Culture";
          culture_desc = "Chinese culture is one of the world's oldest cultures, originating thousands of years ago. The area over which the culture prevails covers a large geographical region in East Asia and is extremely diverse and varying, with customs and traditions varying greatly between provinces, cities, and even towns as well.";
        } else if( this.state.country_name_main == "Japan" ) {
          image_src = landingBannerJapan;
          title_country_name = "Japanese Culture";
          culture_desc = "The culture of Japan has changed greatly over the millennia, from the country's prehistoric Jōmon period, to its contemporary modern culture, which absorbs influences from Asia, Europe, and North America.";
        } else if( this.state.country_name_main == "Malaysia" ) {
          image_src = card_malaysia;
          title_country_name = "Malaysian Culture";
          culture_desc = "The culture of Malaysia draws on the varied cultures of the different people of Malaysia. The first people to live in the area were indigenous tribes that still remain; they were followed by the Malays, who moved there from mainland Asia in ancient times. Chinese and Indian cultural influences made their mark when trade began with those countries, and increased with immigration to Malaysia.";
        } else if( this.state.country_name_main == "Italy" ) {
          image_src = card_italy;
          title_country_name = "Italian Culture";
          culture_desc = "Italy is considered the birthplace of Western civilization and a cultural superpower. Italy has been the starting point of phenomena of international impact such as the Magna Graecia, the Roman Empire, the Roman Catholic Church, the Romanesque, the Renaissance, the Scientific revolution,[3] the Baroque, the Neo-classicism, the Risorgimento and the European integration. During its history, the nation has given birth to an enormous number of notable people.";
        }
      if( this.state.event_listing == true ) {
        //console.log("INNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
        if( this.state.eventBriteList.length > 1 ) {
          let event_dict = this.state.eventBriteList
          let location_pre = this.state.client_address
          this.props.history.push({
            pathname:"/event_locate",
            state:{
                event_dict,
                location: location_pre,
                country_name: this.state.country_name_main,
                image: this.state.festival_image
             }
           });
        } else if( this.state.showModal == false ){
          //console.log("Nulll")
          this.setState({showModal: true, modal_content : "No events available for the current selection."})
        }
      } 
      if( this.state.showLoading ) {
        loading_component = <div className="cal_overlay"><div className="loader"></div></div>
      }
        //console.log("+++++++++++++++++++++++++++++++++++++++")
        //console.log(this.state.calendarEvents)
        // let d = new Date();
        // console.log("+++++++++++========================");
        // let curr_mon_code = d.getMonth();
        // let n = this.state.month_names[curr_mon_code];
        // //console.log(this.state.month_names[d.getMonth()+2])
        // if( Object.entries(this.state.calendarEvents).length != 0 && this.state.calendarEvents.constructor === Object ) {
        //   console.log(this.state.calendarEvents)
        //   console.log(n)
        //   if( this.state.calendarEvents[n].length > 0 ) {
        //     console.log("Present");
        //   } else if( this.state.calendarEvents[this.state.month_names[curr_mon_code+1]].length > 0 ) {
        //     console.log("Not present");
        //   }
        // }
        
        return (
          <div>
                <div ref={this.myRef} id="index-banner" className="parallax-container events_banner">
                    <div className="section no-pad-bot">
                        <div id="event_header_container" className="container header_outer_container" >
                           
                            <div id="event_header_content" className="banner_header header_content_event">  
                            <Caption>
                                <h1 id="event_text" className="header left white-text-banner">
                                    {title_country_name}
                                </h1>
                                <h5 id="cultural_desc">{culture_desc}
                                </h5>
                            </Caption>
                            </div>
                        </div>
                    </div>
                    <Parallax className="parallax" image={<img src={image_src} className="inner-box inner-box-event-image"/>} alt="Unsplashed background img 1"></Parallax>
                </div>
                {loading_component}
                <Row className="div_row">
                <Col className="back_home_col">
                <button type="button" className="back_home_btn">
                <Link className="back_home_link" to={{ pathname: "/" }}  >Back to home</Link>
                </button>
                </Col>
                
                <Col>
                <h2 className="upcoming_header">Upcoming Festivals & Events</h2>
                </Col>
                </Row>
                <Row className="div_row">
                  <Col>
                    <div id="left_month" onClick={ this.toggleMonthBack } >&#8249;&#8249;</div>
                  </Col>
                  <Col className="month_name_col">
                    <div className="current_month">{this.state.current_month} {this.state.current_year}</div>
                  </Col>
                  <Col>
                    <div id="right_month" onClick={ this.toggleMonthFront }>&#8250;&#8250;</div>
                  </Col>
                </Row>
                {this.state.calendarEvents[this.state.current_month].map((calendarevent) => {
                  console.log(this.state.calendarEvents)
                  return (
                <Row className="div_row event_row">
                  <Col className="event_image_col">
                    <img src={calendarevent.image} className="mian_image"/>
                  </Col>
                  <Col className="event_desc_col">
                    <Row className="inner_row_col"><h4>{calendarevent.title}</h4></Row>
                    <Row className="inner_row_col">{calendarevent.description}</Row>
                  </Col>
                  <Col className="event_stat_col">
                  <Row className="inner_row_col"><h5>{this.formatDate(calendarevent.date)}</h5></Row>
                  <Row className="inner_row_col">
                    <button type="button" className="bg_btn">
                    {/*<Link className="bg_link" to={{ pathname: "/event_locate",state: { title: calendarevent.title,date:calendarevent.date,location:this.state.client_address} }}  >Attend Events</Link>*/}
                    <div className="bg_link" onClick={() =>this.getEventdata({ image:calendarevent.image,title: calendarevent.title,date:calendarevent.date,location:this.state.client_address,country_name:this.state.country_name_main})}>Attend Events</div>

                    </button>
                  </Row>
                  <Row className="inner_row_col">
                  {/*<Link
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
                  </Link>*/}
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
                  </Col>
                </Row>
                  )
                })}
                <Modal
          show={this.state.showModal}
          onHide={this.hideModal}
          name={this.state.modal_content}
        />
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

    queryEventData = (event) => {
      console.log("$$$$$$$$$")
      event.location = this.state.client_address
      console.log(event)
      let rendered_value = []
      this.getEventdata(event)
      // if( rendered_value.length > 0 ) {
      //   this.context.router.push({
      //     pathname: '/event_locate',
      //     state: {event}  
      //   })
      // } else {
      //   console.log("Poda")
      // }
    }

    getEventdata = (event) => { 
        //this.setState({ showModal: false, food_list: []})
        console.log("Koo")
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
          fetch(`http://localhost:5000/eventbrite?festival_name=`+title_content+`&location=`+location+`&start_date=`+event_start_date+`&end_date=`+event_end_date,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
        this.setState({ showLoading: false });
        var eventsbrite = data.events 
        var mod_eventsbrite = []
        console.log(eventsbrite)
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
            //this.setState({eventBriteList:mod_eventsbrite, showModal: false, restaurants_locations: []})
            //window.scrollTo(0, this.myRef.current.offsetTop);
            //console.log(this.state.eventBriteList[1].l)
            //return tempEvent
            }
            mod_eventsbrite = mod_eventsbrite.slice(0,3)
            console.log(mod_eventsbrite)
            this.setState({eventBriteList:mod_eventsbrite, event_listing: true, showLoading: false, festival_image: event.image})
          //return mod_eventsbrite;
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
        fetch(`http://localhost:5000/recipe_links?name=`+this.state.data_json.food+`&country=`+this.state.country_name,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
            console.log(data)
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
    checkForFood = (state_content) => {
      if( state_content.food ) {
          this.props.history.push({
            pathname:"/food",
            state:state_content
           });
        } else if( this.state.showModal == false ){
          //console.log("Nulll")
          this.setState({showModal: true, modal_content : "No food available for your current selection."})
        }
    }
}

export default Event;
