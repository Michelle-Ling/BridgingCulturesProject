import React, { Component, lazy, Suspense } from "react";

class Home extends Component {
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
        {/* <div style={GayathriFont}>
          <h1>Educating the next generation about traditions is our mission.</h1>
        </div> */}
        <div style={pagetitle} className="rounded">
          <h1>Bridging Cultures</h1>
          <p>Educating the next generation about traditions is our mission.</p>
        </div>
        <p></p>
        <div style={pagetitle} className="rounded">
          <h1>Where did new immigrants settle in Australia?</h1>
          <p>
            <a href="#/profile">
              Check out the cultural profile of suburbs in Victoria
            </a>
          </p>
        </div>
        <div className="d-flex justify-content-center" style={bgCol}>
          <iframe class="embed-responsive-item"
            src="https://public.tableau.com/shared/NH9RDCJ65?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&publish=yes&:loadOrderID=0"
            style={placeholderStyle}
          ></iframe>
        </div>
        
      </ul>
    );
  }
}

export default Home;
