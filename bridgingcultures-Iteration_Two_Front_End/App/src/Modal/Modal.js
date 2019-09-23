// Packages to be imported
import React, { Component } from "react";
import "../css/style.css";
import "./Modal.css";

// Modal for tool tip information about the festivals anf events
class Modal extends Component {
  render() {
    console.log(this.props);
    var handler = this.props.toggleHandler
    var foodhandler = this.props.foodHandler
    let eventbtn;
    let foodbtn;
    let isAnyEventPresent = this.props.isAnyEventPresent
    //if( this.props.eventData ) {
    //  console.log(this.props.eventData.food[0])
    //}
    
    if( this.props.name.length > 1 | isAnyEventPresent === false ) {
      handler = this.props.onHide
    } else if( this.props.eventData && this.props.eventData.food[0] === "" ) {
        eventbtn = <button className="btn btn-primary" style={{marginRight:'30px'}} onClick={handler}>Events</button>
    } else {
        eventbtn = <button className="btn btn-primary" style={{marginRight:'30px'}} onClick={handler}>Events</button>
        foodbtn = <button className="btn btn-primary"  onClick={foodhandler}>Food</button>
    }
    let source_1;
    let source_2;
    if( this.props.eventData && this.props.desc[0] != "" ) {
      source_1 = <a className='source_link' href={this.props.eventData.reference[0]} target='_blank'>[Source]</a> 
    }
    if( this.props.eventData && this.props.desc.length > 1 && this.props.desc[1] != "" ) {
      source_2 = <a className='source_link' href={this.props.eventData.reference[1]} target='_blank'>[Source]</a> 
    }
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="modal_tooltip">
          <div className="modal_content_div">
            <div className="modal_title_content">{this.props.name[0]}</div>
            <div className="modal_desc_content">{this.props.desc[0]}{source_1}</div>
            <hr></hr>
            {/* <div className="modal_event_title">{this.props.eventTitle[0].name.text}</div> */}
            <div className="modal_title_content">{this.props.name[1]}</div>
            <div className="modal_desc_content">{this.props.desc[1]}{source_2}</div>
                        <button className="btn btn-primary" style={{marginRight:'30px'}} onClick={this.props.onHide}>Close</button>
            {eventbtn}
            {foodbtn}
          </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;