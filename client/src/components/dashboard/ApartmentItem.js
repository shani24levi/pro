import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
import './style.css'
import Moment from 'react-moment';
import { deleteApartment, editApartment } from '../../actions/apartmentsActions';
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


class ApartmentItem extends Component {
    onDeleteClick(id) {
        this.props.deleteApartment(id);
    }

    onEditClick(id) {
        this.props.editApartment(id);
    }

    render() {
        const { apartment } = this.props;
        console.log('apartment',apartment)

        return (
            <div className="apartment-owner">
                <div id="carousel-example" className="carousel slide hidden-xs" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="item active potoSeting">
                            <div className="row centerInfo">
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
                                                    <i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                    </i><i className="price-text-color fa fa-star"></i><i className="price-text-color fa fa-star">
                                                    </i><i className="fa fa-star"></i>
                                                </div>
                                            </div>
                                            <div className="separator clear-left">
                                                <p className="btn-add">
                                                    <Link to={{ pathname: `/edit-apartment/${apartment._id}`, state: apartment._id }} >
                                                       Edit <EditIcon className="iconStyle" />
                                                    </Link>
                                                </p>
                                                <p className="btn-details">
                                                    <button
                                                        onClick={this.onDeleteClick.bind(this, apartment._id)}
                                                        type="button"
                                                        className="btn btn-danger mr-1"
                                                    >Delete <DeleteIcon/>
                                                    </button>
                                                </p>

                                            </div>
                                            <div className="clearfix">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ApartmentItem.propTypes = {
    deleteApartment: PropTypes.func.isRequired,
    editApartment: PropTypes.func.isRequired,
    apartment: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { deleteApartment, editApartment })(ApartmentItem);

