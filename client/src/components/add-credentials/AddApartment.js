import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Map from './AddApartmentPage1';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


class AddApartment extends Component {

    render(){
        return(
            <div className="add-apartment">

            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/dashboard" className="btn btn-light">
                             <ArrowBackIosIcon/>{' '} 
                         </Link>
                        <h1 className="display-4 text-center">Rental Apartment</h1>
                    </div>
                </div> 
            </div>


            <Map
            google={this.props.google}
            center={{lat: 32.085300, lng: 34.781769}} //center of tel-aviv
            height='300px'
            zoom={15}
           />
           </div>
        );
    }
}

export default AddApartment;