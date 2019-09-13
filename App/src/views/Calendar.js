// Packages to be imported
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {FestivalData} from '../FestivalData.js'
import interactionPlugin from "@fullcalendar/interaction";
import Mainmap from "../Mainmap";
import Modal from "../Modal/Modal";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import '../scss/Calendar.scss' 
// Main Calendar class for Day grid calendar implementation

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
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
        //console.log(data)
        this.setState({ client_address: data })
        //return data
        //console.log(mod_holidays_array)
      })
      //
      //console.log(mod_holidays_array)
    })
  }

  handleChange(e) {
    this.getData(e.target.value);
  }

    calendarComponentRef = React.createRef()
    
    state = {
      calendarWeekends: true,
      calendarEvents: [],
      eventBriteList:[],
      showModal: false,
      dataModal: "",
      descModal: "",
      menu: ""
    }

    getModal = data => {
      this.setState({ showModal: true, dataModal: data.title, descModal: data.desc, eventData: data });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    };


    getData(menu_item){ 
      if( menu_item !== "" ) {
        fetch(`http://localhost:5000/festivals?name=`+menu_item,{
          method: 'GET'
        }).then(response => response.json()).then(data => {
          //console.log(data)
          var holidays_array = data.response.holidays
          //console.log(holidays_array)
          var mod_holidays_array = []
          for (var i = 0; i < holidays_array.length; i++) {
            var temp = {}
            if( holidays_array[i].description != null ) {
              temp.title = holidays_array[i].name + " :- " + holidays_array[i].description + " :- " + holidays_array[i].date.iso
            } else {
              temp.title = holidays_array[i].name + " :- " + holidays_array[i].date.iso.split("T")[0]
            }
            temp.start = new Date(holidays_array[i].date.iso)
            mod_holidays_array.push(temp)
          }

          this.setState({calendarEvents:mod_holidays_array})
          //console.log(mod_holidays_array)
        })
      } 
    }
    
    componentWillMount(){
      //console.log("Going in")
      this.getData("Australia");
    }
    componentDidMount() {
      this.request_ip_address();
    }

    render() {
        var display_map = {display: 'none'}
        if( this.state.eventBriteList.length > 0 ) {
          display_map = {
            display: 'block'
          }
        }
        const pagetitle = {
          fontFamily: "Gayathri",
          backgroundColor: "#F8F8F8",
          padding: "50px",
          textAlign: "center"
        };

    
      return (
<ul>
        <div style={pagetitle} className="rounded">
          <h1>Event Calendar</h1>
          <p>See what's on the horizon.</p>
        </div>
        <p></p>
      <label>Please select a country:&ensp;</label>
        <select id="dropdown" onChange={this.handleChange}>
        <option value="Australia">Australia</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="New Zealand">New Zealand</option>
          <option value="China">China</option>
          <option value="India">India</option>
          <option value="Philippines">Philippines</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Italy">Italy</option>
          <option value="South Africa">South Africa</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Sri Lanka">Sri Lanka</option>
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
              />
          </div>
        </div>
      
        <div class="row">
          <div class="col-md-6"> 
          {this.state.eventBriteList.map((eventbrite) => {
            //console.log(this.state.eventBriteList)
            return (
            
              <div class="list-group">
                {/* <div>{eventbrite.name}</div> */}
                <a href = {eventbrite.url}>{eventbrite.name}</a>
                {/* <div>{eventbrite.description}</div> */}
                <div>{eventbrite.startTime}</div>
                <div>{eventbrite.endTime}</div>
                <div>{eventbrite.addressDisplay}</div>
                <hr />
              </div>
            )
          })}
          </div>
          <div style={display_map} class="col-md-6">
            <Mainmap
            eventBriteLocation = {this.state.eventBriteList}
            locationDetails = {this.state.client_address}
            />
            </div>
         </div>
      </ul>
      )
    }
    myFunction = (event) => {
      var title_content = event.event.title;
      //console.log("----------------------------------")
      //console.log(event)
        var title_content = event.event.title;
        var data_json = {}
        if( (title_content.split(" :- ")).length > 2 ) {
          data_json = { "title": [title_content.split(":-")[0]], "desc": [title_content.split(":-")[1]], "date":title_content.split(":-")[2]}
        } else {
          data_json = { "title": [title_content.split(":-")[0]], "desc": [], "date":title_content.split(":-")[1]}
        }
        //this.getModal(data_json)
        this.getEventdata(data_json)
    }

    // newFunction(event){
    //   var title_content = event.event.title;
    //   console.log("----------------------------------")
    //   console.log(event)
    //  return
    //  (  this.getEventdata(title_content))
    // }

    handleDateClick = (arg) => {
      var curr_date = arg.date.setHours(0,0,0,0)
      //console.log(this.state.calendarEvents)
      var calendar_events = this.state.calendarEvents
      var flag = 0
      var data_json = {}
      var title_array = []
      var desc_array = []
      for (var i = 0; i < calendar_events.length; i++) {
        //console.log(calendar_events[i].start)
        if( calendar_events[i].start.setHours(0,0,0,0) === curr_date ) {
          flag = 1
          //console.log(calendar_events[i].title)
          var title_now = calendar_events[i].title.split(":-")[0]
          var desc = ""
          if(calendar_events[i].title.split(":-").length > 2) {
            desc = calendar_events[i].title.split(":-")[1]
          }
          //data_json = { "title": title_now, "desc": desc}
          //this.getModal(data_json)
          title_array.push(title_now)
          desc_array.push(desc)
        }
      }
      if( flag === 0 ) {
          data_json = { "title": ["No important events"], "desc": [""]}
          this.getModal(data_json)
      } else {
          data_json = { "title": title_array, "desc": desc_array}
          this.getModal(data_json)
      }
    }

    getEventdata = (event) => { 
        var title_content = event.title
        title_content = title_content.toString().split("/")[0];
        var event_end_date = event.date;
        var event_start_date = event.date;
        console.log(event_end_date)
        event_end_date = event_end_date.replace(/\s/g, '')
        var start_date_conv = new Date(event_start_date);
        console.log(start_date_conv)
        event_start_date = start_date_conv.setDate(start_date_conv.getDate() - 1);
        event_start_date = new Date(event_start_date)
        event_start_date = event_start_date.getFullYear()+"-"+(event_start_date.getMonth()+1)+"-"+event_start_date.getDate()

        //console.log(event_start_date)
        var location = "australia,%20melbourne"
        if( this.state.client_address != null  ) 
        {
          //console.log(this.state.client_address)
          location = this.state.client_address.country + `, `+this.state.client_address.city
        }
        if( title_content !== "" ) {
          fetch(`http://localhost:5000/eventbrite?festival_name=`+title_content+`&location=`+location+`&start_date=`+event_start_date+`&end_date=`+event_end_date,{
          method: 'GET'
        }).then(response => response.json()).then(data => { 
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
        this.setState({eventBriteList:mod_eventsbrite})
        //console.log(this.state.eventBriteList[1].l)
            return tempEvent
            }
            else
            {
            
            }
        })
      } 
    }
  }
