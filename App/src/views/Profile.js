import React, { Component, lazy, Suspense } from 'react';

class Profile extends Component {
    constructor(props) {
      super(props);
    }

    render() { 
        const placeholderStyle = {display: 'block', width: '1000px', height: '827px', margin: '0px', padding: '0px', border: 'none'};
      return (
        <div>
            <iframe src = "https://a.tiles.mapbox.com/v4/sbsonline.ido691he.html?access_token=pk.eyJ1Ijoic2Jzb25saW5lIiwiYSI6IklRMkRCVVEifQ.ldQz-kg5lTylBG6J4HoXbg"
            style={placeholderStyle}>
          </iframe>
        </div>
      );
  }
}
  export default Profile;

  