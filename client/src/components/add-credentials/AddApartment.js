import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from './AddApartmentPage1';

class AddApartment extends Component {

    render(){
        return(
            <Map
            google={this.props.google}
            center={{lat: 18.5204, lng: 73.8567}}
            height='300px'
            zoom={15}
           />
        );
    }
}

export default AddApartment;