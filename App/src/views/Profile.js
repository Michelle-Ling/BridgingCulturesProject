import React, { Component, lazy, Suspense } from "react";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const pagetitle = {
      fontFamily: "Gayathri",
      backgroundColor: "#F8F8F8",
      padding: "50px",
      textAlign: "center"
    };
    const placeholderStyle = {
      display: "block",
      width: "1000px",
      height: "827px",
      margin: "0px",
      padding: "0px",
      border: "none"
    };
    const bgCol = {
      backgroundColor: "#F8F8F8",
    };

    return (
      <ul>
        <div style={pagetitle} className="pagetitle">
          <h1>Suburb Profile</h1>
          <p>Explore the interactive map.</p>
        </div>
        <p></p>
        <div style={pagetitle} className="rounded">
          <h1>Feed your curiosity</h1>
          <p>Zoom out to see the profile of suburbs in other states.</p>
          </div>
        <div className="d-flex justify-content-center" style={bgCol}>
          <iframe class="embed-responsive-item"
            src="https://a.tiles.mapbox.com/v4/sbsonline.ido691he.html?access_token=pk.eyJ1Ijoic2Jzb25saW5lIiwiYSI6IklRMkRCVVEifQ.ldQz-kg5lTylBG6J4HoXbg"
            style={placeholderStyle}
          ></iframe>
        </div>
      </ul>
    );
  }
}
export default Profile;
