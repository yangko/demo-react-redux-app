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

/*const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));
*/
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
      //inputValue: '',
      //selectValue: '',
    };
    //this.handleSelectCity = this.handleSelectCity.bind(this);
  }

  /*componentDidMount() {
    //this.getRestaurantsDefault(); // Default City = Toronto
    
    fetch('http://opentable.herokuapp.com/api/cities')
    .then(res => res.json())
    .then((data) => {
      this.setState({ cities: data.cities });
    })
    .catch(console.log);
  } */
  /*async getRestaurantsDefault() {
    try {
        const restaurants = await axios.get(
          `http://opentable.herokuapp.com/api/restaurants?city=toronto`
        );
        //console.log(restaurants.data.restaurants)
        this.setState({
            restaurants: restaurants.data.restaurants,
            isLoaded: true
        });
        } catch (error) {
        console.log({ error });
    }
  }*/
  async componentDidMount() {
    this.props.payLoad(); // Default City = Toronto
  }

  render() {
    const { isLoaded } = this.props;
    //const { citySelected, inputValue, selectValue } = this.state;
    //let cities = this.state.cities;
    //console.log('cities=' + cities);
    
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