import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
//import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { loadCities } from '../actions';
import { loadRestaurants } from '../actions';
import { listRestaurantsBy, filterBy, sortBy } from '../actions';
import Filter from './Filter/Filter';
import RestaurantList from './RestaurantList/RestaurantList';
import Loader from './Loader/Loader';
import './BodyComponent.css';
import './Filter/Filter.css';

const HeroContent = () => (
  <React.Fragment>
    <Container maxWidth="sm" component="main" className="heroContent">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
      </Typography>
      <Typography variant="h4" align="center" color="textSecondary" component="p">
        RESTful API, Search, Filtering and Sorting
      </Typography>
    </Container>
  </React.Fragment>
);

class BodyComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      citySelected: "Toronto",
      citis: [],
      restaurants: [],
      isLoaded: false,
    };
  }
  async componentDidMount() {
    this.props.payLoad(); // Default City = Toronto
  }

  render() {
    const { isLoaded } = this.props;
    return (
      <div>
        <HeroContent />
        <Filter />
        { isLoaded
          ? 
          <RestaurantList />
          : <Loader />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoaded: state.isLoadedRestaurants,
});

const mapDispatchToProps = dispatch => ({
  payLoad: () => dispatch(loadRestaurants()),
});

BodyComponent.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  payLoad: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyComponent);