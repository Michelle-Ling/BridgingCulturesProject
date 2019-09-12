// Packages to be imported
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "../Modal/Modal";

import styled from "styled-components";

const Section = styled.section`
  padding: 30px 0 325px;
`;




const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 300;
  line-height: normal;
  color: #1b5cce;
  text-align: center;
  margin-bottom: 2px;
`;

const SubTitle = styled.h5`
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  color: #aeaeae;
  margin-bottom: 25px;
  @media (min-width: 992px) {
    margin-bottom: 50px;
  }
`;


// Main Calendar class for Day grid calendar implementation
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.highlightedclassname = []
        this.spansize = 0
    }


    handleChange(e) {
        this.getData(e.target.value);
    }

    calendarComponentRef = React.createRef()

    state = {
        calendarWeekends: true,
        calendarEvents: [],
        showModal: false,
        dataModal: "",
        descModal: "",
        menu: ""
    }

    getModal = data => {
        this.setState({ showModal: true, dataModal: data.title, descModal: data.desc });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    };


    getData(menu_item) {
        if (menu_item !== "") {
            fetch(`https://bridgingcultures.ml/festivals?name=` + menu_item, {
                method: 'GET'
            }).then(response => response.json()).then(data => {
                console.log(data)
                var holidays_array = data.response.holidays
                //console.log(holidays_array)
                var mod_holidays_array = []
                for (var i = 0; i < holidays_array.length; i++) {
                    var temp = {}
                    if (holidays_array[i].description != null) {
                        temp.title = holidays_array[i].name + " :- " + holidays_array[i].description
                    } else {
                        temp.title = holidays_array[i].name
                    }
                    temp.start = new Date(holidays_array[i].date.iso)
                    mod_holidays_array.push(temp)
                }

                this.setState({ calendarEvents: mod_holidays_array })
                //console.log(mod_holidays_array)
            })
        }
    }

    componentWillMount() {
        console.log("Going in")
        this.getData("Australia");
    }

    render() {
        // console.log(this.highlightedclassname.length)
        // for (let i = 0; i < this.highlightedclassname.length; i++) {
        //   console.log("Hello!!!!!!")
        //   this.highlightedclassname[i].addEventListener('click', this.myFunction, false);
        //   console.log("Hello!!!!!!")
        // }
        
     
        return (
          
            <ul>
                <Section id="events">
               
                <p></p>
                    <SectionTitle>EXploe Cultures </SectionTitle>
                    <p></p>
                <SubTitle>
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
                    </SubTitle>
               

                <div className="demo-app">
                   
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
                            dateClick={this.handleDateClick}
                            eventClick={this.myFunction}
                        />
                        <Modal
                            show={this.state.showModal}
                            onHide={this.hideModal}
                            name={this.state.dataModal}
                            desc={this.state.descModal}
                        />
                    </div>
                    </div>
                </Section>   
                </ul>
             
        )
     
            }
    myFunction = (event) => {
        var title_content = event.event.title;
        var data_json = { "title": [title_content.split(":-")[0]], "desc": [title_content.split(":-")[1]] }
        this.getModal(data_json)
    }

    handleDateClick = (arg) => {
        var curr_date = arg.date.setHours(0, 0, 0, 0)
        //console.log(this.state.calendarEvents)
        var calendar_events = this.state.calendarEvents
        var flag = 0
        var data_json = {}
        var title_array = []
        var desc_array = []
        for (var i = 0; i < calendar_events.length; i++) {
            //console.log(calendar_events[i].start)
            if (calendar_events[i].start.setHours(0, 0, 0, 0) === curr_date) {
                flag = 1
                //console.log(calendar_events[i].title)
                var title_now = calendar_events[i].title.split(":-")[0]
                var desc = ""
                if (calendar_events[i].title.split(":-").length > 1) {
                    desc = calendar_events[i].title.split(":-")[1]
                }
                //data_json = { "title": title_now, "desc": desc}
                //this.getModal(data_json)
                title_array.push(title_now)
                desc_array.push(desc)
            }
        }
        if (flag === 0) {
            data_json = { "title": ["No important events"], "desc": [""] }
            this.getModal(data_json)
        } else {
            data_json = { "title": title_array, "desc": desc_array }
            this.getModal(data_json)
        }
    }

}