import React, { Component } from "react";
//import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
class Mainmap extends Component {
    constructor(props) {
        super(props);
    this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      }
    }
    onMarkerClick = (props, marker, e) => {
      console.log(props)
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
    displayMarkers = () => {
        return this.props.eventBriteLocation.map((evnetlocation,index) => {
            //console.log(this.props.eventBriteLocation)
          return <Marker key={index} id={index} position={{
           lat: evnetlocation.lat,
           lng: evnetlocation.lng
         }} name = { evnetlocation.name } subsurbDisplay = {evnetlocation.subsurbDisplay}
         onClick = { this.onMarkerClick }
         
         />
        })
      }
    
    render(){
        console.log(this.state.selectedPlace);
        return(
            <Map
            google={this.props.google}
            
            zoom={8}
            style={{width:'500px',height:'600px'}}
            initialCenter={{ lat: -37.8136, lng: 144.9631}}

          >
        {this.displayMarkers()} 
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
           <div><h5>{this.state.selectedPlace.name}</h5>
           {this.state.selectedPlace.subsurbDisplay}</div>
              
          
          </InfoWindow>    
        </Map>
        )
    }
    
   
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc'
  })(Mainmap);