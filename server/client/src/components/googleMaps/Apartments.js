import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ApartmentItem from './ApartmentItem';
import { getApartents, searchApartment } from '../../actions/apartmentsActions';
import '../../App.css'

class Apartments extends Component {
  componentDidMount() {
    // if (this.props.searchForm) {
    //   // load by search
    //   this.props.searchApartment(this.props.searchForm)
    // }
    // else {
    if (!this.props.apartment.searchData) {
      this.props.getApartents();
    }
    // }
  }

  render() {

    console.log('this', this.props.selected)
    let { apartments, loading } = this.props.apartment;
    let profileItems;

    if (apartments === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (apartments.length > 0) {

        if (this.props.selected) {
          // sort by selected item
          apartments = apartments.sort((a, b) => {
            return a._id == this.props.selected ? -1 : 1;
          })
        }
        profileItems = apartments.map(apartment => (
          <ApartmentItem key={apartment._id} apartment={apartment} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="apartments">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="tracking">
                <div className="text-center tracking-status-intransit">
                  <p className="tracking-status text-tight">Apartments</p>
                </div>
              </div>
              <div className="apartments-container">
                {profileItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Apartments.propTypes = {
  getApartents: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  apartment: state.apartment,
});

export default connect(mapStateToProps, { getApartents, searchApartment })(Apartments);
