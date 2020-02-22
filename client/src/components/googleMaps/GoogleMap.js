import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import Apartments from './Apartments';
import './style.css'
import { connect } from 'react-redux';
import SearchBar from '../layout/SearchBar';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: '',
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
    }
  }


  onMarkerClick = (e) => {
    console.log('e', e)
    this.setState({
      selected: e.name,
      //selectedPlace: props,
      //activeMarker: marker,
      //showingInfoWindow: true
    })
  }


  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };



  render() {


    console.log('search', this.props.location.state);
    const searchForm = this.props.location.state || null;


    const apartments = this.props.apartments || [];


    return (
      <div className="apartments">
        <SearchBar />
        
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
              />
              )
            })}

            {/* <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
           >
            <div>
              <h4>{this.state.selectedPlace.name}</h4>
            </div>
           </InfoWindow> */}

          </Map>
        </div>
        <div className="apartment">
          <Apartments selected={this.state.selected} searchForm={searchForm} />
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