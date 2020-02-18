import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ApartmentItem extends Component {
  render() {
    const { apartment } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={apartment.user.mainPoto} alt="" className="img-thumbnail" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{apartment.user.address}</h3>
            <h3>{apartment.user.city}</h3>
            <p>
              {apartment.status}{' '}
              {isEmpty(apartment.price) ? null : (
               <span>at {apartment.price}</span>
              )}
            </p>
            <p>
              {isEmpty(apartment.desciption) ? null : (
                <span>{apartment.desciption}</span>
              )}
            </p>
            <Link to={`/apartment/${apartment._id}`} className="btn btn-outline-warning">
              View Apartment
            </Link>
          </div>
         
        </div>
      </div>
    );
  }
}

ApartmentItem.propTypes = {
    apartment: PropTypes.object.isRequired
};

export default ApartmentItem;
