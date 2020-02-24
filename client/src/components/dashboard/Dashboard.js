import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import MyRentals from './MyRental';
import ApartmentsOwner from './ApartmentsOwner';
import SearchBar from '../layout/SearchBar';


class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  onSearchApartment = () => {
    this.props.history.push('/search');
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    console.log(user.role);


    let dashboardContent;

  if(profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.first_name}</Link>
            </p>
            <ProfileActions />
            <MyRentals myReantals={profile.myReantals}/>
            

             {/*for delete profile*/}
            <div style={{ marginBottom: '60px' }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.first_name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }

    }


    return (
    
      <div className="both">
        {user.role == 'user' ?  //if the user is searcher :
            <div className="landing small">
            <div className="dark-overlay landing-inner text-light small">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                    <h1 className="display-3 mb-4">Find Your New Home</h1>
                    <SearchBar onSearchApartment={ this.onSearchApartment} />
                  </div>
                </div>
              </div>
            </div>
          </div>        
        :
        //if user is owner so show his apartments: 
        <div className="apartment-owner-show">
          <ApartmentsOwner /> 

          <Link to='/add-apartment'>
            <input
              type="button"
              value="Add New Apartment"
              className="btn btn-danger wrn-btn buttAdd"
            />
        </Link>

        </div>
        }
            
      <div className="dashboard" style={{marginTop: '9%'}}>
        <div className="container">
          <div className="row" >
            <div className="col-md-12">
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
      </div>
    
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);