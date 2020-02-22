import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from './AddApartmentPage1';
import { Link } from 'react-router-dom';

class AddApartment extends Component {

    render(){
        return(
            <div className="add-apartment">
            <Map
            google={this.props.google}
            center={{lat: 32.085300, lng: 34.781769}} //center of tel-aviv
            height='300px'
            zoom={15}
           />
           <Link to="/add-apartment-page2" className="btn btn-lg btn-info" >
                Next
           </Link>
           </div>
        );
    }
}

export default AddApartment;