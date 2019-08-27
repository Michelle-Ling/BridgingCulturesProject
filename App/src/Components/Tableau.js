import React from "react";

const placeholderStyle = {display: 'block', width: '1000px', height: '827px', margin: '0px', padding: '0px', border: 'none'};

function Tableau(props) {
  //   return <h1>Hello, {props.name}</h1>;
      return <iframe src = "https://public.tableau.com/shared/NN2GWQS5P?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:loadOrderID=0"
      style={placeholderStyle}>
    </iframe>;
   }
   
   const element = <Tableau />;
   export default Tableau;

// <iframe src = "https://public.tableau.com/shared/NN2GWQS5P?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:loadOrderID=0"
//       style={placeholderStyle}>
        
// </iframe>

// class Grid extends React.Component {
//   iframe: function () {
//     return {
//       __html: this.props.iframe
//     }
//   }

//   render() {
//         return (
//           <div>
//             <div dangerouslySetInnerHTML={ this.iframe() } />
//           </div>
//         );
//       };
//   }

//   render() {
//       return (
//           <div>
//               {this.renderItems()}
//           </div>
//       );
//   }
// }


// const Tableau = React.createClass({
//       iframe: function () {
//         return {
//           __html: this.props.iframe
//         }
//       },
    
//       render: function() {
//         return (
//           <div>
//             <div dangerouslySetInnerHTML={ this.iframe() } />
//           </div>
//         );
//       }
//     });
    
//     const iframe = '<iframe src="https://public.tableau.com/shared/NN2GWQS5P?:embed=y&:showVizHome=no&:host_url=https%3A%2F%2Fpublic.tableau.com%2F&:embed_code_version=3&:toolbar=yes&:animate_transition=yes&:display_static_image=no&:display_spinner=no&:display_overlay=yes&:display_count=yes&:loadOrderID=0" width="540" height="450"></iframe>'; 

//     export default Tableau;
 
