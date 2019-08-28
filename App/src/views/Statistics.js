import React, { Component, lazy, Suspense } from 'react';

class Statistics extends Component {
    constructor(props) {
      super(props);
    }

    render() { 
      const placeholderStyle = {display: 'block', width: '1000px', height: '827px', margin: '0px', padding: '0px', border: 'none'};
      return (
        <div><iframe src = "https://public.tableau.com/views/test_15667233981190/Dashboard3?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:tabs=no&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&publish=yes&:loadOrderID=0"
            style={placeholderStyle}>
          </iframe>
          </div>
        
      );        
  }
}
  export default Statistics;

  