import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Profile from '../profiles/Profiles';


const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  onSubmit(e) {
    e.preventDefault();

    const apartmentsData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      disciption: this.state.disciption,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube
    };

    this.props.editeProfile(apartmentsData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {

    return (
      <div className="apartments">
        <div style={{width:"50%", height:"90%", position: 'absolute'}}>
          <Map
            google={this.props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={{
            lat:32.166313,
            lng: 34.843311
            }}
          />
        </div>
        <div style={{float: "left", position: 'absolute'}}>
          <Profile />
        </div>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ("AIzaSyAC5auqilLpK4X5se3m2y8gaGjvw6MwJHs")
})(MapContainer)