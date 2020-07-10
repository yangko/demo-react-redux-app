import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { loadRestaurants } from '../actions';
import Filter from './Filter/Filter';
import RestaurantList from './RestaurantList/RestaurantList';
import Loader from './Loader/Loader';
import './BodyComponent.css';
import './Filter/Filter.css';

const HeroContent = () => (
  <React.Fragment>
    <Container maxWidth="lg" component="main" className="heroContent">
      <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
      </Typography>
      <Typography variant="h4" align="center" color="textSecondary" component="p">
        A Demo of SPA (Single Page Application)
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        Search restaurants in worldwide cities, filtering and sorting feature enabled. Using RESTful API, Redux store, Webpack, Material-UI.
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