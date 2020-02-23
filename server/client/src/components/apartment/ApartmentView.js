import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import ApartmentPotos from './ApartmentPosts';
import ApartmentDetails from './ApartmentDetails';
import ApartmentPosts from './ApartmentPosts';
import { Link } from 'react-router-dom';



class ApartmentView extends Component {
    //   componentDidMount() {
    //     const { apartment } = this.props.apartment.apartments; 
    //     this.props.getApartentsByApartmentId (apartment._id);
    //   }


  render() {

    const viewClike = this.props.location.state || null;

    let { apartment, loading } = this.props.apartment;
    let apartmentItems;

    if (apartment === null || loading) {
        apartmentItems = <Spinner />;
    } else {
      if (apartment.length > 0) {


        //puicters is an array thes why i using map
        apartmentItems = apartment.map(apartment => (
          <ApartmentPotos key={apartment._id} apartment={apartment} viewClike={viewClike} />
        ));
      } else {
        apartmentItems = <h4>Apartment Not found...</h4>;
      }
    }

    return (
        <div className="apartmentView">
            {/* left side -potos */}
            <div className="galluryView">
                 {apartmentItems}
            </div>

             {/* right side  */}
            <div className="infoView">
                <div className="conectOwner">

                    <Link to={{ pathname: '/create-requst', state: this.state }}>
                        <input
                        type="button"
                        value="Contact Apartment Owner"
                        className="btn btn-danger wrn-btn"
                    />
                    </Link>

                    <ApartmentDetails viewClike={viewClike} />

                    <ApartmentPosts viewClike={viewClike} />
                    
                </div>
            </div>
        </div>
        

    );
  }
}

ApartmentView.propTypes = {
    apartment: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    apartment: state.apartment,
    errors: state.errors
  });
  
  export default connect(mapStateToProps)((ApartmentView)
  );





/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */


