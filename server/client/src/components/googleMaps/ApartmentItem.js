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



class ApartmentItem extends Component {
  render() {
    const { apartment } = this.props;

    return (
        <div className="apartment-main">
        <div className="col-md-12 col-lg-12">
        <div className="tracking-pre"></div>
        <div className="tracking">
           <div className="tracking-list">
              <div className="tracking-item">
                 <div className="tracking-icon status-intransit">
                    <img  className="rounded-circle"  />
                 </div>
                 <div className="tracking-date"> 
                 <Moment format="DD/MM/YYYY">{apartment.date}</Moment>
                 <span> {apartment.city}{' '}{apartment.address}{' '}</span></div>
                 <div className="tracking-content">{apartment.price}<span>{apartment.openANDpublic}</span></div>
                 
                 {/* clike here and it allso sents the apartment prors (detils) to page caled /apartment/${apartment._id} */}
                <Link to={ { pathname:`/apartment/${apartment._id}` ,state: this.props}}  className="btn btn-info">
                View {apartment._id}
                </Link>
              </div>
            </div>
        </div> 
        </div>           
      </div>
    );
  }
}

ApartmentItem.propTypes = {
  apartment: PropTypes.object.isRequired
};

export default connect(null, { deleteApartment })(ApartmentItem);

