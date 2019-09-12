import React, { Component } from "react";
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
class Mainmap extends Component {
    displayMarkers = () => {
        return this.props.eventBriteLocation.map((evnetlocation,index) => {
            //console.log(this.props.eventBriteLocation)
          return <Marker key={index} id={index} position={{
           lat: evnetlocation.lat,
           lng: evnetlocation.lng
         }}
         //onClick={() => evnetlocation.name}
         
         />
        })
      }
    
    render(){
        console.log(this.props.show);
        return(
            <Map
            google={this.props.google}
            zoom={8}
            style={{width:'500px',height:'600px'}}
            initialCenter={{ lat: -37.8136, lng: 144.9631}}
          >
        {this.displayMarkers()}     
        </Map>
        )
    }
    
   
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc'
  })(Mainmap);