import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ApartmentItem from './ApartmentItem';
import { getApartents } from '../../actions/apartmentsActions';

class Apartments extends Component {
  componentDidMount() {
    this.props.getApartents();
  }

  render() {
    const { apartments, loading } = this.props.apartment;
    let apartmentItems;

    if (apartments === null || loading) {
        apartmentItems = <Spinner />;
    } else {
      if (apartments.length > 0) {
        apartmentItems = apartments.map(apartment => (
          <ApartmentItem key={apartment._id} apartment={apartment} />
        ));
      } else {
        apartmentItems = <h4>No apartments found...</h4>;
      }
    }

    return (
      <div className="apartments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {apartmentItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Apartments.propTypes = {
  getApartents: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    apartment: state.apartment
});

export default connect(mapStateToProps, { getApartents })(Apartments);
