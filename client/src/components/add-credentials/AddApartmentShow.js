import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { getCurrentApartment, createApartment } from '../../actions/apartmentsActions';
import './style.css'

class AddApartmentShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImg: '',
      picturs: '',
      desciption: '',
      status: '',
      ///who is reterning ?
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentApartment();
    //this.props.createApartment(apartmentData);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.apartment.apartment) {
      const apartment = nextProps.apartment.apartment;

      // Set component fields state
      this.setState({
        _id: apartment._id,
        mainImg: apartment.mainImg,
        desciption: apartment.desciption,
        picturs: apartment.picturs,
        status: apartment.status
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();


    const data = this.props.location.state;
    delete data.errors;
    this.props.createApartment(data, this.props.history)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  render() {
    const { apartment } = this.props.apartment || [];;
    const { errors } = this.state;


    console.log('AddApartmentShow', this.props)

    return (
      <div className="create-aprtent-show">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/add-apartment" className="btn btn-light">
                <ArrowBackIosIcon />{' '}
              </Link>
              <h1 className="display-4 text-center">Rental Apartment</h1>

              <div class="thumbnail card">
                <article class="search-result row">
                  <div class="col-xs-12 col-sm-12 col-md-3">
                    <a href="#" title="Lorem ipsum" class="thumbnail"><img src="http://lorempixel.com/250/140/people" alt="Lorem ipsum" /></a>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-2">
                    <ul class="meta-search">
                      <li><i class="glyphicon glyphicon-calendar"></i> <span>02/15/2014</span></li>
                      <li><i class="glyphicon glyphicon-time"></i> <span>4:28 pm</span></li>
                      <li><i class="glyphicon glyphicon-tags"></i> <span>People</span></li>
                    </ul>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-7 excerpet">
                    <h3><a href="#" title="">Voluptatem, exercitationem, suscipit, distinctio</a></h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, exercitationem, suscipit, distinctio, qui sapiente aspernatur molestiae non corporis magni sit sequi iusto debitis delectus doloremque.</p>
                    <span class="plus"><a href="#" title="Lorem ipsum"><i class="glyphicon glyphicon-plus"></i></a></span>
                  </div>
                  <span class="clearfix borda"></span>
                </article>
              </div>




              <div class="item col-xs-4 col-lg-4">
                <div class="thumbnail card">
                  <div class="img-event">
                    <img class="group list-group-image img-fluid" src="http://placehold.it/400x250/000/fff" alt="" />
                  </div>
                  <div class="caption card-body">
                    <h4 class="group card-title inner list-group-item-heading">
                      Product title</h4>
                    <p class="group inner list-group-item-text">
                      Product description... Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
                                sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                    <div class="row">
                      <div class="col-xs-12 col-md-6">
                        <p class="lead">
                          $21.000</p>
                      </div>
                      <div class="col-xs-12 col-md-6">
                        <a class="btn btn-success" href="http://www.jquery2dotnet.com">Add to cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="nextButt" style={{ marginTop: "12%" }}>
                <input
                  type="submit"
                  value="Publish Apartment"
                  className="btn btn-danger wrn-btn"
                  onClick={this.onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddApartmentShow.propTypes = {
  apartment: PropTypes.object.isRequired,
  getCurrentApartment: PropTypes.func.isRequired,
  //createApartment:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartment,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentApartment, createApartment })(AddApartmentShow);
