import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';


class MyRentals extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const myReantals = this.props.myReantals.map(exp => (
      <tr key={exp._id}>
        <td>{exp.address}</td>
        <td>{exp.city}</td>
        <td>{exp.leftCose}</td>
        <td>{exp.current}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            ' Now'
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">My Rental History</h4>
        <table className="table">
          <thead>
            <tr>
              <th>address</th>
              <th>city</th>
              <th>laft cuse</th>
              <th />
            </tr>
            {myReantals}
          </thead>
        </table>
      </div>
    );
  }
}

MyRentals.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(MyRentals);