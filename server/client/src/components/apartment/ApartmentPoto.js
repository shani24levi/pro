
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import { getApartentsByApartmentId  } from '../../actions/apartmentsActions';


//gellury from mautiral ui
class ApartmentPotos extends Component {
    componentDidMount() {
        if (this.props.viewClike) { //from Link in : ./googleMap/Apartment.js
            this.props.getApartentsByApartmentId(viewClike._id)  //apartment id thet cliked 
          }
      }

    // onContactClick(id) {
    //     this.props.sentRequst(id);
    // }

  render() {
    const { apartment } = this.props;
    console.log('apartment',apartment)

      //for gellary :
    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        gridList: {
          width: 500,
          height: 450,
        },
      }));

    const classes = useStyles();

    return (
    //gallury:
      <div className={classes.root} className="gallury">
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {apartment.picturs.map(tile => (
            <GridListTile key={tile.img} >
              <img src={tile.img} alt={tile.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>


    );
  }
}


ApartmentPotos.propTypes = {
    getApartentsByApartmentId: PropTypes.func.isRequired,
    getCurrentApartment: PropTypes.func.isRequired,
    apartment: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    apartment: state.apartment,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { getApartentsByApartmentId, getCurrentApartment })(
    withRouter(ApartmentPotos)
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

