/* global google */
import {withGoogleMap, GoogleMap } from 'react-google-maps';
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';
import React, { Component } from 'react';
import axios from 'axios';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    }; // <-- Initialize the state
  }

  componentWillMount() {
    this.getInfo();
  }

  getInfo = () => {
    axios.get(`https://boiling-inlet-47202.herokuapp.com/getall`)
    .then(({ data }) => {
        this.setState({
          results: data.map(function(element){
            return new google.maps.LatLng(element.latitude, element.longitude);
          })                           
        })
        console.log(this.state.results);
    })
  }

  render() {
    const GoogleMapContainer = withGoogleMap(props => (
        <GoogleMap
          defaultCenter = {{
            lat: 43.472092,
            lng: -80.542594
          }}
          defaultZoom = { 18 }
          mapTypeId= "satellite"
        >
          <HeatmapLayer
              data={this.state.results}
              options={{
                radius:40, opacity: 1
              }}
          />
        </GoogleMap>
   ));
    return (
      <div className="overall-container">
        <GoogleMapContainer
          containerElement={ <div style={{ height: `100vh`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
}

export default MapContainer;