import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import '../../App.css'
import Moment from 'react-moment';
import { deleteApartment } from '../../actions/apartmentsActions';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import '../dashboard/style.css'



class ApartmentItem extends Component {
  render() {
    const { apartment } = this.props;

    return (
      <div className="apartment-main">
                        <div id="carousel-example" className="carousel slide hidden-xs" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active potoSeting">
                            <div className="row infoSearch">
                                <div className="col-sm-3">
                                    <div className="col-item">
                                        <div className="photo">

                                            {/* if the is no image so put defult image */}
                                            {apartment.mainImg == '' ?
                                            <img src="https://www.prestigecostaricaproperties.com/sites/default/files/default_images/noimage.gif" className="img-responsive imgStyle" alt="a" />
                                            : 
                                            <img src={apartment.mainImg} className="img-responsive imgStyle" alt="a" />
                                        }
                                        </div>
                                        <div className="info">
                                            <div className="row ">
                                                <div className="price col-md-6">
                                                    <h5>
                                                        {apartment.address}{' '} {apartment.city}
                                                    </h5>
                                                    <h5 className="price-text-color">
                                                        {apartment.price}</h5>
                                                </div>
                                                <div className="rating hidden-sm col-md-6">
                                                    <Link to={{ pathname: `/apartment/${apartment._id}`, state: apartment }} className="btn btn-info">
                                                      View 
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="separator clear-left">
                                              
                                                </div>
                                                </div>
                                                </div>
                                                </div></div></div></div></div>
   
      </div>
    );
  }
}

ApartmentItem.propTypes = {
  apartment: PropTypes.object.isRequired
};

export default connect(null, { deleteApartment })(ApartmentItem);

