import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Apartments from './Apartments';
import Markres from './Markres';

import { connect } from 'react-redux';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
    }
  }


  onMarkerClick = (e) => {
    console.log('e',e)
    this.setState({
      selected: e.name
    })
  }


  render() {


    const apartments = this.props.apartments || [];


    return (
      <div className="apartments">
        <div className="mapStyle">
          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{
              lat: 32.166313,
              lng: 34.843311
            }}
          >
            {apartments.map(app => {


              if (!app.lat || !app.lng) return null;

              return (<Marker
                name={app._id}
                position={{ lat: app.lat, lng: app.lng }}
                onClick={this.onMarkerClick}
              />)
            })}
          </Map>
        </div>
        <div className="apartment">
          <Apartments selected={this.state.selected} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apartments: state.apartment.apartments
});





export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: ("AIzaSyAC5auqilLpK4X5se3m2y8gaGjvw6MwJHs")
  })(MapContainer)
)