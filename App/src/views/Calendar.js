import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import "../scss/Calendar.scss";
export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  // calendarComponentRef = React.createRef();
  // state = {
  //   calendarWeekends: true,
  //   calendarEvents: [
  //     // initial event data
  //     { title: "Event Now", start: new Date() }
  //   ]
  // };

  render() {
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

        {/* ddl */}
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          Select a Country
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>United Kingdom</DropdownItem>
          <DropdownItem>New Zealand</DropdownItem>
          <DropdownItem>China</DropdownItem>
          <DropdownItem>India</DropdownItem>
          <DropdownItem>Philippines</DropdownItem>
          <DropdownItem>Vietmam</DropdownItem>
          <DropdownItem>Italy</DropdownItem>
          <DropdownItem>South Africa</DropdownItem>
          <DropdownItem>Malaysia</DropdownItem>
          <DropdownItem>Sri Lanka</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {/* <label>Please select a country:  </label>
        <select id="dropdown" ref={input => (this.menu = input)}>
          <option value="UK">United Kingdom</option>
          <option value="NZ">New Zealand</option>
          <option value="CN">China</option>
          <option value="IN">India</option>
          <option value="PH">Philippines</option>
        </select> */}
        {/* end ddl */}
          
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
              plugins={[dayGridPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              //dateClick={ this.handleDateClick }
            />
          </div>
        </div>
      </ul>
    );
  }

  // toggleWeekends = () => {
  //   this.setState({ // update a property
  //     calendarWeekends: !this.state.calendarWeekends
  //   })
  // }

  // gotoPast = () => {
  //   let calendarApi = this.calendarComponentRef.current.getApi()
  //   calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  // }

  // handleDateClick = (arg) => {
  //   if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
  //     this.setState({  // add new event data
  //       calendarEvents: this.state.calendarEvents.concat({ // creates a new array
  //         title: 'New Event',
  //         start: arg.date,
  //         allDay: arg.allDay
  //       })
  //     })
  //   }
  // }
}
