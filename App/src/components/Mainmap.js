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
      if( this.props.eventBriteLocation.length > 0 ) {
        return this.props.eventBriteLocation.map((evnetlocation,index) => {
            //console.log(this.props.eventBriteLocation)
          return <Marker key={index} id={index} position={{
           lat: evnetlocation.lat,
           lng: evnetlocation.lng
         }} name = { evnetlocation.name } subsurbDisplay = {evnetlocation.subsurbDisplay}
         onClick = { this.onMarkerClick }
         
         />
        })
      } else if( this.props.restaurants_locations.length > 0 ) {
        return this.props.restaurants_locations.map((location, index) => {
            //console.log(this.props.eventBriteLocation)
          return <Marker key={index} id={index} position={{
           lat: location.lat,
           lng: location.lng
         }} name = { location.name } subsurbDisplay = {location.address}
         onClick = { this.onMarkerClick }
         
         />
        })
      }
      }
    
    render(){
        console.log(this.props);
        const isMapshown = this.props.locationDetails
        let map_object;
        if( isMapshown != null ) {
              map_object = <Map
                google={this.props.google}
                
                zoom={10}
                style={{width:'100%',height:'100%'}}
                initialCenter={{ lat: isMapshown.loc.split(",")[0], lng: isMapshown.loc.split(",")[1]}}

              >
            {this.displayMarkers()} 
            <InfoWindow
              marker = { this.state.activeMarker }
              visible = { this.state.showingInfoWindow }
            >
               <div><h5>{this.state.selectedPlace.name}</h5>
               {this.state.selectedPlace.subsurbDisplay}</div>
                  
              
              </InfoWindow>    
            </Map>;
          }
        return(
          <div>
            {map_object}
          </div>
        )
    }
    
   
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyA48886uOlEYUskw5zQrvcbpDHz8nc8XPc'
  })(Mainmap);