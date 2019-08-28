import React, { Component } from "react";

import "./Modal.css";

class Modal extends Component {
  render() {
    console.log(this.props.show);
    return (
      <React.Fragment>
        {this.props.show && (
          <div className="modal_tooltip">
          <div className="modal_content_div">
            <div className="modal_title_content">{this.props.name}</div>
            <div className="modal_desc_content">{this.props.desc}</div>
            <button onClick={this.props.onHide}>Close</button>
          </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Modal;