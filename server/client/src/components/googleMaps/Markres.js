import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getApartents } from '../../actions/apartmentsActions';
import PropTypes from 'prop-types';

class MarkerApartment extends Component {
    componentDidMount() {
        //   this.props.getApartents ();
    }

    render() {
        console.log('apartments', this.props.apartments);

        const apartments = this.props.apartments || [];

        return (<Marker
            name={'Dolores park'}
            position={{ lat: 32.085300, lng: 34.781769 }}
        />)

        return apartments.map(app => {

            console.log('app',app.lat,app.lng)

            if (!app.lat || !app.lng) return null;

            return <Marker name={app._id} position={{ lat: app.lat, lng: app.lng }} />
        })

        return <Marker
            name={'Dolores park'}
            position={{ lat: 32.085300, lng: 34.781769 }
            }
        />
        //   let { apartments, loading } = this.props.apartment;
        //   apartments = [
        //     {lat:32.166313,
        //         lng: 34.84331, _id: 'shani'},
        //     // { lat: 34, lng: 34, _id: '35'},

        //     ];
        //   let profileItems;

        //   if (apartments === null || loading) {
        //     profileItems = <Spinner />;
        //   } else {
        //     if (apartments.length > 0) {
        //       profileItems = apartments.map(apartment => {
        //         const position = { 
        //             lat: apartment.lat, 
        //             lng: apartment.lng
        //         };

        //         return position.lat ? <Marker
        //             position={position}
        //             key={apartment._id}
        //             name={apartment._id} 
        //         /> : null;
        //       }).filter(x => x);
        //     } else {
        //       profileItems = <h4>No profiles found...</h4>;
        //     }
        //   }

        //   return (

        //          <div className="markers"> 
        //             {/* <Marker onClick={this.onMarkerClick}
        //                 name={apartment.address} /> */}

        //             { profileItems }

        //             {/* <InfoWindow onClose={this.onInfoWindowClose}>
        //                 <div>
        //                     <h1>{this.state.selectedPlace.name}</h1>
        //                 </div>
        //             </InfoWindow> */}
        //          </div> 

        //   );
    }
}


MarkerApartment.propTypes = {
    getApartents: PropTypes.func.isRequired,
    apartment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    apartments: state.apartment.apartments
});

export default connect(mapStateToProps, { getApartents })(MarkerApartment);



