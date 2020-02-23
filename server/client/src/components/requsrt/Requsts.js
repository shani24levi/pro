import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import RequstItem from './RequstItem';
import { getRequstes } from '../../actions/requsteActions';
import '../../App.css'

class Requstes extends Component {
  componentDidMount() {
    this.props.getRequstes();
  }

  render() {
    const { requstes, loading } = this.props.requste;
    let profileItems;

    if (requstes === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (requstes.length > 0) {
        profileItems = requstes.map(requste => (
          <RequstItem key={requste._id} requste={requste} />
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="requstes">
        <div className="container">
          <div className="row">
          <div className="col-md-12">
                <div className="tracking">
                    <div className="text-center tracking-status-intransit">
                        <p className="tracking-status text-tight">requste</p>
                    </div>
                </div>
              {profileItems}
          </div>
          </div>
        </div>
      </div>
    );
  }
}

Requstes.propTypes = {
  getRequstes: PropTypes.func.isRequired,
  requste: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    requste: state.requste
});

export default connect(mapStateToProps, { getRequstes })(Requstes);
