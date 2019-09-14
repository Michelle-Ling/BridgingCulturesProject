// Packages to be imported
import React, { Component } from "react";

import "./Modal.css";

// Modal for tool tip information about the festivals anf events
class Modal extends Component {
  render() {
    console.log(this.props.show);
    var handler = this.props.toggleHandler
    let eventbtn;
    if( this.props.name.length > 1 ) {
      handler = this.props.onHide
    } else {
      eventbtn = <button onClick={handler}>Events</button>
    }
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="modal_tooltip">
          <div className="modal_content_div">
            <div className="modal_title_content">{this.props.name[0]}</div>
            <div className="modal_desc_content">{this.props.desc[0]}</div>
            <hr></hr>
            {/* <div className="modal_event_title">{this.props.eventTitle[0].name.text}</div> */}
            <div className="modal_title_content">{this.props.name[1]}</div>
            <div className="modal_desc_content">{this.props.desc[1]}</div>
            <button onClick={this.props.onHide}>Close</button>
            {eventbtn}
          </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;