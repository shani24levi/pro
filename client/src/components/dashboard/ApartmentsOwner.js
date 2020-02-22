import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ApartmentItem from './ApartmentItem';
import { getApartentsById  } from '../../actions/apartmentsActions';


class ApartmentsOwner extends Component {
  componentDidMount() {
    const { user } = this.props.auth; 
    this.props.getApartentsById (user.id);
  }

  render() {


    let { apartments, loading } = this.props.apartment;
    let apartmentItems;

    if (apartments === null || loading) {
        apartmentItems = <Spinner />;
    } else {
      if (apartments.length > 0) {

        apartmentItems = apartments.map(apartment => (
          <ApartmentItem key={apartment._id} apartment={apartment} />
        ));
      } else {
        apartmentItems = <h4>No Apartments found...</h4>;
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

ApartmentsOwner.propTypes = {
  getApartentsById: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired,
  usertId: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  apartment: state.apartment,
  auth: state.auth
});

export default connect(mapStateToProps, { getApartentsById  })(ApartmentsOwner);
