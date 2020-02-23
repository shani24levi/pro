import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import '../../App.css'
import Moment from 'react-moment';
import { deleteRequste } from '../../actions/requsteActions';
import { connect } from 'react-redux';



class RequsteItem extends Component {
    onDeleteClick(id) {
        this.props.deleteRequste(id);
    }

  render() {
    const { requste } = this.props;

    return (
        <div className="requste">
        <div className="col-md-12 col-lg-12">
        <div className="tracking-pre"></div>
        <div className="tracking">
           <div className="tracking-list">
              <div className="tracking-item">
                 <div className="tracking-icon status-intransit">
                    <img src={requste.sending.avatar} className="rounded-circle"  />
                 </div>
                 <div className="tracking-date"> 
                 <Moment format="DD/MM/YYYY">{requste.date}</Moment>
                 <span> {requste.sending.first_name}{' '}{requste.sending.last_name}{' '}</span></div>
                 <div className="tracking-content">{requste.purpose}<span>{requste.text}</span></div>
                 
                <Link to={`/profile/${requste._id}`} className="btn btn-info">
                Reply
                </Link>
                <button
                    onClick={this.onDeleteClick.bind(this, requste._id)}
                    className="btn btn-danger"
                >
                    Delete requste
                </button>
              </div>
            </div>
        </div> 
        </div>           
      </div>
    );
  }
}

RequsteItem.propTypes = {
    requste: PropTypes.object.isRequired
};

//export default RequsteItem;
export default connect(null, { deleteRequste })(RequsteItem);

